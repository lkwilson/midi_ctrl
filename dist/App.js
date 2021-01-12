import React from "../web_modules/react.js";
import {MidiController} from "./ifc/MidiController.js";
function App() {
  let ctrl;
  if ("requestMIDIAccess" in navigator) {
    ctrl = /* @__PURE__ */ React.createElement(MidiController, null);
  } else {
    ctrl = /* @__PURE__ */ React.createElement("div", null, "MIDI not supported :( Please use chrome on a desktop/laptop");
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "MidiApp"), ctrl);
}
export {App};
