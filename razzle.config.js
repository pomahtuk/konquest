module.exports = {
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: true,
        useEslint: true,
        tsLoader: {
          transpileOnly: true
        },
        forkTsChecker: {
          tslint: false
        }
      }
    }
  ]
};
