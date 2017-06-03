import Q from './../q';

export default Q.component('Enemy', {
  added: function() {
    this.entity.add('aiBounce, animation');
    this.entity.play('run');
    this.entity.on('bump.top', this.entity, 'die');
    this.entity.p.deadTimer = 0;
  },

  extend: {
    die: function(collision) {
      let player = collision.obj;
      if (player.isA('Player')) {
        this.p.dead = true;
        this.p.vx = 0;
        this.p.vy = -250;
        this.play('die');
        this.p.gravityY = Q.gravityY;
        this.p.sensor = true;

        player.p.vy = -600;
      }
    },
    step: function() {
      if (this.p.dead) {
        this.p.opacity -= 0.02;
        if (this.p.opacity <= 0) {
          this.destroy();
        }
      }
    },
  },
});
