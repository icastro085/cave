import Q from './../q';

Q.animations('player', {
  run: {frames: [9, 10], rate: 1/5},
  stand: {frames: [6], rate: 1/5},
  jump: {frames: [5], rate: 1/5},
});

export default Q.Sprite.extend(
  'Player',
  {
    init: function(p) {
      this._super(p, {
        sprite: 'player',
      });

      this.add('2d, platformerControls, animation');
    },

    step: function(dt) {
      if (Q.inputs['right']) {
        this.p.flip = false;
      } else if (Q.inputs['left']) {
        this.p.flip = 'x';
      }

      if (this.p.landed < 0) {
        this.play('jump');
      } else if (Q.inputs['left'] || Q.inputs['right']) {
        this.play('run');
      } else {
        this.play('stand');
      }
    },
  }
);
