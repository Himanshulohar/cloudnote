import React from 'react';

const Alert = props => {
  return (
    <div className='alert alert-primary m-4 pt-5' role='alert'>
      {props.message}
    </div>
  );
};

export default Alert;
