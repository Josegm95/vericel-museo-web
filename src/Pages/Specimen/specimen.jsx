import React from 'react';

const Specimen = ({ match }) => {
  return <div>{match.params.specimen}</div>;
};

export default Specimen;
