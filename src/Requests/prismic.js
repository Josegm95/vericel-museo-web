import Prismic from 'prismic-javascript';

export const prismicRequest = (predicatePath, value, callback) => {
  const apiEndpoint = 'https://museovericel.cdn.prismic.io/api/v2';
  const accessToken =
    'MC5YaU1SZUJBQUFDVUFmSlNw.A--_vQbvv71laWjvv70VDABC77-977-9Pxfvv73vv71t77-9XGTvv73vv73vv73vv73vv71LMXrvv70i';
  const Client = Prismic.client(apiEndpoint, { accessToken });

  Client.query(Prismic.Predicates.at(predicatePath, value)).then(response => {
    callback(response);
  });
};
