function status200ish(status) {
  return status >= 200 && status < 300;
}

function checkStatus(response) {
  if (status200ish(response.status))
    return response;
  else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function ajax(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

export function get(url, options = {}) {
  return ajax(url, options);
}

export function post(url, options) {
  return ajax(url, { ...options, method: 'post' });
}
