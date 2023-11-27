import Button from '@/components/buttons/button';
import InputForm from '@/components/forms/inputForm';
import { Modal } from '@/components/overlays/modal';
import { CONSTANTS } from '@/constants';
import { useModal } from '@/hooks/modal';
import { IProjectCreate } from '@/interfaces/project';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface ICreateProjectButtonProps {
  mutate?: () => void;
}

export const CreateProjectButton = ({ mutate }: ICreateProjectButtonProps) => {
  const { t } = useTranslation();
  const { openModal, closeModal, open } = useModal();
  const router = useRouter();

  const createNewProjectForm = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(String(t('templates.createProjectButton.form.name.required'))),
    }),
    onSubmit: (values: IProjectCreate) => {
      handleCreateProject(values);
    },
  });

  const handleCreateProject = async (values: IProjectCreate) => {
    const { name } = values;

    const res = await axios.post(CONSTANTS.api.core + '/projects', { name }).catch((error) => {
      const { response } = error;

      if (response.data.message === 'Project already exists') {
        createNewProjectForm.setErrors({ name: t('templates.createProjectButton.form.name.projectAlreadyExists') });

        return;
      }

      return;
    });

    if (!res || res.status !== 201) {
      return;
    }

    const { data } = res;

    router.push({
      pathname: CONSTANTS.redirection.boardId,
      query: { project: data.nameId },
    });

    mutate && mutate();
  };

  return (
    <>
      <Button
        label={t('templates.createProjectButton.createNewProject')}
        size='sm'
        appearance='tertiary'
        leadingIcon={<PlusCircleIcon className='w-4 h-4' />}
        onClick={() => openModal()}
      />
      <Modal isOpen={open} setIsOpen={closeModal}>
        <div className='space-y-8'>
          <h2 className='text-lg text-center font-bold'>{t('templates.createProjectButton.createNewProject')}</h2>
          <form onSubmit={createNewProjectForm.handleSubmit} id='create-new-project-form' className='space-y-6'>
            <InputForm
              label={String(t('templates.createProjectButton.form.name.label'))}
              name='name'
              formik={createNewProjectForm}
              type='text'
              placeholder={String(t('templates.createProjectButton.form.name.placeholder'))}
            />
            <Button label={t('commons.create')} buttonWidth='full' type='submit' />
          </form>
        </div>
      </Modal>
    </>
  );
};
