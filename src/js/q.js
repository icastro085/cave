import Quintus from 'quintus';

let Q = Quintus()// eslint-disable-line
  .include('Sprites, Scenes, Input, 2D, Touch, UI, TMX, Anim, Audio')
  .setup({
    maximize: true,
    scaleToFit: true,
    development: true,

    width: 800,
    height: 600,

    upsampleWidth: 800,
    upsampleHeight: 600,

    downsampleWidth: 800,
    downsampleHeight: 600,
  })
  .enableSound()
  .controls();

Q.touch(Q.SPRITE_ALL);
Q.input.disableTouchControls();

export default Q;
