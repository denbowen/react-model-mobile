const autoprefixer = require('autoprefixer');

// postcss配置文件
module.exports = {
  parser: 'postcss-scss', // 在postcss情况下，可以在less中加行内注释
  plugins: [autoprefixer()],
};
