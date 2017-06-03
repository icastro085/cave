import Q from './../q';
import Enemy from './../component/enemy';

Q.animations('enemies_fly', {
  run: {frames: [78, 79], rate: 1/5},
  die: {frames: [80], loop: false},
});

export default Q.Sprite.extend(
  'Fly',
  {
    init: function(p) {
      this._super(p, {
        sprite: 'enemies_fly',
      });

      this.add('2d');
      this.add(new Enemy(this));
    },
  }
);
