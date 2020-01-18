import React, { useEffect } from 'react';
import { usePrismicRequest } from '../../Requests/prismic';
import './home.scss';

const Home = () => {
  const [data, loading] = usePrismicRequest('especimen');

  useEffect(() => {
    if (!loading && data) {
      console.log(data);
    }
  });

  return <section className="home-container">Home</section>;
};

export default Home;
