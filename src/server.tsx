import path from "path";

import App, { GalaxyCredit } from "./client/App";
import React from "react";
import { ServerLocation, isRedirect } from "@reach/router";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";

import { Provider } from "react-redux";
import storeCreator from "./client/stores/game.store";
import ThemeProvider from "./client/view/themes/ThemeProvider";
import baseTheme from "./client/view/themes/base.theme";
const store = storeCreator();

// @ts-ignore
import credits from "../public/credits.json";
import { randomInt } from "./client/proceduralGeneration/random";
import { COOKIE_NAME } from "./client/persisters/cookies.persister";
// eslint-disable-next-line
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

interface RequestWithCookies extends Request {
  cookies: { [key: string]: string };
}

server
  .use(cookieParser())
  .disable("x-powered-by")
  .use(express.static(path.resolve(process.env.RAZZLE_PUBLIC_DIR || "/public")))
  .get("/*", (req: RequestWithCookies, res: Response): void => {
    const galaxyVariant = `galaxy_${randomInt(1, 10)}`;
    const galaxyCredit: GalaxyCredit = credits[galaxyVariant];

    const storedGame = req.cookies[COOKIE_NAME];

    let markup = "";
    try {
      markup = renderStylesToString(
        renderToString(
          <Provider store={store}>
            <ThemeProvider theme={baseTheme}>
              <ServerLocation url={req.url}>
                <App image={galaxyVariant} credit={galaxyCredit} storedGame={storedGame} />
              </ServerLocation>
            </ThemeProvider>
          </Provider>
        )
      );
    } catch (error) {
      if (isRedirect(error)) {
        res.redirect(error.uri);
        return;
      }
    }

    const preloadedState = store.getState();

    res.status(200).send(`
      <!doctype html>
        <html lang="">
        <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>Galactic conquest</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://fonts.googleapis.com/css?family=Electrolize|Titillium+Web:400,700&display=swap" rel="stylesheet">
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
  });

export default server;
