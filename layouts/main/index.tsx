import { ReactNode } from 'react';
import Head from '../../components/head';
import Sidebar from '@/components/navigations/sidebar';

export interface ILayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div id='app-container' className='min-h-screen'>
      <Head />
      <div className='mx-auto min-h-screen'>
        <div className='mx-auto min-h-screen'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
