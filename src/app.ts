import { RequestConfig } from 'umi';
import crypto from 'crypto';
import urlParse from 'url-parse';

export const onRouteChange = (router: any) => {
  console.log(router);
};

export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [
    async function beforeRequest({ req }, next) {
      const { params } = req.options;
      const parsed = urlParse(req.url);
      const now = Date.now();
      // @ts-ignore
      const content = parsed.pathname + now + USE_TOKEN;
      const token = crypto.createHash('md5').update(content).digest('hex');

      req.options.params = {
        token,
        timeStamp: now,
        ...params,
      };
      await next();
    },
  ],
};