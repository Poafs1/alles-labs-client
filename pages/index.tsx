import { ButtonSelection } from '@/components/buttons/buttonSelection';
import { CreateProjectButton } from '@/components/templates/createProjectButton';
import { CONSTANTS } from '@/constants';
import { IProject } from '@/interfaces/project';
import Layout from '@/layouts/main';
import { fetcher } from '@/utils/fetcher';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

export default function Home() {
  const { t } = useTranslation();
  const { data } = useSWR(CONSTANTS.api.core + '/projects', fetcher);
  const router = useRouter();

  const handleSelectProject = useCallback((project: IProject) => {
    router.push({
      pathname: CONSTANTS.redirection.boardId,
      query: { project: project.nameId },
    });
  }, []);

  return (
    <Layout>
      <main className='space-y-16 py-32 items-center px-0 max-w-lg w-full flex flex-col m-auto min-h-screen relative'>
        <Image src='/static/assets/alles.svg' alt='Alles Labs Brand Logo' width={180} height={52} />
        <div className='space-y-2'>
          {data && data.length ? (
            data?.map((project: IProject) => (
              <div key={project.id}>
                <ButtonSelection
                  coverImage={project.coverImage}
                  alt={`${project.name} brand logo`}
                  label={project.name}
                  onClick={() => handleSelectProject(project)}
                />
              </div>
            ))
          ) : (
            <p className='text-center text-sm font-semibold rounded-lg p-4 bg-gray-100 whitespace-pre'>
              {t('pages.home.youDontHaveAnyProjectsYetCreateOne')}
            </p>
          )}
        </div>
        <CreateProjectButton />
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  resetServerContext();

  return { props: { data: [] } };
};
