import { CONSTANTS } from '@/constants';
import axios from 'axios';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Droppable, Draggable, DragDropContext, DropResult, DragStart } from 'react-beautiful-dnd';
import { UpdateWorkflowButton } from '../updateWorkflowButton';
import { IProject } from '@/interfaces/project';
import { KeyedMutator } from 'swr';
import { IWorkflow } from '@/interfaces/workflow';
import { ITask } from '@/interfaces/task';
import { CreateTaskButton } from '../createTaskButton';
import { KanbanCard } from '../kanbanCard';

interface IBoard {
  lists: {
    [key: string]: IWorkflow;
  };
  listOrder: string[];
}

export interface IKanbanBoardProps {
  project: IProject;
  mutate: KeyedMutator<any>;
}

export const KanbanBoard = ({ project, mutate }: IKanbanBoardProps) => {
  const [data, setData] = useState<IBoard>();
  const [isColDropDisabled, setIsColDropDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (!project) return;

    const listOrder: string[] = [];

    const lists = project.workflows.map((workflow: any) => {
      listOrder.push(workflow.titleId);

      return {
        [workflow.titleId]: workflow,
      };
    });

    const payload: IBoard = {
      listOrder,
      lists: Object.assign({}, ...lists),
    };

    setData(payload);
  }, [project]);

  const handleDragColumn = async ({ source, destination, draggableId }: DropResult) => {
    if (!destination) {
      return;
    }

    if (source.index === destination.index) {
      return;
    }

    const titleId = draggableId.split('-').slice(1).join('-');

    const workflow = data?.lists[titleId];

    await axios.put(`${CONSTANTS.api.core}/projects/${project.nameId}/workflows/${workflow?.id}`, {
      title: workflow?.title,
      destinationIndex: destination.index,
      sourceIndex: source.index,
    });

    mutate();
  };

  const handleDragRow = async ({ source, destination, draggableId }: DropResult) => {
    if (!destination || !data) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const startList = data.lists[source.droppableId];
    const endList = data.lists[destination.droppableId];

    const task = startList.tasks.find((task: ITask) => task.id === draggableId);

    await axios
      .put(`${CONSTANTS.api.core}/workflows/${startList.id}/tasks/${task?.id}`, {
        name: task?.name,
        description: task?.description,
        destinationIndex: destination.index,
        sourceIndex: source.index,
        startListId: Number(startList.id),
        endListId: Number(endList.id),
        archived: task?.archived,
      })
      .catch(() => {
        return;
      });

    mutate();
  };

  const onDragEnd = (result: DropResult) => {
    if (result.draggableId.includes('col')) {
      handleDragColumn(result);

      return;
    }

    handleDragRow(result);
  };

  const onBeforeDragStart = (start: DragStart) => {
    const isCol = start.draggableId.includes('col');

    if (isCol) {
      setIsColDropDisabled(false);
    } else {
      setIsColDropDisabled(true);
    }
  };

  const renderList = (workflow: IWorkflow) => {
    return (
      <div className='flex flex-col h-full py-4 space-y-6'>
        <div className='flex justify-between px-4'>
          <h3 className='font-semibold'>
            {workflow.title} - <span className='text-gray-500'>{workflow.tasks.length}</span>
          </h3>
          <div className='flex space-x-2'>
            <UpdateWorkflowButton project={project} workflow={workflow} callback={() => mutate()} />
            <CreateTaskButton workflow={workflow} callback={() => mutate()} />
          </div>
        </div>
        <Droppable isDropDisabled={!isColDropDisabled} droppableId={workflow.titleId} direction='vertical'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='flex-grow px-2 space-y-1'>
              {workflow.tasks && workflow.tasks.length ? (
                workflow.tasks.map((item: ITask, index: number) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <KanbanCard task={item} workflow={workflow} callback={() => mutate()} />
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className='text-sm font-medium text-center py-4'>{t('templates.kanbanBoard.noItems')}</div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onBeforeDragStart}>
      <div className='overflow-x-auto'>
        <Droppable isDropDisabled={isColDropDisabled} droppableId='board' direction='horizontal'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className='flex space-x-4 mx-10'>
              {data?.listOrder.map((listId: string) => {
                const workflow = data.lists[listId];

                return (
                  <Draggable key={`col-${listId}`} draggableId={`col-${listId}`} index={workflow.order}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='w-72 bg-gray-100 rounded-lg h-screen !min-w-[288px]'>
                        {renderList(workflow)}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
