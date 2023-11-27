import { ITask } from '../task';

export interface IWorkflow {
  id: string;
  title: string;
  titleId: string;
  order: number;
  tasks: ITask[];
}

export interface IWorkflowCreate {
  title: string;
  order: number;
}

export interface IWorkflowUpdate {
  title: string;
  order: number;
}
