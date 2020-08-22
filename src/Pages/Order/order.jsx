import React, { useState, useEffect } from 'react';
import { prismicRequest } from '../../Requests/prismic';
import { Link } from 'react-router-dom';
import './order.scss';

const Order = ({
  match: {
    params: { order },
  },
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    prismicRequest('document.tags', [order], (data) => {
      setData(data);
    });
  }, [order]);

  return (
    <section>
      {data &&
        data.results
          .filter((item) => item.type === 'familia')
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
                    .filter((item) => item.tags.includes(family.slugs[0]))
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
          ))}
    </section>
  );
};

export default Order;
