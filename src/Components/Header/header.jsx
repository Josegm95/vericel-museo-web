import React from 'react';
import { usePrismicRequest } from '../../Requests/prismic';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const [ordenes] = usePrismicRequest('document.type', 'orden');
  const [familias] = usePrismicRequest('document.type', 'familia');
  const [especimenes] = usePrismicRequest('document.type', 'especimen');

  return (
    <header className="header-container">
      <nav>
        <ul className="menu-container">
          <li className="menu__item">
            <Link to="/">Inicio</Link>
          </li>
          {ordenes
            ? ordenes.results.map((orden, index) => (
                <li key={index} className="menu__item">
                  <Link to={`/orden/${orden.slugs[0]}`}>
                    {orden.data.nombre[0].text}
                  </Link>
                  <div className="submenu-container">
                    {familias
                      ? familias.results
                          .filter(familia => familia.tags[0] === orden.slugs[0])
                          .map((familia, index) => (
                            <div key={index} className="submenu">
                              <span to="/">{familia.data.nombre[0].text}</span>
                              <ul>
                                {especimenes
                                  ? especimenes.results
                                      .filter(especimen =>
                                        especimen.tags.includes(
                                          familia.slugs[0]
                                        )
                                      )
                                      .map((especimen, index) => (
                                        <li
                                          key={index}
                                          className="submenu__item"
                                        >
                                          <Link
                                            to={`/especimen/${especimen.slugs[0]}`}
                                          >
                                            {especimen.data.nombre[0].text}
                                          </Link>
                                        </li>
                                      ))
                                  : null}
                              </ul>
                            </div>
                          ))
                      : null}
                  </div>
                </li>
              ))
            : null}
          <li className="menu__item">
            <Link to="/nosotros">Nosotros</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
