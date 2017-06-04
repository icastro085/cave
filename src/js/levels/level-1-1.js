import Q from './../q';
import config from './../config';

import Sound from './sound.js';

Q.scene('Level11', function(stage) {
  Sound.play('level11:loop');

  Q.stageTMX('level-1-1.tmx', stage);
  const p = stage._collisionLayers[0].p;

  stage
    .add('viewport')
    .follow(Q('Player').first(), null, {// eslint-disable-line
      minX: 0,
      maxX: p.tileW * p.cols,
      minY: 0,
      maxY: p.tileH * p.rows,
    });
});

/**
 * @class Level
 */
export default class Level {
  /**
   * Starting load all assests
   */
  start() {
    Q.loadTMX(
      config.defaultAssests.concat([
        'level-1-1.tmx',
      ]).join(','),
      this.onLoad,
      {
        progressCallback: this.onProgress,
      }
    );
  }

  /**
   * @method onLoad
   */
  onLoad() {
    Q.stageScene('Level11', config.index.level);
    Q.stageScene('Ui', config.index.ui);
    if (Q.touchDevice) {
      Q.stageScene('Controls', config.index.control);
    }
  }

 /**
  * @method onProgress
  * @param {Integer} loaded
  * @param {Integer} total
  */
  onProgress(loaded, total) {
    if (loaded === total) {
      document.getElementById('loading').style.display = 'none';
    }
  }
}
