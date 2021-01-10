import React from 'react';

class Device extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.get_state();
    this.refresh_timer = setInterval(this.update_state.bind(this), 500);
  }

  get_state() {
    const { device } = this.props;
    const { type, connection, id, name, manufacturer, state, } = device;
    return { type, connection, id, name, manufacturer, state, };
  }

  update_state() {
    this.setState(this.get_state());
  }

  render() {
    return (
      <React.Fragment>
        <h2>Device:</h2>
        <div>Type: {this.state.type}</div>
        <div>Status: {this.state.connection}</div>
        <div>ID: {this.state.id}</div>
        <div>Name: {this.state.name}</div>
        <div>Manufacturer: {this.state.manufacturer}</div>
        <div>State: {this.state.state}</div>
      </React.Fragment>
    );
  }
}

export { Device };
