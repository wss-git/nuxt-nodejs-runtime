const serverless = require('serverless-http');
const getAliyunCb = require('./aliyun-serverless-http');

const nuxt = require('./nuxt');

module.exports.handler = getAliyunCb(serverless(nuxt));
