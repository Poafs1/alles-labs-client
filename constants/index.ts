export interface IConstants {
  brand: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  redirection: {
    home: string;
    boardId: string;
  };
  api: {
    core: string;
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
    boardId: '/board/[project]',
  },
  api: {
    core: '/api/core',
  },
};
