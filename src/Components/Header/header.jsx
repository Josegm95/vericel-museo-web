import React, { useState, useEffect } from 'react';
import { prismicRequest } from '../../Requests/prismic';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const [orders, setOrders] = useState(null);
  const [families, setFamilies] = useState(null);
  const [specimens, setSpecimens] = useState(null);

  useEffect(() => {
    prismicRequest('document.type', 'orden', data => {
      setOrders(data);
    });
    prismicRequest('document.type', 'familia', data => {
      setFamilies(data);
    });
    prismicRequest('document.type', 'especimen', data => {
      setSpecimens(data);
    });
  }, []);

  return (
    <header className="header-container">
      <nav>
        <ul className="menu-container">
          <li className="menu__item">
            <Link to="/">Inicio</Link>
          </li>
          {orders
            ? orders.results.map((order, index) => (
                <li key={index} className="menu__item">
                  <Link to={`/orden/${order.slugs[0]}`}>
                    {order.data.nombre[0].text}
                  </Link>
                  <div className="submenu-container">
                    {families
                      ? families.results
                          .filter(family => family.tags[0] === order.slugs[0])
                          .map((family, index) => (
                            <div key={index} className="submenu">
                              <span to="/">{family.data.nombre[0].text}</span>
                              <ul>
                                {specimens
                                  ? specimens.results
                                      .filter(specimen =>
                                        specimen.tags.includes(family.slugs[0])
                                      )
                                      .map((specimen, index) => (
                                        <li
                                          key={index}
                                          className="submenu__item"
                                        >
                                          <Link
                                            to={`/especimen/${specimen.slugs[0]}`}
                                          >
                                            {specimen.data.nombre[0].text}
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
