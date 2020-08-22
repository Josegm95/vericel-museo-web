import Prismic from 'prismic-javascript';

export const prismicRequest = (predicatePath, value, callback) => {
  const apiEndpoint = 'https://museovericeludea.cdn.prismic.io/api/v2';
  const Client = Prismic.client(apiEndpoint);

  Client.query(Prismic.Predicates.at(predicatePath, value)).then((response) => {
    callback(response);
  });
};
