import Q from './../q';

import Controls from './controls.js';
import Ui from './ui.js';

let stageOptions = {
  heartCount: 3,
};

let Level11 = Q.scene('Level11', function(stage) {
  Q.audio.play(
    'forest-of-illusion.mp3',
    {
      loop: true,
    }
  );

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
      [
        'level-1-1.tmx',
        'forest-of-illusion.mp3',
        'flatDark00.png, flatDark10.png',
        'flatDark35.png, flatDark36.png',
      ].join(','),
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
    Q.stageScene(Level11, 0, stageOptions);
    
    if (Q.touchDevice) {
      Q.stageScene(Controls, 1, stageOptions);
    }

    Q.stageScene(Ui, 2, stageOptions);
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
