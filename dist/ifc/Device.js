import React from "../../web_modules/react.js";
class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.get_state();
    this.refresh_timer = setInterval(this.update_state.bind(this), 500);
  }
  get_state() {
    const {device} = this.props;
    const {type, connection, id, name, manufacturer, state} = device;
    return {type, connection, id, name, manufacturer, state};
  }
  update_state() {
    this.setState(this.get_state());
  }
  render() {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h2", null, "Device:"), /* @__PURE__ */ React.createElement("div", null, "Type: ", this.state.type), /* @__PURE__ */ React.createElement("div", null, "Status: ", this.state.connection), /* @__PURE__ */ React.createElement("div", null, "ID: ", this.state.id), /* @__PURE__ */ React.createElement("div", null, "Name: ", this.state.name), /* @__PURE__ */ React.createElement("div", null, "Manufacturer: ", this.state.manufacturer), /* @__PURE__ */ React.createElement("div", null, "State: ", this.state.state));
  }
}
export {Device};
