import Q from './../q';
import Enemy from './../component/enemy';

Q.animations('enemies_rat', {
  run: {frames: [96, 98], rate: 1/5},
  die: {frames: [97], loop: false},
});

export default Q.Sprite.extend(
  'Rat',
  {
    init: function(p) {
      this._super(p, {
        sprite: 'enemies_rat',
      });

      this.add('2d');
      this.add(new Enemy(this));
    },
  }
);
