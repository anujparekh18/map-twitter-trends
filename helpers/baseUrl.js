const { process } = require('autoprefixer');

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://map-twitter-trends.vercel.app'
    : 'http://localhost:3000';
export default baseUrl;