import argparse
import json

from prepare_data import (
    buildDataObject,
    buildCacheObject,
    cleanDataModel,
    cleanGeoJson,
    in_path_excel,
    in_path_geojson,
    in_path_model,
    out_folder,
    out_path_data,
    out_path_cache,
    out_path_model,
    out_path_geojson,
)


TARGETS = {"data", "cache", "model", "geometry"}


def loadJson(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def writeJson(path, data, *, compact=False):
    path.parent.mkdir(parents=True, exist_ok=True)

    with open(path, "w", encoding="utf-8") as f:
        if compact:
            json.dump(
                data,
                f,
                ensure_ascii=False,
                separators=(",", ":"),
            )
        else:
            json.dump(
                data,
                f,
                ensure_ascii=False,
                indent=2,
            )


def parseArgs():
    parser = argparse.ArgumentParser(
        description="Prepare frontend data files for Klimarisk Grid.",
    )

    parser.add_argument(
        "targets",
        nargs="+",
        choices=["all", *sorted(TARGETS)],
        help="What to prepare.",
    )

    parser.add_argument(
        "--fylke",
        nargs="+",
        metavar="NR",
        help="Only prepare data/cache for the specified fylke number(s).",
    )

    return parser.parse_args()


def main():
    args = parseArgs()

    targets = set(args.targets)

    if "all" in targets:
        targets = TARGETS.copy()

    # The data model is needed for data/cache/model,
    # but not when only geometry is being prepared.
    dm = None

    if targets & {"data", "cache", "model"}:
        dm = loadJson(in_path_model)

    if targets & {"data", "cache"}:
        available_fylker = {
            str(fylke["nr"])
            for fylke in dm["fylker"]
        }

        fylke_numbers = (
            [str(fylkeNr) for fylkeNr in args.fylke]
            if args.fylke
            else [str(fylke["nr"]) for fylke in dm["fylker"]]
        )

        unknown_fylker = set(fylke_numbers) - available_fylker

        if unknown_fylker:
            raise ValueError(
                f"Unknown fylke number(s): {', '.join(sorted(unknown_fylker))}"
            )

        if "data" in targets:
            for fylkeNr in fylke_numbers:
                print(f"Building data for fylke {fylkeNr}...")

                writeJson(
                    out_path_data(fylkeNr),
                    buildDataObject(
                        in_path_excel,
                        dm,
                        fylkeNr=fylkeNr,
                    ),
                )

        if "cache" in targets:
            for fylkeNr in fylke_numbers:
                print(f"Building cache for fylke {fylkeNr}...")

                writeJson(
                    out_path_cache(fylkeNr),
                    buildCacheObject(
                        in_path_excel,
                        dm,
                        fylkeNr=fylkeNr,
                    ),
                )

    if "model" in targets:
        print("Building data model...")

        writeJson(
            out_path_model,
            cleanDataModel(dm),
        )

    if "geometry" in targets:
        print("Building geometry...")

        geojson = loadJson(in_path_geojson)

        writeJson(
            out_path_geojson,
            cleanGeoJson(geojson),
            compact=True,
        )

    print("Done.")


if __name__ == "__main__":
    main()