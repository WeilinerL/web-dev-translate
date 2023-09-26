import { get } from './http';

get('https://web.dev/blog/28/').then(
  (res) => {
    console.log(res);
  },
  (e) => {
    console.log(e);
  }
);
