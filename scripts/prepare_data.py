import json
from pathlib import Path


COORDINATE_PRECISION = 6


def getYearSheet(year: str):
    return f"KomRang_{year}"


def getIndicatorColumn(indicator: str, year: str):
    return f"{indicator}"
    # return f"{indicator}_{year}_0_100"


def buildDataObject(data: dict, dm: dict) -> dict:
    kommune_data = {
        "years": {}
    }

    for year in dm["years"]:
        kommune_data_year = {
            "byKommune": {},
            "byMetric": {},
        }

        for feature in data["features"]:
            row = feature["properties"]
            iKomNr = str(row["ssbid"])

            kommune_data_year_byKommune = {
                "klimarisk_name": row["ssbid"],
                "klimarisk_indicator_number": {},
            }

            for determinant in dm["determinants"]:
                for indicator in determinant["indicators"]:
                    indicator_value = row[getIndicatorColumn(indicator["key"], year["key"])]

                    kommune_data_year_byKommune["klimarisk_indicator_number"][determinant["key"]] = kommune_data_year_byKommune["klimarisk_indicator_number"].get(determinant["key"], 0) + 1
                    kommune_data_year_byKommune[indicator["key"]] = indicator_value

                    if indicator["key"] not in kommune_data_year["byMetric"]:
                        kommune_data_year["byMetric"][indicator["key"]] = [indicator_value]
                    else:
                        kommune_data_year["byMetric"][indicator["key"]].append(indicator_value)

            kommune_data_year["byKommune"][iKomNr] = kommune_data_year_byKommune

        for metric in kommune_data_year["byMetric"]:
            kommune_data_year["byMetric"][metric].sort()

        kommune_data["years"][year["key"]] = kommune_data_year

    return kommune_data


# Recreate the data model with only useful information for the frontend

def cleanDataModel(dm):
    return {
        "risk": {
            "name": dm["risk"]["name"],
            "description": dm["risk"]["description"],
        },

        "elements": [{
            "key": determinant["key"],
            "name": determinant["name"],
            **({"description": determinant["description"]} if "description" in determinant else {}),
            **({"invert": determinant["inverted"]} if "inverted" in determinant else {}),
            "metrics": [{
                "key": indicator["key"],
                "name": indicator["name"],
                **({"description": indicator["description"]} if "description" in indicator else {}),
                **({"url": indicator["url"]} if "url" in indicator else {}),
                **({"invert": indicator["invert"]} if "invert" in indicator else {}),
            } for indicator in determinant["indicators"]],
        } for determinant in dm["determinants"]],

        "years": [{
            "key": year["key"],
            "name": year["name"],
            "description": year["description"],
        } for year in dm["years"]],

        "documentation": [
            item for item in dm["documentation"]
        ],
    }


def roundCoordinates(coordinates, precision=COORDINATE_PRECISION):
    if isinstance(coordinates, list):
        return [roundCoordinates(value, precision) for value in coordinates]

    if isinstance(coordinates, float):
        return round(coordinates, precision)

    return coordinates


def cleanGeoJson(data: dict) -> dict:
    return {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {
                "ssbid": feature["properties"]["ssbid"],
            },
            "geometry": {
                **feature["geometry"],
                "coordinates": roundCoordinates(feature["geometry"]["coordinates"]),
            },
        } for feature in data["features"]],
    }


if __name__ == "__main__":
    root_folder = Path(__file__).resolve().parent.parent

    in_path_geojson = root_folder / "scripts" / "rutenett_veg.geojson"
    in_path_model = root_folder / "scripts" / "rutenett_data_model.json"

    out_folder = root_folder / "frontend" / "public" / "data"
    out_path = out_folder / "kommune_data.json"
    out_path_model = out_folder / "kommune_data_model.json"
    out_path_geojson = out_folder / "rutenett_veg.geojson"

    # Load source files
    dm = json.load(open(in_path_model, "r", encoding="utf-8"))
    data = json.load(open(in_path_geojson, "r", encoding="utf-8"))

    # Build data object
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(buildDataObject(data, dm), f, ensure_ascii=False, indent=2)

    # Write cleaned data model
    with open(out_path_model, "w", encoding="utf-8") as f:
        json.dump(cleanDataModel(dm), f, ensure_ascii=False, indent=2)

    # Write cleaned GeoJSON
    with open(out_path_geojson, "w", encoding="utf-8") as f:
        json.dump(cleanGeoJson(data), f, ensure_ascii=False, separators=(",", ":"))