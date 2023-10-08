import * as https from 'https';

/**
 * 请求指定资源，响应html原文内容
 * @param url 请求路径
 * @param options 请求配置参数
 * @returns
 */
export const get = (url: string, options: https.RequestOptions = {}) => {
  return new Promise<string>((reslove, reject) => {
    https
      .get(url, options, (res) => {
        let html = '';
        res.on('data', (chunk) => {
          html += chunk;
        });
        res.on('end', () => {
          reslove(html);
        });
      })
      .on('error', reject);
  });
};
