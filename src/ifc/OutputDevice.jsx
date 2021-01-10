import React from 'react';

function OutputDevice(props) {
  const { device } = props;
  return (
    <React.Fragment>
      <div>Output ID: {device.id}</div>
    </React.Fragment>
  );
}

export { OutputDevice };
