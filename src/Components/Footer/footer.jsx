import React from 'react';
import { usePrismicRequest } from '../../Requests/prismic';
import './footer.scss';

const Footer = () => {
  const [data, loading] = usePrismicRequest('document.type', 'footer');

  return (
    <section className="footer-container">
      {!loading && data ? (
        <>
          <h2>{data.results[0].data.titulo[0].text}</h2>
          <div className="footer__content">
            {data.results[0].data.contenido.map((item, index) => {
              return <p key={index}>{item.text}</p>;
            })}
          </div>
        </>
      ) : null}
    </section>
  );
};

export default Footer;
