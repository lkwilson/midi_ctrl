import WebMidi from 'webmidi';

function get_web_midi() {
  if (WebMidi.enabled) {
    return Promise.resolve(WebMidi);
  }

  return new Promise((resolve, reject) => {
    WebMidi.enable(err => {
      if (err) {
        reject(err);
      } else {
        resolve(WebMidi);
      }
    });
  });
}

export { get_web_midi }
