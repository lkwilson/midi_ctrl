import React from 'react';

import { MidiController } from './ifc/MidiController';

function App() {
  let ctrl;
  if ('requestMIDIAccess' in navigator) {
    ctrl = <MidiController />;
  } else {
    ctrl = <div>MIDI not supported :( Please use chrome on a desktop/laptop</div>;
  }

  return (
    <React.Fragment>
      <h1>MidiApp</h1>
      {ctrl}
    </React.Fragment>
  );
}

export { App };
