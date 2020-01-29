import React, { useState, useEffect } from 'react';
import { Slider } from '../../Components/components';
import { prismicRequest } from '../../Requests/prismic';
import { Link } from 'react-router-dom';
import './home.scss';

const Home = () => {
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    prismicRequest('document.type', 'homepage', data => {
      setData(data);
    });
    prismicRequest('document.type', 'orden', data => {
      setOrders(data);
    });
  }, []);

  return (
    <section className="home-container max-width-limit">
      <Slider />
      <section className="home__description">
        {data ? (
          <>
            <h1>{data.results[0].data.titulo[0].text}</h1>
            <p>{data.results[0].data.parrafo[0].text}</p>
          </>
        ) : null}
      </section>
      <section className="home__orders-container">
        <h2>Principales Ordenes</h2>
        <div className="home__orders">
          {orders
            ? orders.results.map((order, index) => (
                <Link key={index} to={`/orden/${order.slugs[0]}`}>
                  <article className="home__order">
                    <img src={order.data.imageurl.url} alt="" />
                    <div className="home__order__description">
                      <h2>{order.data.nombre[0].text}</h2>
                      <p>{order.data.descripcion[0].text}</p>
                    </div>
                  </article>
                </Link>
              ))
            : null}
        </div>
      </section>
    </section>
  );
};

export default Home;
