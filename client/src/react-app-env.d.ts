/// <reference types="react-scripts" />

export interface IUser {
  _id: string;
  githubId: number;
  accessToken?: number;
}

// This is big gay but needed
export interface RepoOwner {
  login: string;
  avatar_url: string;
}

export interface IRepo {
  name: string;
  owner: RepoOwner;
  description: string;
  is_template: boolean;
}

export interface RepoDetailProps {
  repo: IRepo;
}
