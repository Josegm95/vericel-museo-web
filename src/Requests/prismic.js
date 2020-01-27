import { useState, useEffect } from 'react';
import Prismic from 'prismic-javascript';

export const usePrismicRequest = (predicatePath, value) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  const apiEndpoint = 'https://museovericel.cdn.prismic.io/api/v2';
  const accessToken =
    'MC5YaU1SZUJBQUFDVUFmSlNw.A--_vQbvv71laWjvv70VDABC77-977-9Pxfvv73vv71t77-9XGTvv73vv73vv73vv73vv71LMXrvv70i';

  useEffect(() => {
    setLoading(true);
    const Client = Prismic.client(apiEndpoint, { accessToken });

    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.at(predicatePath, value)
      );
      if (response) {
        setData(response);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return [data, loading];
};
