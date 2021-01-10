import React from 'react';

import { get_web_midi } from './setup';
import { Device } from './Device';

class MidiController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      devices: {},
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
    console.log("Updating device list");
    console.log(this.web_midi);
    const devices = {};
    this.web_midi.outputs.forEach(device => {
      devices[device.id] = device;
    });
    this.web_midi.inputs.forEach(device => {
      devices[device.id] = device;
    });
    this.setState({ devices });
  }

  render_loading() {
    return <div>Loading...</div>;
  }

  render_no_devices() {
    return <div>No input devices found.</div>
  }

  render_devices() {
    const { devices } = this.state;
    const device_keys = Object.keys(devices).sort();
    if (device_keys.length === 0) {
      return this.render_no_devices();
    }

    return device_keys.map(key => <Device key={key} device={devices[key]} />);
  }

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return this.render_loading();
    }

    return (
      <React.Fragment>
        {this.render_devices()}
      </React.Fragment>
    );
  }
}

export { MidiController };
