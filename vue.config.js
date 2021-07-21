module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    proxy: {
      "/api": {
        target: "http://39.98.123.211",
        // pathRewrite: { "^/api": "" },
        changeOrigin: true,
      },
    },
  },
};
