import React from 'react';
import { Slider } from '../../Components/components';
import { usePrismicRequest } from '../../Requests/prismic';
import './home.scss';

const Home = () => {
  const [data, dataLoading] = usePrismicRequest('document.type', 'homepage');
  const [ordenes, ordenesLoading] = usePrismicRequest('document.type', 'orden');

  return (
    <section className="home-container max-width-limit">
      <Slider />
      <section className="home__description">
        {!dataLoading && data ? (
          <>
            <h1>{data.results[0].data.titulo[0].text}</h1>
            <p>{data.results[0].data.parrafo[0].text}</p>
          </>
        ) : null}
      </section>
      <section className="home__orders-container">
        <h2>Principales Ordenes</h2>
        <div className="home__orders">
          {!ordenesLoading && ordenes
            ? ordenes.results.map((orden, index) => (
                <article key={index} className="home__order">
                  <img src={orden.data.imageurl.url} alt="" />
                  <div className="home__order__description">
                    <h2>{orden.data.nombre[0].text}</h2>
                    <p>{orden.data.descripcion[0].text}</p>
                  </div>
                </article>
              ))
            : null}
        </div>
      </section>
    </section>
  );
};

export default Home;
