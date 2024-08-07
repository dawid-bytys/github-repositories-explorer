import axios, { isAxiosError } from 'axios';

export const githubClient = axios.create();

githubClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isAxiosError(error) && error.response) {
      let message = error.response.data.message;

      if (error.response.status === 403) {
        message = 'Rate limit exceeded. Please try again later.';
      } else if (error.response.status === 429) {
        message = 'Hey, slow down...';
      }

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  },
);
