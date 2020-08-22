import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { prismicRequest } from '../../Requests/prismic';
import { SiteContext } from '../../Context/siteContext';
import { Slider } from '../../Components/components';
import './home.scss';

const Home = () => {
  const { orders } = useContext(SiteContext);
  const [home, setHome] = useState(null);

  useEffect(() => {
    prismicRequest('document.type', 'homepage', (data) => {
      setHome(data.results[0].data);
    });
  }, []);

  return (
    <section className="home-container max-width-limit">
      {home && home.slider && <Slider slider={home.slider} />}
      <section className="home__description">
        {home && (
          <>
            <h1>{home.titulo[0].text}</h1>
            <p>{home.parrafo[0].text}</p>
          </>
        )}
      </section>
      <section className="home__orders-container">
        <h2>Principales Ordenes</h2>
        <div className="home__orders">
          {orders
            ? orders.map((order, index) => (
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
