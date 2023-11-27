import Button from '@/components/buttons/button';
import InputForm from '@/components/forms/inputForm';
import { Modal } from '@/components/overlays/modal';
import { CONSTANTS } from '@/constants';
import { useModal } from '@/hooks/modal';
import { IProject } from '@/interfaces/project';
import { IWorkflow, IWorkflowCreate } from '@/interfaces/workflow';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface ICreateWorkflowButtonProps {
  project: IProject;
  workflows: IWorkflow[];
  callback?: () => void;
}

export const CreateWorkflowButton = ({ project, callback, workflows }: ICreateWorkflowButtonProps) => {
  const { t } = useTranslation();
  const { openModal, closeModal, open } = useModal();

  const createNewWorkflowForm = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required(String(t('templates.createWorkflowButton.form.title.required'))),
    }),
    onSubmit: (values: Pick<IWorkflowCreate, 'title'>) => {
      handleCreateWorkflow(values);
    },
  });

  const handleCreateWorkflow = async (values: Pick<IWorkflowCreate, 'title'>) => {
    const { title } = values;

    const res = await axios
      .post(`${CONSTANTS.api.core}/projects/${project.nameId}/workflows`, {
        title,
        order: workflows.length,
      })
      .catch(() => {
        return;
      });

    if (!res || res.status !== 201) {
      return;
    }

    callback && callback();

    closeModal();
  };

  return (
    <>
      <Button
        label={t('templates.createWorkflowButton.createNewWorkflow')}
        size='sm'
        appearance='tertiary'
        leadingIcon={<PlusCircleIcon className='w-4 h-4' />}
        onClick={() => openModal()}
      />
      <Modal isOpen={open} setIsOpen={closeModal}>
        <div className='space-y-8'>
          <h2 className='text-lg text-center font-bold'>{t('templates.createWorkflowButton.createNewWorkflow')}</h2>
          <form onSubmit={createNewWorkflowForm.handleSubmit} id='create-workflow-form' className='space-y-6'>
            <InputForm
              label={String(t('templates.createWorkflowButton.form.title.label'))}
              name='title'
              formik={createNewWorkflowForm}
              type='text'
              placeholder={String(t('templates.createWorkflowButton.form.title.placeholder'))}
            />
            <Button label={t('commons.create')} buttonWidth='full' type='submit' />
          </form>
        </div>
      </Modal>
    </>
  );
};
