import pandas as pd
import json
from pathlib import Path
import geopandas as gpd


COORDINATE_PRECISION = 6


def getFylkeSheet(fylkeNr: str):
    return f"Fylke{fylkeNr}"


def getIndicatorColumn(indicator: str, year: str, normalized: bool = True):
    return f"{indicator}_{year}{"_0_100" if normalized else ""}"


def buildDataObject(excel_file_path: str, dm: dict, fylkeNr: str) -> dict:
    kommune_data = {
        "years": {}
    }

    for year in dm["years"]:
        df = pd.read_excel(excel_file_path, sheet_name=getFylkeSheet(fylkeNr))

        kommune_data_year = {
            "byKommune": {},
            "byMetric": {},
        }
        for _, row in df.iterrows():
            iKomNr = str(row["ssbid"]).zfill(4) # Ensure 4-digit kommune number

            kommune_data_year_byKommune = {
                "klimarisk_name": row["ssbid"],
                "klimarisk_indicator_number": {},
            }
            for determinant in dm["determinants"]:
                for indicator in determinant["indicators"]:
                    indicator_value = row[getIndicatorColumn(indicator["key"], year["key"])]
                    if pd.isna(indicator_value):
                        continue

                    kommune_data_year_byKommune["klimarisk_indicator_number"][determinant["key"]] = kommune_data_year_byKommune["klimarisk_indicator_number"].get(determinant["key"], 0) + 1
                    kommune_data_year_byKommune[indicator["key"]] = indicator_value

                    # Add metric [] to byMetric dictionary if it doesnt exist
                    if indicator["key"] not in kommune_data_year["byMetric"]:
                        kommune_data_year["byMetric"][indicator["key"]] = [indicator_value]
                    else:
                        kommune_data_year["byMetric"][indicator["key"]].append(indicator_value)

            kommune_data_year["byKommune"][iKomNr] = kommune_data_year_byKommune

        # sort byMetric {} metrics
        for metric in kommune_data_year["byMetric"]:
            kommune_data_year["byMetric"][metric].sort()

        kommune_data["years"][year["key"]] = kommune_data_year

    return kommune_data

def buildCacheObject(excel_file_path: str, dm: dict, fylkeNr: str) -> dict:
    cache_data = {
        "years": {}
    }

    for year in dm["years"]:
        df = pd.read_excel(excel_file_path, sheet_name=getFylkeSheet(fylkeNr))

        cache_data_year = {
            "byKommune": {},
            "byElement": {},
            "byTotalRisk": [],
        }
        for _, row in df.iterrows():
            iKomNr = str(row["ssbid"]).zfill(4) # Ensure 4-digit kommune number

            totalRisk = row[getIndicatorColumn(dm["risk"]["key"], year["key"], normalized=False)]
            cache_data_year_byKommune = {
                "totalRisk": totalRisk,
            }
            cache_data_year["byTotalRisk"].append(totalRisk)
            for determinant in dm["determinants"]:
                determinant_value = row[getIndicatorColumn(determinant["key"], year["key"])]
                cache_data_year_byKommune[determinant["key"]] = determinant_value

                # Add element [] to byElement dictionary if it doesnt exist
                if determinant["key"] not in cache_data_year["byElement"]:
                    cache_data_year["byElement"][determinant["key"]] = [determinant_value]
                else:
                    cache_data_year["byElement"][determinant["key"]].append(determinant_value)
            cache_data_year["byKommune"][iKomNr] = cache_data_year_byKommune

        # sort byElement {} elements
        for element in cache_data_year["byElement"]:
            cache_data_year["byElement"][element].sort()

        cache_data["years"][year["key"]] = cache_data_year
        
    return cache_data

# Recreate the data model with only useful information for the frontend

def cleanDataModel(dm):
    return {
        "risk": {
            "name": dm["risk"]["name"],
            **({"description": dm["risk"]["description"]} if "description" in dm["risk"] else {}),
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
            **({"description": year["description"]} if "description" in year else {}),
        } for year in dm["years"]],

        **({"documentation": [
            item for item in dm["documentation"]
        ]} if "documentation" in dm else {}),

        "fylker": [{
            "nr": fylke["nr"],
            "name": fylke["name_no"],
        } for fylke in dm["fylker"]],
    }


def roundCoordinates(coordinates, precision=COORDINATE_PRECISION):
    if isinstance(coordinates, list):
        return [roundCoordinates(value, precision) for value in coordinates]

    if isinstance(coordinates, float):
        return round(coordinates, precision)

    return coordinates


def cleanGeoJson(data: dict) -> dict:
    features = data["features"]

    if data.get("crs"):
        crs = data["crs"]["properties"]["name"]

        gdf = gpd.GeoDataFrame.from_features(features, crs=crs)
        gdf = gdf.to_crs(epsg=4326)

        features = json.loads(gdf.to_json())["features"]

    return {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "properties": {
                "ssbid": feature["properties"]["ssbid"],
                "txtKomNr": feature["properties"]["txtKomNr"],
            },
            "geometry": {
                **feature["geometry"],
                "coordinates": roundCoordinates(feature["geometry"]["coordinates"]),
            },
        } for feature in features],
    }


if __name__ == "__main__":
    root_folder = Path(__file__).resolve().parent.parent

    in_path_excel = root_folder / "scripts" / "source_data.xlsx"
    in_path_geojson = root_folder / "scripts" / "source_geometry.geojson"
    in_path_model = root_folder / "scripts" / "source_data_model.json"

    out_folder = root_folder / "frontend" / "public" / "data"
    out_path_data = lambda fylkeNr: out_folder / f"data_fylke{fylkeNr}.json"
    out_path_cache = lambda fylkeNr: out_folder / f"cache_fylke{fylkeNr}.json"
    out_path_model = out_folder / "data_model.json"
    out_path_geojson = out_folder / "geometry.geojson"

    # Load source files
    dm = json.load(open(in_path_model, "r", encoding="utf-8"))
    geojson = json.load(open(in_path_geojson, "r", encoding="utf-8"))

    # Build data object for each fylke
    for fylkeNr in [fylke["nr"] for fylke in dm["fylker"]]:
        print(f"Building data object for fylke {fylkeNr}...")
        with open(out_path_data(fylkeNr), "w", encoding="utf-8") as f:
            json.dump(buildDataObject(in_path_excel, dm, fylkeNr=fylkeNr), f, ensure_ascii=False, indent=2)
        with open(out_path_cache(fylkeNr), "w", encoding="utf-8") as f:
            json.dump(buildCacheObject(in_path_excel, dm, fylkeNr=fylkeNr), f, ensure_ascii=False, indent=2)

    # Write cleaned data model
    with open(out_path_model, "w", encoding="utf-8") as f:
        json.dump(cleanDataModel(dm), f, ensure_ascii=False, indent=2)

    # Write cleaned GeoJSON
    with open(out_path_geojson, "w", encoding="utf-8") as f:
        json.dump(cleanGeoJson(geojson), f, ensure_ascii=False, separators=(",", ":"))