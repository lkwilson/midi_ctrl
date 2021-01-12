import React from "../../web_modules/react.js";
import {get_web_midi} from "./setup.js";
import {Device} from "./Device.js";
class MidiController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      devices: {}
    };
    this.web_midi = null;
    get_web_midi().then(this.loaded.bind(this));
  }
  loaded(web_midi) {
    this.web_midi = web_midi;
    this.web_midi.addListener("disconnected", this.device_disconnected.bind(this));
    this.web_midi.addListener("connected", this.device_connected.bind(this));
    this.setState({loaded: true});
    this.update();
  }
  device_connected() {
    this.update();
  }
  device_disconnected() {
    this.update();
  }
  update() {
    console.log("Updating device list");
    console.log(this.web_midi);
    const devices = {};
    this.web_midi.outputs.forEach((device) => {
      devices[device.id] = device;
    });
    this.web_midi.inputs.forEach((device) => {
      devices[device.id] = device;
    });
    this.setState({devices});
  }
  render_loading() {
    return /* @__PURE__ */ React.createElement("div", null, "Loading...");
  }
  render_no_devices() {
    return /* @__PURE__ */ React.createElement("div", null, "No input devices found.");
  }
  render_devices() {
    const {devices} = this.state;
    const device_keys = Object.keys(devices).sort();
    if (device_keys.length === 0) {
      return this.render_no_devices();
    }
    return device_keys.map((key) => /* @__PURE__ */ React.createElement(Device, {
      key,
      device: devices[key]
    }));
  }
  render() {
    const {loaded} = this.state;
    if (!loaded) {
      return this.render_loading();
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, this.render_devices());
  }
}
export {MidiController};
