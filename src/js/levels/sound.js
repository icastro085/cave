import Q from './../q';
import config from './../config';

export default {
  play: function(label) {
    let options = label.split(/\s*\:\s*/g);
    if (config.canPlay) {
      Q.audio.play(
        `${options[0]}.mp3`, {
          loop: options.indexOf('loop') !== -1,
        }
      );
    }
  },

  stop: function(label) {
    Q.audio.stop(label ? `${label}.mp3` : null);
  }
};
