import App from "./client/App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { StaticRouterContext } from "react-router";
import express from "express";
import { renderToString } from "react-dom/server";

import { Provider as StyletronProvider } from "styletron-react";
import { Server as Styletron } from "styletron-engine-atomic";
const engine = new Styletron();

import { Provider } from "react-redux";
import storeCreator from "./client/stores/game.store";
const store = storeCreator();

// eslint-disable-next-line
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || "/public"))
  .get("/*", (req, res): void => {
    const context: StaticRouterContext = {};
    const markup = renderToString(
      <Provider store={store}>
        <StyletronProvider value={engine}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </StyletronProvider>
      </Provider>
    );

    const styles = engine.getStylesheetsHtml();
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
            <title>Welcome to Razzle</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ""}
            ${styles}
          </head>
          <body>
            <div id="root">${markup}</div>
            <script>
              // WARNING: See the following for security issues around embedding JSON in HTML:
              // http://redux.js.org/recipes/ServerRendering.html#security-considerations
              window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, "\\u003c")}
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
