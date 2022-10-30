import axios from 'axios';

import {getHeaders} from '../utils/apiUtils';

export const runGetApiRequest = async (endpoint, params, token) => {
  const url = `http://localhost:4000/${endpoint}`;

  return axios.get(
    url,
    {
      params,
      headers: getHeaders(token),
    },
  );
};

export const runPostApiRequest = async (endpoint, data, params, token) => {
  const url = `http://localhost:4000/${endpoint}`;

  return axios.post(
    url,
    data,
    {
      params,
      headers: getHeaders(token),
    },
  );
};

export const runUpdateApiRequest = async (endpoint, data = {}, params, token) => {
  const url = `http://localhost:4000/${endpoint}`;

  return axios.put(
    url,
    data,
    {
      params,
      headers: getHeaders(token),
    },
  );
};

export const runDeleteApiRequest = async (endpoint, params, token) => {
  const url = `http://localhost:4000/${endpoint}`;

  return axios.delete(
    url,
    {
      params,
      headers: getHeaders(token),
    },
  );
};
