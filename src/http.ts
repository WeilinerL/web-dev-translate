import * as https from 'https';

export const get = (url: string, options: https.RequestOptions = {}) => {
  return new Promise((reslove, reject) => {
    https
      .get(url, options, (res) => {
        let html = '';
        res.on('data', (chunk) => {
          html += chunk;
        });
        res.on('end', () => {
          console.log(html);
          reslove(html);
        });
      })
      .on('error', reject);
  });
};
