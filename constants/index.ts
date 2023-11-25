export interface IConstants {
  brand: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  redirection: {
    home: string;
  };
  api: {
    auth: string;
    user: string;
  };
}

export const CONSTANTS: IConstants = {
  brand: 'Alles Labs',
  token: {
    accessToken: 'access_token',
    refreshToken: 'refresh_token',
  },
  redirection: {
    home: '/',
  },
  api: {
    auth: '/auth',
    user: '/user',
  },
};
