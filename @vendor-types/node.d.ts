declare namespace NodeJS {
  // These are optional env variables, they may or may not exist on `.env` based on env
  type OptionalVariables = "PORT" | "HOST" | "HOSTNAME";

  // These env variables we are sure that is going to be defined either by `.env` files
  // or under `kubernette.{env}.yml.
  type CompulsoryVariables = "API_HOST" | "RAZZLE_ASSETS_MANIFEST" | "RAZZLE_PUBLIC_DIR";

  type Variables = Partial<Record<OptionalVariables, string>> & Record<CompulsoryVariables, string>;

  interface Global {
    window: Window & {
      env: Variables;
      // @ts-ignore
      __PRELOADED_STATE__: any;
      // @ts-ignore
      __BACKGROUND__: any;
    };
  }

  interface Process {
    env: Variables;
    browser?: boolean;
  }
}

interface Window {
  // @ts-ignore
  __PRELOADED_STATE__: any;
  // @ts-ignore
  __BACKGROUND__: any;
}
