export interface ITask {
  id: string;
  name: string;
  description: string;
  archived: boolean;
  order: number;
  createdAt: Date;
}

export interface ITaskCreate {
  name: string;
  description: string;
  order: number;
}

export interface ITaskUpdate {
  name: string;
  description: string;
  destinationIndex: number;
  sourceIndex: number;
  startListId: number;
  endListId: number;
  archived: boolean;
}
