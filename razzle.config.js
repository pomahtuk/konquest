module.exports = {
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: true,
        useEslint: true,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true
        },
        forkTsChecker: {
          tsconfig: "./tsconfig.json",
          tslint: false,
          watch: "./src",
          typeCheck: true
        }
      }
    }
  ]
};
