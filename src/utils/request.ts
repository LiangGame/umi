import { request } from '@@/plugin-request/request';
import { RequestOptionsInit  } from 'umi-request';

export default (url: string, option?: RequestOptionsInit & {skipErrorHandler?: boolean | undefined}) => {
  return request(url, {
    prefix: 'http://192.168.3.12:3000',
    ...option,
  });
};
