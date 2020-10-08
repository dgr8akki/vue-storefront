
import express from 'express';

const app = express();
app.use(express.json());

const excludeExpress = (nuxtOptions) => {
  const prevExtend = nuxtOptions.build.extend;

  nuxtOptions.build.extend = (config, ...args) => {
    config.externals = ['express'];

    if (prevExtend) prevExtend(config, ...args);
  };
};

const extend = (fn) => fn(app);

const createMiddleware = (moduleOptions, nuxtOptions) => {
  excludeExpress(nuxtOptions);

  if (moduleOptions.extendApi) {
    extend(moduleOptions.extendApi);
  }

  return {
    middleware: {
      path: '/api',
      handler: app
    },
    extend
  };
};

export default createMiddleware;
