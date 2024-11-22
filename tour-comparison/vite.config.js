export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://course-api.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};