const fs = require("fs");
const path = require("path");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const appNodeModules = resolveApp("node_modules");

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
  ],
  modify: (config) => {
    // i do not want to have postcss running inside node_modules
    let loaders;
    // first - find css rule and add exclude
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test && rule.test.toString() === "/\\.css$/") {
        // set a subset of rules, excluding postcss for later use
        loaders = rule.use.filter((useItem) => !useItem.loader || !useItem.loader.match(/postcss/));
        rule.exclude.push(appNodeModules);
      }
      return rule;
    });
    // but i want to use loaders so add rule loader back
    config.module.rules.push({
      test: /\.css$/i,
      include: [appNodeModules],
      use: loaders
    });

    return config;
  }
};
