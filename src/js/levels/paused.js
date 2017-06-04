import Q from './../q';
import config from './../config';

import Sound from './sound.js';

let ws = 0;
let hs = 0;

Q.Sprite.extend(
  'ControlContinue',
  {
    init: function(p) {
      this._super(p, {
        asset: 'continue.png',
        y: 0,
        x: 50,
        opacity: 1,
      });
      this.on('touch, touchEnd');
    },

    touch: function() {
      Q.stage(config.index.level).unpause();
      Q.stageScene('Controls', config.index.control);
      Q.clearStage(config.index.paused);
      this.p.opacity = 0.75;
    },

    touchEnd: function() {
      this.p.opacity = 1;
    },
  }
);

Q.Sprite.extend(
  'ControlSound',
  {
    init: function(p) {
      this._super(p, {
        asset: config.canPlay ? 'soundOn.png' : 'soundOff.png',
        y: 0,
        x: -50,
        opacity: 1,
      });
      this.on('touch, touchEnd');
    },

    touch: function() {
      if (config.canPlay) {
        config.canPlay = false;
        this.p.asset = 'soundOff.png';
        Sound.stop();
      } else {
        config.canPlay = true;
        this.p.asset = 'soundOn.png';
        Sound.play('level11:loop');
      }
      this.p.opacity = 0.75;
    },

    touchEnd: function() {
      this.p.opacity = 1;
    },
  }
);

export default Q.scene('Paused', function(stage) {
  hs = stage.options.h;
  ws = stage.options.w;

  let box = stage.insert(new Q.UI.Container({
    x: ws/2,
    y: hs/2,
    fill: 'rgba(0,0,0,0.5)',
    h: hs,
    w: ws,
  }));

  box.insert(new Q.UI.Text({
    x: 0,
    y: -100,
    label: 'PAUSED',
    color: '#FFF',
    size: 32,
  }));

  box.insert(new Q.ControlContinue());
  box.insert(new Q.ControlSound());

});
