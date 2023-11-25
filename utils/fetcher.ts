import axios from 'axios';
import { tokenGet, tokenRemoveAll, tokenSetAll } from './localstorage';
import { CONSTANTS } from '../constants';
import { ContentTypeEnum } from '../enums/contentType';

const handleFetchError = () => {
  tokenRemoveAll();
  window.location.href = CONSTANTS.redirection.home;
};

export const fetcher = async (url: string, isPublic = false, token = '') => {
  try {
    const accessToken = token === '' ? tokenGet(CONSTANTS.token.accessToken) : token;

    if (!isPublic && !accessToken) return;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: ContentTypeEnum.APPLICATION_JSON,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const refreshToken = tokenGet(CONSTANTS.token.refreshToken);

      if (!refreshToken) {
        handleFetchError();

        return;
      }

      try {
        const refreshResponse = await axios.post(
          CONSTANTS.api.auth + '/refresh',
          {
            refreshToken,
          },
          {
            headers: {
              ContentType: ContentTypeEnum.APPLICATION_JSON,
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        if (refreshResponse.status !== 201) {
          handleFetchError();

          return;
        }
        const newAccessToken = refreshResponse.data.accessToken;

        tokenSetAll({ refreshToken: String(refreshToken), accessToken: newAccessToken });

        const retryResponse = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            ContentType: ContentTypeEnum.APPLICATION_JSON,
          },
        });

        return retryResponse.data;
      } catch (refreshError) {
        handleFetchError();
      }
    }

    handleFetchError();
  }
};
