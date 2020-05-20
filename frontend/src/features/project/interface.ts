import { ProjectType, ContentAction } from './constants';
import { Group, User } from '../group/interface';

export interface Project {
  description: string;
  group: Group;
  id: number;
  name: string;
  owner: string;
  ownerAvatar: string;
  projectType: ProjectType;
  subProjects: Project[];
  shared: boolean;
}

export interface ProjectsWithOwner {
  owner: string;
  ownerAvatar: string;
  projects: Project[];
}

export interface Activity {
  originator: User;
  activity: string;
  activityTime: string;
  action: ContentAction;
  link: string;
}
