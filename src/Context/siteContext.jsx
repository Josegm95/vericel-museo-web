import React, { createContext, useState, useEffect } from 'react';
import { prismicRequest } from '../Requests/prismic';

export const SiteContext = createContext(null);

const SiteContextContainer = ({ children }) => {
  const [orders, setOrders] = useState();
  const [families, setFamilies] = useState();
  const [specimens, setSpecimens] = useState();

  useEffect(() => {
    prismicRequest('document.type', 'orden', (data) => {
      setOrders(data.results);
    });
    prismicRequest('document.type', 'familia', (data) => {
      setFamilies(data.results);
    });
    prismicRequest('document.type', 'especimen', (data) => {
      setSpecimens(data.results);
    });
  }, []);

  const store = {
    orders,
    families,
    specimens,
  };

  return <SiteContext.Provider value={store}>{children}</SiteContext.Provider>;
};

export default SiteContextContainer;
