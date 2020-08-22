import React, { useState, useContext } from 'react';
import { SiteContext } from '../../Context/siteContext';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => {
  const { orders, families, specimens } = useContext(SiteContext);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header-container">
      <nav>
        <i
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          className="header-container__icon fas fa-bars"
        ></i>
        <ul
          className={`menu-container ${showMenu ? 'menu-container--show' : ''}`}
        >
          <Link
            to="/"
            className="menu__item"
            onClick={() => setShowMenu(false)}
          >
            <li>Inicio</li>
          </Link>
          {orders
            ? orders.map((order, index) => (
                <Link
                  key={index}
                  className="menu__item"
                  onClick={() => setShowMenu(false)}
                  to={`/orden/${order.slugs[0]}`}
                >
                  <li>
                    {order.data.nombre[0].text}
                    <div className="submenu-container">
                      {families
                        ? families
                            .filter(
                              (family) => family.tags[0] === order.slugs[0]
                            )
                            .map((family, index) => (
                              <div key={index} className="submenu">
                                <span to="/">{family.data.nombre[0].text}</span>
                                <ul>
                                  {specimens
                                    ? specimens
                                        .filter((specimen) =>
                                          specimen.tags.includes(
                                            family.slugs[0]
                                          )
                                        )
                                        .map((specimen, index) => (
                                          <Link
                                            key={index}
                                            to={`/especimen/${specimen.slugs[0]}`}
                                            className="submenu__item"
                                          >
                                            <li>
                                              {specimen.data.nombre[0].text}
                                            </li>
                                          </Link>
                                        ))
                                    : null}
                                </ul>
                              </div>
                            ))
                        : null}
                    </div>
                  </li>
                </Link>
              ))
            : null}
          <Link className="menu__item" to="/nosotros">
            <li>Nosotros</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
