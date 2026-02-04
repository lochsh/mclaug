import json
from typing import Any

import mapsy
from shapely.geometry import shape, Point

import random
from mapsy.geo_util import Box, merge_bounds


def load_geojson(file_path: str) -> tuple[list[Point], dict[str, Any]]:
    with open(file_path, "r") as f:
        data = json.load(f)
    features = data["features"]
    geoms = []
    properties = []
    for feature in features:
        geom = shape(feature["geometry"])
        properties.append(feature["properties"])
        geoms.append(geom)
    return geoms, properties

colours = {
    "athadán": "e1834e",
    "breallach lathaí": "499664",
    "ceanna-phiullan": "a5b73a",
    "cnádán": "bd6ce1",
    "cràigean": "d659b3",
    "gille-cràigean": "d659b3",
    "crónán": "8b42ab",
    "crúbán claidhe": "d69d33",
    "fliuchán": "6270bc",
    "frog": "d5443d",
    "frús": "4bc1b5",
    "lapadán": "d6417e",
    "lapadóir": "d6417e",
    "laprachán": "d6417e",
    "leumachan": "6269db",
    "leumadair": "6269db",
    "lisbín": "5cb956",
    "losgann": "657529",
    "losgaid": "657529",
    "luascan lathaí": "ca92d3",
    "lúbar lathaí": "b2a05b",
    "lúbóg lathaí": "b2a05b",
    "màgan": "5f9ed7",
    "giolla-mhàgag": "9e582a",
    "mial-mhàgain": "9e582a",
    "preabaire na lathaí": "99528a",
    "sonasan": "e17e89",
    "tortán": "a34655",
}

rgb_colours = {
    k: tuple(int(v[i:i+2], 16)/255.0 for i in (0, 2, 4))
    for k, v in colours.items()
}


def build_symbol_items(
    points: list[Point], properties: list[dict[str, Any]]
) -> list[mapsy.SymbolItem]:
    items = []
    for point, props in zip(points, properties):
        text = props["category"]
        symbol_item = mapsy.SymbolItem(
            point,
            text=text,
            text_weight=mapsy.FontWeight.BOLD,
            text_size=18,
            text_color=mapsy.Color(*rgb_colours[props["category"]]),
            text_outline_color=mapsy.Colors.WHITE,
            text_outline_width=1,
            text_anchor=mapsy.TextAnchor.CENTER,
            text_offset=(0, 0),
        )
        items.append(symbol_item)
    return items


def main():
    map = mapsy.Map()
    random.seed(0)
    geoms, properties = load_geojson("data/frogs.json")
    # Filter out nova scotia
    bboxes = [Box(*geom.bounds) for geom in geoms if geom.x > -20]
    bbox = merge_bounds(bboxes).with_relative_padding(0.05)

    tile_layer = mapsy.TiledRasterLayer(
        [
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        ]
    )

    map.add_layer(tile_layer)
    map.add_layer(mapsy.SymbolLayer(build_symbol_items(geoms, properties)))
    map.add_layer(mapsy.Attribution("© OpenStreetMap contributors"))

    render_mode = mapsy.FixedScreenSize(bbox, mapsy.ScreenSize(1400, 1175))
    map.render(render_mode).write_to_png("EnforcedScreenSize.png")
    render_mode = mapsy.FixedBBox(bbox, 1000**2)
    map.render(render_mode).write_to_png("EnforcedBBox.png")


if __name__ == "__main__":
    main()
