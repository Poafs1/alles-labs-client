import { CONSTANTS } from '../constants';

const tokenGet = (token: string) => {
  return localStorage.getItem(token);
};

const tokenRemoveAll = () => {
  localStorage.removeItem(CONSTANTS.token.accessToken);
  localStorage.removeItem(CONSTANTS.token.refreshToken);
};

const tokenSetAll = ({ refreshToken, accessToken }: { refreshToken: string; accessToken: string }) => {
  localStorage.setItem(CONSTANTS.token.accessToken, accessToken);
  localStorage.setItem(CONSTANTS.token.refreshToken, refreshToken);
};

const getAccessToken = () => {
  return localStorage.getItem(CONSTANTS.token.accessToken);
};

const getRefreshToken = () => {
  return localStorage.getItem(CONSTANTS.token.refreshToken);
};

export { tokenGet, tokenRemoveAll, tokenSetAll, getAccessToken, getRefreshToken };
