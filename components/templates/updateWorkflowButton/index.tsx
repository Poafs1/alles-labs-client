import Button from '@/components/buttons/button';
import InputForm from '@/components/forms/inputForm';
import { Modal } from '@/components/overlays/modal';
import { CONSTANTS } from '@/constants';
import { useModal } from '@/hooks/modal';
import { IProject } from '@/interfaces/project';
import { IWorkflow, IWorkflowUpdate } from '@/interfaces/workflow';
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface IUpdateWorkflowButtonProps {
  project: IProject;
  workflow: IWorkflow;
  callback?: () => void;
}

export const UpdateWorkflowButton = ({ project, workflow, callback }: IUpdateWorkflowButtonProps) => {
  const { t } = useTranslation();
  const { openModal, closeModal, open } = useModal();

  const updateWorkflowForm = useFormik({
    initialValues: {
      title: workflow.title,
    },
    validationSchema: Yup.object({
      title: Yup.string().required(String(t('templates.updateWorkflowButton.form.title.required'))),
    }),
    onSubmit: (values: Pick<IWorkflowUpdate, 'title'>) => {
      handleUpdateWorkflow(values);
    },
  });

  const handleUpdateWorkflow = async (values: Pick<IWorkflowUpdate, 'title'>) => {
    const { title } = values;

    const res = await axios
      .put(`${CONSTANTS.api.core}/projects/${project.nameId}/workflows/${workflow.id}`, {
        title,
        destinationIndex: workflow.order,
        sourceIndex: workflow.order,
      })
      .catch(() => {
        return;
      });

    if (!res || res.status !== 200) {
      return;
    }

    callback && callback();

    closeModal();
  };

  const handleDeleteWorkflow = async () => {
    await axios.delete(`${CONSTANTS.api.core}/projects/${project.nameId}/workflows/${workflow.id}`);

    callback && callback();

    closeModal();
  };

  return (
    <>
      <PencilSquareIcon className='w-5 h-5 text-gray-600 cursor-pointer' onClick={() => openModal()} />
      <Modal isOpen={open} setIsOpen={closeModal}>
        <div className='space-y-8'>
          <h2 className='text-lg text-center font-bold'>{t('templates.updateWorkflowButton.updateWorkflow')}</h2>
          <form onSubmit={updateWorkflowForm.handleSubmit} id='update-workflow-form' className='space-y-6'>
            <InputForm
              label={String(t('templates.updateWorkflowButton.form.title.label'))}
              name='title'
              formik={updateWorkflowForm}
              type='text'
              placeholder={String(t('templates.updateWorkflowButton.form.title.placeholder'))}
            />
            <div className='space-y-1'>
              <Button label={t('commons.update')} buttonWidth='full' type='submit' />
              {!workflow.tasks.length && (
                <Button
                  label={t('commons.delete')}
                  appearance='tertiary'
                  buttonWidth='full'
                  type='button'
                  onClick={handleDeleteWorkflow}
                />
              )}
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
