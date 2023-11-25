import '../i18n/i18n';
import '../styles/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { StoreProvider } from '../hooks/store';
import Layout from '../layouts/main';
import axios from 'axios';
import { SERVER } from '../configs';
import { ContentTypeEnum } from '../enums/contentType';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  axios.defaults.baseURL = SERVER;
  axios.defaults.headers['Content-Type'] = ContentTypeEnum.APPLICATION_JSON;

  return (
    <StoreProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StoreProvider>
  );
}

export default MyApp;
