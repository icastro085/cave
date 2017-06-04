import Q from './../q';
import config from './../config';

const EMPTY_HEART = 361;
const FULL_HEART = 362;
const HALF_HEART = 363;

Q.Sprite.extend(
  'Heart',
  {
    init: function(p) {
      this._super(p, {
        sheet: 'tiles',
        frame: FULL_HEART,
        y: 50,
      });

      this.on('damageHeart');
    },

    damageHeart: function(damageHeart) {
      switch (this.p.frame) {
        case FULL_HEART:
          this.p.frame = HALF_HEART;
          break;
        case HALF_HEART:
          this.p.frame = EMPTY_HEART;
          break;
        default:
      }
    },
  }
);

export default Q.scene('Ui', function(stage) {
  let i;
  let heartCount = config.heartCount;

  for (i=0; i<heartCount; i++) {
    stage.insert(new Q.Heart({
      x: 60 + i * 100,
    }));
  }
});
