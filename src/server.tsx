import App, { GalaxyCredit } from "./client/App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { StaticRouterContext } from "react-router";
import express from "express";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";

import { Provider } from "react-redux";
import storeCreator from "./client/stores/game.store";
import ThemeProvider from "./client/view/themes/ThemeProvider";
import baseTheme from "./client/view/themes/base.theme";
const store = storeCreator();

import credits from "../public/credits.json";
import { randomInt } from "./client/proceduralGeneration/random";

// eslint-disable-next-line
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || "/public"))
  .get("/*", (req, res): void => {
    const galaxyVariant = `galaxy_${randomInt(1, 10)}`;
    const galaxyCredit: GalaxyCredit = credits[galaxyVariant];

    const context: StaticRouterContext = {};
    const markup = renderStylesToString(
      renderToString(
        <Provider store={store}>
          <ThemeProvider theme={baseTheme}>
            <StaticRouter context={context} location={req.url}>
              <App image={galaxyVariant} credit={galaxyCredit} />
            </StaticRouter>
          </ThemeProvider>
        </Provider>
      )
    );

    const preloadedState = store.getState();

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(`
        <!doctype html>
          <html lang="">
          <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Galactic conquest</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ""}
          </head>
          <body>
            <div id="root">${markup}</div>
            <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // http://redux.js.org/recipes/ServerRendering.html#security-considerations
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")}
              window.__BACKGROUND__ = ${JSON.stringify({ credit: galaxyCredit, image: galaxyVariant })}
            </script>
            ${
              process.env.NODE_ENV === "production"
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
          </body>
        </html>
      `);
    }
  });

export default server;
