import React from 'react';

const Family = ({ match }) => {
  return <section>{match.params.family}</section>;
};

export default Family;
