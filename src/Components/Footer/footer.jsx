import React, { useState, useEffect } from 'react';
import { prismicRequest } from '../../Requests/prismic';
import './footer.scss';

const Footer = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    prismicRequest('document.type', 'footer', (data) => {
      setData(data);
    });
  }, []);

  return (
    data && (
      <section className="footer-container">
        <>
          <h2>{data.results[0].data.titulo[0].text}</h2>
          <div className="footer__content">
            {data.results[0].data.contenido.map((item, index) => {
              return <p key={index}>{item.text}</p>;
            })}
          </div>
        </>
      </section>
    )
  );
};

export default Footer;
