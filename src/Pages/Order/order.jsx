import React from 'react';
import { usePrismicRequest } from '../../Requests/prismic';
import { Link } from 'react-router-dom';
import './order.scss';

const Order = ({ match }) => {
  const [data, loading] = usePrismicRequest('document.tags', [
    match.params.order
  ]);

  if (!loading && data) {
    console.log(match.params.order);
  }

  return (
    <section>
      {!loading && data
        ? data.results
            .filter(item => item.type === 'familia')
            .map((family, index) => (
              <article key={index} className="family-container">
                <figure className="family__image">
                  <img src={family.data.imagenurl.url} alt="" />
                </figure>
                <div className="family__content">
                  <h2>{family.data.nombre[0].text}</h2>
                  <p>{family.data.descripcion[0].text}</p>
                  <h3>Especies</h3>
                  <ul>
                    {data.results
                      .filter(item => item.tags.includes(family.slugs[0]))
                      .map((specie, index) => (
                        <li key={index}>
                          <Link to={`/especimen/${specie.slugs[0]}`}>
                            {specie.data.nombre[0].text}
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
