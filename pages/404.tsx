import Button from '@/components/buttons/button';
import { CONSTANTS } from '@/constants';
import Layout from '@/layouts/main';
import { useTranslation } from 'react-i18next';

export default function Error() {
  const { t } = useTranslation();

  return (
    <Layout>
      <main className='space-y-16 py-32 items-center px-0 max-w-lg w-full flex flex-col m-auto min-h-screen relative'>
        <h1 className='text-4xl font-bold text-center'>{t('pages.404.404')}</h1>
        <p className='text-center text-sm font-semibold rounded-lg p-4 bg-gray-100 whitespace-pre'>
          {t('pages.404.pageNotFound')}
        </p>
        <Button label={String(t('pages.404.backToHomePage'))} appearance='tertiary' href={CONSTANTS.redirection.home} />
      </main>
    </Layout>
  );
}
