import q from './q';// eslint-disable-line

import Player from './characters/player';// eslint-disable-line
import Fly from './characters/fly';// eslint-disable-line
import Rat from './characters/rat';// eslint-disable-line
import Tile from './levels/tile';// eslint-disable-line

import Level11 from './levels/level-1-1.js';

import Controls from './levels/controls.js';// eslint-disable-line
import Ui from './levels/ui.js';// eslint-disable-line
import Paused from './levels/paused.js';// eslint-disable-line

let level = new Level11();
level.start();
