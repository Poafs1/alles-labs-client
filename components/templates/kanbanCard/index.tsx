import Button from '@/components/buttons/button';
import { Badge } from '@/components/elements/badge';
import InputForm from '@/components/forms/inputForm';
import { Textarea } from '@/components/forms/textarea';
import { Toggle } from '@/components/forms/toggle';
import { Modal } from '@/components/overlays/modal';
import { CONSTANTS } from '@/constants';
import { useModal } from '@/hooks/modal';
import { ITask } from '@/interfaces/task';
import { IWorkflow } from '@/interfaces/workflow';
import { mapDateToDDMMMMYYYY } from '@/utils/date';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export interface IKanbanBoardProps {
  workflow: IWorkflow;
  task: ITask;
  callback?: () => void;
}

export const KanbanCard = ({ workflow, task, callback }: IKanbanBoardProps) => {
  const { t } = useTranslation();
  const { open, openModal, closeModal } = useModal();
  const [editMode, setEditMode] = useState(false);

  const updateTaskForm = useFormik({
    initialValues: {
      name: task.name,
      description: task.description,
      archived: task.archived,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(String(t('templates.kanbanCard.form.name.required'))),
      description: Yup.string().required(String(t('templates.kanbanCard.form.description.required'))),
      archived: Yup.boolean(),
    }),
    onSubmit: (values: Pick<ITask, 'name' | 'description' | 'archived'>) => {
      handleUpdateTask(values);
    },
  });

  const handleUpdateTask = async (values: Pick<ITask, 'name' | 'description' | 'archived'>) => {
    const { name, description, archived } = values;

    const res = await axios
      .put(`${CONSTANTS.api.core}/workflows/${workflow.id}/tasks/${task.id}`, {
        name,
        description,
        archived,
        destinationIndex: task.order,
        sourceIndex: task.order,
        startListId: Number(workflow.id),
        endListId: Number(workflow.id),
      })
      .catch(() => {
        return;
      });

    if (!res || res.status !== 200) {
      return;
    }

    callback && callback();

    setEditMode(false);
  };

  return (
    <>
      <div className='bg-white p-4 rounded-md space-y-1 cursor-pointer' onClick={() => openModal()}>
        <h3 className='text-base font-semibold'>{task.name}</h3>
        <p className='text-xs text-gray-500'>{mapDateToDDMMMMYYYY(task.createdAt)}</p>
      </div>
      <Modal
        isOpen={open}
        setIsOpen={() => {
          closeModal();
          setEditMode(false);
        }}>
        {!editMode ? (
          <div className='space-y-8'>
            <div className='space-x-1'>
              <Badge label={workflow.title} />
              {task.archived && <Badge label='Archived' color='red' />}
            </div>
            <div className='space-y-4'>
              <h2 className='text-lg font-semibold'>{task.name}</h2>
              <p className='text-sm text-gray-700'>{task.description}</p>
              <p className='text-sm text-gray-500'>{mapDateToDDMMMMYYYY(task.createdAt)}</p>
            </div>
            <div className='flex justify-end'>
              <Button label='Edit' appearance='tertiary' onClick={() => setEditMode(true)} />
            </div>
          </div>
        ) : (
          <div className='space-y-8'>
            <h2 className='text-lg text-center font-bold'>{t('templates.kanbanCard.updateTask')}</h2>
            <form onSubmit={updateTaskForm.handleSubmit} id='update-task-form' className='space-y-6'>
              <div className='space-y-6'>
                <InputForm
                  label={String(t('templates.kanbanCard.form.name.label'))}
                  name='name'
                  formik={updateTaskForm}
                  type='text'
                  placeholder={String(t('templates.kanbanCard.form.name.placeholder'))}
                />
                <Textarea
                  label={String(t('templates.kanbanCard.form.description.label'))}
                  name='description'
                  formik={updateTaskForm}
                  placeholder={String(t('templates.kanbanCard.form.description.placeholder'))}
                />
                <div className='flex justify-between'>
                  <p className='text-sm'>{t('templates.kanbanCard.archive')}</p>
                  <Toggle
                    checked={updateTaskForm.values.archived}
                    onChange={() => updateTaskForm.setFieldValue('archived', !updateTaskForm.values.archived)}
                  />
                </div>
              </div>
              <Button label={t('commons.update')} buttonWidth='full' type='submit' />
            </form>
          </div>
        )}
      </Modal>
    </>
  );
};
