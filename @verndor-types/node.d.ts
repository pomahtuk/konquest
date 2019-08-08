declare namespace NodeJS {
  // These are optional env variables, they may or may not exist on `.env` based on env
  type OptionalVariables = "PORT" | "HOST" | "HOSTNAME";

  // These env variables we are sure that is going to be defined either by `.env` files
  // or under `kubernette.{env}.yml.
  type CompulsoryVariables = "API_HOST" | "RAZZLE_ASSETS_MANIFEST" | "RAZZLE_PUBLIC_DIR";

  type Variables = Partial<Record<OptionalVariables, string>> & Record<CompulsoryVariables, string>;

  interface Global {
    __APOLLO_STATE__: any;
    window: Window & {
      env: Variables;
    };
  }

  interface ProcessEnv extends Variables {}

  interface Process {
    env: ProcessEnv;
    browser?: boolean;
  }
}
