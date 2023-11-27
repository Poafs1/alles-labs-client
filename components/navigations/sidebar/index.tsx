import classNames from 'classnames';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { CONSTANTS } from '@/constants';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { IProject } from '@/interfaces/project';
import { CreateProjectButton } from '@/components/templates/createProjectButton';
import { Dropdown } from '@/components/elements/dropdown';

// interface ISidebarSectionProps extends LinkProps {
//   label: string;
//   isActive: boolean;
// }

interface ISidebarImageProps {
  img: string;
  alt: string;
}

interface ISidebarOptionsProps {
  title: string;
  nameId: string;
  coverImage?: ISidebarImageProps;
  // sections?: ISidebarSectionProps[];
}

export interface ISidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: ISidebarProps) => {
  const { data, mutate } = useSWR(CONSTANTS.api.core + '/projects', fetcher);
  const router = useRouter();
  const { query } = router;

  const handleSelectProject = (nameId: string) => {
    router.push({
      pathname: CONSTANTS.redirection.boardId,
      query: { project: nameId },
    });
  };

  const mapProjectsToOptions = (project: IProject) => {
    return {
      title: project.name,
      nameId: project.nameId,
      coverImage: {
        img: project.coverImage,
        alt: `${project.name} brand logo`,
      },
    };
  };

  const renderSidebarOptions = (options: ISidebarOptionsProps[]) => {
    return (
      <div className='space-y-1'>
        {options?.map(({ title, coverImage, nameId }: ISidebarOptionsProps) => (
          <button
            key={title}
            onClick={() => handleSelectProject(nameId)}
            className={classNames(
              'space-y-2 py-2 px-3.5 rounded-lg cursor-pointer hover:bg-gray-100 block w-full',
              query.project === nameId ? 'bg-gray-100' : 'bg-white',
            )}>
            <div className='flex items-center space-x-2'>
              {coverImage && (
                <Image src={coverImage?.img} alt={coverImage?.alt} width={28} height={28} className='rounded-full' />
              )}
              <h2 className='text-sm font-header font-semibold'>{title}</h2>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='relative'>
      <header className='hidden md:block px-6 py-8 w-[300px] min-w-[300px] min-h-screen absolute bg-white space-y-14'>
        <Image
          src='/static/assets/alles.svg'
          alt='Alles Labs Brand Logo'
          width={150}
          height={50}
          onClick={() => router.push(CONSTANTS.redirection.home)}
          className='cursor-pointer'
        />
        <div className='space-y-4'>
          {renderSidebarOptions(data?.map((project: IProject) => mapProjectsToOptions(project)))}
          <CreateProjectButton />
        </div>
      </header>
      <nav className='md:hidden p-4 flex justify-between'>
        <Image
          src='/static/assets/alles.svg'
          alt='Alles Labs Brand Logo'
          width={150}
          height={50}
          onClick={() => router.push(CONSTANTS.redirection.home)}
          className='cursor-pointer'
        />
        <Dropdown
          label='Project'
          items={[
            ...(data?.map((project: IProject) => ({
              label: project.name,
              onClick: () => handleSelectProject(project.nameId),
              coverImage: project.coverImage,
              alt: `${project.name} brand logo`,
            })) || []),
            <div key='create-project-button'>
              <CreateProjectButton mutate={mutate} />
            </div>,
          ]}
        />
      </nav>
      <div className='md:pl-[300px]'>{children}</div>
    </div>
  );
};

export default Sidebar;
