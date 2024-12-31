const config = {
  development: {
    apiUrl: 'http://101.34.249.254:8080/api'
  },
  production: {
    apiUrl: 'http://101.34.249.254:8080/api'
  }
};
const apiUrl = config[process.env.NODE_ENV].apiUrl;

export { apiUrl } ;