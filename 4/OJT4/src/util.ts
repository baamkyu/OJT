export function makeTileLayer(
  map: Phaser.Tilemaps.Tilemap, // json
  tilesetName: string, // json 이름
  assetKey: string,
  layerId: string
) {
  // addTilesetImage(tilesetName, key)
  const tileset = map.addTilesetImage(tilesetName, assetKey);

  return map.createLayer(layerId, tileset!);
}

let shield: number = 0;
let dash: number = 0;
let superjump: number = 0;
export function collectItem(_: any, item: any) {
  if (item.active) {
    item.setActive(false);
    item.setVisible(false);
    if (item.texture.key === "shield") {
      shield += 1;
    } else if (item.texture.key === "dash") {
      dash += 1;
    } else if (item.texture.key === "superjump") {
      superjump += 1;
    }

    console.log("shield", shield, "dash", dash, "superjump", superjump);
    setTimeout(() => {
      item.setActive(true);
      item.setVisible(true);
    }, 10000);
  }

  return { shield, dash, superjump };
}
