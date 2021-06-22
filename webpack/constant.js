// 用来放公共变量，比如说路径啥的
const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;
const isDev = process.env.NODE_ENV !== 'production';

// 为本地服务器指定IP、端口
const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 9000;

module.exports = {
  isDev,
  PROJECT_NAME,
  PROJECT_PATH,
  SERVER_HOST,
  SERVER_PORT,
};
