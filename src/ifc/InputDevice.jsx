import React from 'react';

function InputDevice(props) {
  const { device } = props;
  return (
    <React.Fragment>
      <div>Input ID: {device.id}</div>
    </React.Fragment>
  );
}

export { InputDevice };
