import Button from '@/components/buttons/button';
import InputForm from '@/components/forms/inputForm';
import { Textarea } from '@/components/forms/textarea';
import { Modal } from '@/components/overlays/modal';
import { CONSTANTS } from '@/constants';
import { useModal } from '@/hooks/modal';
import { ITaskCreate } from '@/interfaces/task';
import { IWorkflow } from '@/interfaces/workflow';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface ICreateTaskButtonProps {
  workflow: IWorkflow;
  callback?: () => void;
}

export const CreateTaskButton = ({ workflow, callback }: ICreateTaskButtonProps) => {
  const { t } = useTranslation();
  const { openModal, closeModal, open } = useModal();

  const createTaskForm = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(String(t('templates.createTaskButton.form.name.required'))),
      description: Yup.string().required(String(t('templates.createTaskButton.form.description.required'))),
    }),
    onSubmit: (values: Pick<ITaskCreate, 'name' | 'description'>) => {
      handleCreateTask(values);
    },
  });

  const handleCreateTask = async (values: Pick<ITaskCreate, 'name' | 'description'>) => {
    const { name, description } = values;

    const res = await axios
      .post(`${CONSTANTS.api.core}/workflows/${workflow.id}/tasks`, {
        name,
        description,
        order: workflow.tasks.length,
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
      <PlusCircleIcon className='w-5 h-5 text-gray-600 cursor-pointer' onClick={() => openModal()} />
      <Modal isOpen={open} setIsOpen={closeModal}>
        <div className='space-y-8'>
          <h2 className='text-lg text-center font-bold'>{t('templates.createTaskButton.createNewTask')}</h2>
          <form onSubmit={createTaskForm.handleSubmit} id='create-task-form' className='space-y-6'>
            <div className='space-y-2'>
              <InputForm
                label={String(t('templates.createTaskButton.form.name.label'))}
                name='name'
                formik={createTaskForm}
                type='text'
                placeholder={String(t('templates.createTaskButton.form.name.placeholder'))}
              />
              <Textarea
                label={String(t('templates.createTaskButton.form.description.label'))}
                name='description'
                formik={createTaskForm}
                placeholder={String(t('templates.createTaskButton.form.description.placeholder'))}
              />
            </div>
            <Button label={t('commons.create')} buttonWidth='full' type='submit' />
          </form>
        </div>
      </Modal>
    </>
  );
};
