import Q from './../q';
import config from './../config';

let ws = 0;
let hs = 0;

Q.component('Control', {
  added: function() {
    this.entity.on('touch, touchEnd');
    this.entity.p.opacity = 0.5;
  },

  extend: {
    touch: function() {
      if (this.p.actionName) {
        Q.inputs[this.p.actionName] = true;
        Q.input.trigger(this.p.actionName);
      }

      this.p.opacity = 0.75;
    },
    touchEnd: function() {
      if (this.p.actionName) {
        Q.inputs[this.p.actionName] = false;
      }
      this.p.opacity = 0.5;
    },
  },
});

Q.Sprite.extend(
  'ControlDirectionBack',
  {
    init: function(p) {
      this._super(p, {
        asset: 'controlCircle.png',
        y: hs - 100,
        x: 200,
        opacity: 0.5,
      });
    },
  }
);

Q.Sprite.extend(
  'ControlDirection',
  {
    init: function(p) {
      this._super(p, {
        asset: 'controlDirection.png',

        y: hs - 100,
        x: 200,

        yo: hs - 100,
        xo: 200,

        opacity: 0.5,
      });

      this.on('touchEnd, drag');
    },

    drag: function(touch) {
      this.p.x = touch.x;
      this.p.opacity = 0.75;

      const d = 50;

      if (this.p.x < this.p.xo - d) {
        this.p.x = this.p.xo - d;
      } else if (this.p.x > this.p.xo + d) {
        this.p.x = this.p.xo + d;
      }

      if (this.p.x < this.p.xo) {
        Q.inputs['left'] = true;
        Q.inputs['right'] = false;
        Q.input.trigger('left');
      } else {
        Q.inputs['left'] = false;
        Q.inputs['right'] = true;
        Q.input.trigger('right');
      }
    },

    touchEnd: function() {
      this.p.y = this.p.yo;
      this.p.x = this.p.xo;

      Q.inputs['left'] = false;
      Q.inputs['right'] = false;

      this.p.opacity = 0.5;
    },
  }
);

Q.Sprite.extend(
  'ControlAction',
  {
    init: function(p) {
      this._super(p, {
        asset: 'b.png',
        y: hs - 75,
        x: ws - 150,
        actionName: 'action',
      });
      this.add('Control');
    },
  }
);

Q.Sprite.extend(
  'ControlFire',
  {
    init: function(p) {
      this._super(p, {
        asset: 'a.png',
        y: hs - 175,
        x: ws - 100,
        actionName: 'fire',
      });
      this.add('Control');
    },
  }
);

Q.Sprite.extend(
  'ControlPause',
  {
    init: function(p) {
      this._super(p, {
        asset: 'pause.png',
        y: 50,
        x: ws - 75,
        opacity: 1,
      });
      this.on('touch, touchEnd');
    },

    touch: function() {
      Q.stage(config.index.level).pause();
      Q.clearStage(config.index.control);
      Q.stageScene('Paused', config.index.paused);

      this.p.opacity = 0.75;
    },

    touchEnd: function() {
      this.p.opacity = 1;
    },
  }
);

export default Q.scene('Controls', function(stage) {
  hs = stage.options.h;
  ws = stage.options.w;

  stage.insert(new Q.ControlDirection());
  stage.insert(new Q.ControlDirectionBack());

  stage.insert(new Q.ControlAction());
  stage.insert(new Q.ControlFire());

  stage.insert(new Q.ControlPause());
});
