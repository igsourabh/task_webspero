module.exports = {
  apps: [
    {
      name: "production",
      script: "./dist/index.js",
      watch: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
    },
  ],
};
