var CANVASWIDTH = 16,
  CANVASHEIGHT = 10,
  TILESIZE = 16,
  MAPWIDTH = 8,
  MAPHEIGHT = 4,
  MAP = "\
dg1-dg2-dg3-gd7-gd6-gd5-dg1-dg3-\
dg8-ggg-ggg-gd1-gd2-gd2-dg6-dg5-\
dg7-dg6-gd2-dg5-ddd-ddd-ddd-ddd-\
ddd-ddd-ddd-ddd-ddd-ddd-ddd-ddd-";
var TILEMAP = {
  'dg1-': [0,  0], 'dg2-': [1,  0], 'dg3-': [2,  0], 'gd1-': [3,  0], 'gd2-': [4,  0], 'gd3-': [5,  0],
  'dg8-': [0,  1], 'ggg-': [1,  1], 'dg4-': [2,  1], 'gd8-': [3,  1], 'ddd-': [4,  1], 'gd4-': [5,  1],
  'dg7-': [0,  2], 'dg6-': [1,  2], 'dg5-': [2,  2], 'gd7-': [3,  2], 'gd6-': [4,  2], 'gd5-': [5,  2],
  'sr1-': [0,  3], 'sr2-': [1,  3], 'sr3-': [2,  3], 'rs1-': [3,  3], 'rs2-': [4,  3], 'rs3-': [5,  3], 'sd1-': [6,  3], 'sd2-': [7,  3], 'sd3-': [8,  3], 'ds1-': [9,  3], 'ds2-': [10,  3], 'ds3-': [11,  3],
  'sr8-': [0,  4], 'rrr-': [1,  4], 'sr4-': [2,  4], 'rs8-': [3,  4], 'sss-': [4,  4], 'rs4-': [5,  4], 'sd8-': [6,  4], 'ddx-': [7,  4], 'sd4-': [8,  4], 'ds8-': [9,  4], 'ssx-': [10,  4], 'ds4-': [11,  4],
  'sr7-': [0,  5], 'sr6-': [1,  5], 'sr5-': [2 , 5], 'rs7-': [3,  5], 'rs6-': [4,  5], 'rs5-': [5,  5], 'sd7-': [6,  5], 'sd6-': [7,  5], 'sd5-': [8,  5], 'ds7-': [9,  5], 'ds6-': [10,  5], 'ds5-': [11,  5],
  'w11-': [0,  6], 'w12-': [1,  6], 'w13-': [2,  6], 'w21-': [3,  6], 'w22-': [4,  6], 'w23-': [5,  6], 'w31-': [6,  6], 'w32-': [7,  6], 'w33-': [8,  6], 'w41-': [9,  6], 'w42-': [10,  6], 'w43-': [11,  6],
  'w18-': [0,  7], 'ww1-': [1,  7], 'w14-': [2,  7], 'w28-': [3,  7], 'ww2-': [4,  7], 'w24-': [5,  7], 'w38-': [6,  7], 'ww3-': [7,  7], 'w34-': [8,  7], 'w48-': [9,  7], 'ww4-': [10,  7], 'w44-': [11,  7],
  'w17-': [0,  8], 'w16-': [1,  8], 'w15-': [2,  8], 'w27-': [3,  8], 'w26-': [4,  8], 'w25-': [5,  8], 'w37-': [6,  8], 'w36-': [7,  8], 'w35-': [8,  8], 'w47-': [9,  8], 'w46-': [10,  8], 'w45-': [11,  8],
  'w51-': [0,  9], 'w52-': [1,  9], 'w53-': [2,  9], 'w61-': [3,  9], 'w62-': [4,  9], 'w63-': [5,  9], 'w71-': [6,  9], 'w72-': [7,  9], 'w73-': [8,  9], 'w81-': [9,  9], 'w82-': [10,  9], 'w83-': [11,  9],
  'w58-': [0, 10], 'ww5-': [1, 10], 'w54-': [2, 10], 'w68-': [3, 10], 'ww6-': [4, 10], 'w64-': [5, 10], 'w78-': [6, 10], 'ww7-': [7, 10], 'w74-': [8, 10], 'w88-': [9, 10], 'ww8-': [10, 10], 'w84-': [11, 10],
  'w57-': [0, 11], 'w56-': [1, 11], 'w55-': [2, 11], 'w67-': [3, 11], 'w66-': [4, 11], 'w65-': [5, 11], 'w77-': [6, 11], 'w76-': [7, 11], 'w75-': [8, 11], 'w87-': [9, 11], 'w86-': [10, 11], 'w85-': [11, 11]
};//The first two letters correspond to the ground type, with the first being abundant. The number relates to the tile from the tileset, rotating clockwise. d=dirt, g=grass, w=water, s=sand, r=rock

var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  tileset = new Image(),
  tileset.src = "tileset.png";

function printTile(tilex, tiley, printx, printy) {
  ctx.drawImage(TILESET, tilex * TILESIZE, tiley * TILESIZE, TILESIZE, TILESIZE, printx, printy, canvas.width / CANVASWIDTH, canvas.height / CANVASHEIGHT);
}

function getTile(tile, j, i) {
  if (tile in TILEMAP) {
    const [x, y] = TILEMAP[tile];
    printTile(x, y, j, i);
  }
}

function printMap() {
  for (let i = 0; i < MAPHEIGHT; i++) {
    for (let j = 0; j < MAPWIDTH; j++) {
      let tile = MAP[4*(i * MAPWIDTH + j)];
      getTile(tile, j, i, TILESET);
    }
  }
}
printMap()
