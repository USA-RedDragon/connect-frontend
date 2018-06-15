import { getCommaAccessToken } from './auth';
import ConfigRequest from 'config-request/instance';

const URL_ROOT = 'https://api.commadotai.com/v1/';

const request = ConfigRequest();

var initPromise = init();

async function init() {
  var token = await getCommaAccessToken();
  request.configure({
    baseUrl: URL_ROOT,
    token: 'JWT ' + token,
    jwt: false
  });
}

export async function get(endpoint, data) {
  await initPromise;
  return new Promise((resolve, reject) => {
    request.get(
      endpoint,
      {
        query: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}

export async function post(endpoint, data) {
  await initPromise;
  return new Promise((resolve, reject) => {
    request.post(
      endpoint,
      {
        body: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}

export async function patch(endpoint, data) {
  await initPromise;
  return new Promise((resolve, reject) => {
    request.patch(
      endpoint,
      {
        body: data,
        json: true
      },
      errorHandler(resolve, reject)
    );
  });
}

function errorHandler(resolve, reject) {
  return handle;

  function handle(err, data) {
    if (err) {
      if (err.statusCode === 0) {
        err = new Error('There was an unexpected server error, please try again later.');
      }
      return reject(err);
    }
    resolve(data);
  }
}
