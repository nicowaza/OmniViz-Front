module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        // ws: true,
        // changeOrigin: true,
      },
    },
  },
};
