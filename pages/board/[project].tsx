import Sidebar from '@/components/navigations/sidebar';
import { KanbanBoard } from '@/components/templates/kanbanBoard';
import { CONSTANTS } from '@/constants';
import Layout from '@/layouts/main';
import { fetcher } from '@/utils/fetcher';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { resetServerContext } from 'react-beautiful-dnd';
import useSWR from 'swr';
import { capitalize } from 'lodash';
import { CreateWorkflowButton } from '@/components/templates/createWorkflowButton';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { project } = router.query;
  const { data, mutate } = useSWR(project ? `${CONSTANTS.api.core}/projects/${project}` : null, fetcher);

  return (
    <Layout>
      <Sidebar>
        <main className='py-10 space-y-10'>
          <header className='px-4 md:px-10 block md:flex justify-between space-y-4 md:space-y-0'>
            <div className='flex items-center space-x-4'>
              {data && (
                <Image
                  src={data?.coverImage}
                  alt={`${data?.name} brand logo`}
                  width={48}
                  height={48}
                  className='rounded-full'
                />
              )}
              <div>
                <h1 className='text-2xl font-bold whitespace-nowrap'>
                  {t('pages.boardProject.boardName', {
                    name: capitalize(data?.name),
                  })}
                </h1>
                <p className='text-sm text-gray-700'>{data?.nameId}</p>
              </div>
            </div>
            <CreateWorkflowButton project={data} workflows={data?.workflows || []} callback={() => mutate()} />
          </header>
          <section className='space-y-10'>
            <KanbanBoard project={data} mutate={mutate} />
          </section>
        </main>
      </Sidebar>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  resetServerContext();

  return { props: { data: [] } };
};
