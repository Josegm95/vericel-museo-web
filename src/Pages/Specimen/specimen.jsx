import React, { useState, useEffect } from 'react';
import { prismicRequest } from '../../Requests/prismic';
import './specimen.scss';

const Specimen = ({
  match: {
    params: { specimen }
  }
}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    prismicRequest('my.especimen.uid', specimen, data => {
      if (data.total_results_size > 0) {
        setData(data.results[0].data);
      }
    });
  }, [specimen]);

  return (
    <section className="specimen-container max-width-limit">
      {data ? (
        <>
          <figure className="specimen__img">
            <img src={data.url_imagen.url} alt="" />
          </figure>
          <section className="specimen__description section-container">
            <h2>
              {data.nombre[0].text}
              <span>{` (${data.primer_reporte[0].text})`}</span>
            </h2>
            <h3>Sinonimia</h3>
            <ul>
              {data.sinonimia.map((sinonimia, index) => (
                <li key={index}>{sinonimia.text}</li>
              ))}
            </ul>
            <h3>Nombre común</h3>
            <ul>
              {data.nombre_comun.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ul>
          </section>
          <section className="specimen__bionomy section-container section-container--gray">
            <h3>Bionomía</h3>
            {data.bionomia.map((paragraph, index) => (
              <p key={index}>{paragraph.text}</p>
            ))}
          </section>
          <section className="specimen__location section-container">
            <h3>Distribución en Colombia</h3>
            <figure>
              <img src={data.imagen_distribucion.url} alt="" />
            </figure>
            <ol>
              {data.lista_distribucion.map((item, index) => (
                <li key={index}>{item.text}</li>
              ))}
            </ol>
          </section>
          <section className="specimen__importance section-container section-container--gray">
            <div className="specimen__importance__item">
              <h3>Importancia Medica</h3>
              <p>Transmisor de:</p>
              <ul>
                {data.importancia_medica.map((item, index) => (
                  <li key={index}>{item.text}</li>
                ))}
              </ul>
            </div>
            <div className="separator" />
            <div className="specimen__importance__item">
              <h3>Importancia veterinaria</h3>
              <p>Transmisor de:</p>
              <ul>
                {data.importancia_veterinaria.map((item, index) => (
                  <li key={index}>{item.text}</li>
                ))}
              </ul>
            </div>
          </section>
          <section className="specimen__taxonomy section-container">
            <h3>Taxonomía</h3>
            {data.taxonomia.map((item, index) => (
              <div key={index} className="specimen__taxonomy__item">
                <img src={item.url_imagen_claves.url} alt="" />
                <div className="specimen__taxonomy__claves">
                  <h4>{item.titulo_claves[0].text}</h4>
                  <ul>
                    {item.claves_taxonomicas.map((clave, index) => (
                      <li key={index}>{clave.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>
          <section className="specimen__references section-container section-container--gray">
            <h3>Referencias</h3>
            <ul>
              {data.referencias.map((item, index) => (
                <li key={index} className="specimen__references__item">
                  {item.text}
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </section>
  );
};

export default Specimen;
