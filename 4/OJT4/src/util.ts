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
