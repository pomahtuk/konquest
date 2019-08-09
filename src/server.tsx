import App from "./client/App";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { StaticRouterContext } from "react-router";
import express from "express";
import { renderToString } from "react-dom/server";
import { Provider as StyletronProvider } from "styletron-react";
import { Server as Styletron } from "styletron-engine-atomic";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();

// eslint-disable-next-line
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR || "/public"))
  .get("/*", (req, res): void => {
    const context: StaticRouterContext = {};
    const markup = renderToString(
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </BaseProvider>
      </StyletronProvider>
    );

    const styles = engine.getStylesheetsHtml();

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
              ${
                process.env.NODE_ENV === "production"
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`
              }
              ${styles}
          </head>
          <body>
              <div id="root">${markup}</div>
          </body>
        </html>
      `);
    }
  });

export default server;
