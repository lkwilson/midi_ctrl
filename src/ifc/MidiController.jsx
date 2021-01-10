import React from 'react';

import { get_web_midi } from './setup';
import { OutputDevice } from './OutputDevice';
import { InputDevice } from './InputDevice';

class MidiController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      output_devices: {},
      input_devices: {},
    };
    this.web_midi = null;
    get_web_midi().then(this.loaded.bind(this));
  }

  loaded(web_midi) {
    this.web_midi = web_midi;
    this.web_midi.addListener('disconnected', this.device_disconnected.bind(this));
    this.web_midi.addListener('connected', this.device_connected.bind(this));
    this.setState({ loaded: true });
    this.update();
  }

  device_connected() {
    this.update();
  }

  device_disconnected() {
    this.update();
  }

  update() {
    console.log("Updating device list", this.web_midi);
    const output_devices = {};
    const input_devices = {};
    this.web_midi.outputs.forEach(output => {
      const { id } = output;
      output_devices[id] = output;
    });
    this.web_midi.inputs.forEach(input => {
      const { id } = input;
      input_devices[id] = input;
    });
    this.setState({ input_devices, output_devices });
  }

  render_loading() {
    return <div>Loading...</div>;
  }

  render_input_devices() {
    const { input_devices } = this.state;
    const device_keys = Object.keys(input_devices).sort();
    if (device_keys.length === 0) {
      return <div>No input devices found.</div>
    }

    return device_keys.map(key => <InputDevice device={input_devices[key]} />);
  }

  render_output_devices() {
    const { output_devices } = this.state;
    const device_keys = Object.keys(output_devices).sort();
    if (device_keys.length === 0) {
      return <div>No output devices found.</div>
    }

    return device_keys.map(key => <OutputDevice device={output_devices[key]} />);
  }

  render() {
    const { loaded } = this.state;

    if (!loaded) {
      return this.render_loading();
    }

    return (
      <React.Fragment>
        <h2>Input Devices:</h2>
        {this.render_input_devices()}
        <h2>Output Devices:</h2>
        {this.render_output_devices()}
      </React.Fragment>
    );
  }
}

export { MidiController };
