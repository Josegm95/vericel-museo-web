import React from 'react';
import { usePrismicRequest } from '../../Requests/prismic';
import { Link } from 'react-router-dom';
import './order.scss';

const Order = ({ match }) => {
  const [data, loading] = usePrismicRequest('document.tags', ['diptera']);

  return (
    <section>
      {!loading && data
        ? data.results
            .filter(item => item.type === 'familia')
            .map((familia, index) => (
              <article key={index} className="family-container">
                <figure className="family__image">
                  <img src={familia.data.imagenurl.url} alt="" />
                </figure>
                <div className="family__content">
                  <h2>{familia.data.nombre[0].text}</h2>
                  <p>{familia.data.descripcion[0].text}</p>
                  <h3>Especies</h3>
                  <ul>
                    {data.results
                      .filter(item => item.tags.includes(familia.slugs[0]))
                      .map((especie, index) => (
                        <li key={index}>
                          <Link to={`/especimen/${especie.slugs[0]}`}>
                            {especie.data.nombre[0].text}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </article>
            ))
        : null}
    </section>
  );
};

export default Order;
