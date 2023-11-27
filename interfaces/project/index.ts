import { IWorkflow } from '../workflow';

export interface IProject {
  id: string;
  name: string;
  nameId: string;
  coverImage: string;
  workflows: IWorkflow[];
}

export interface IProjectCreate {
  name: string;
}
