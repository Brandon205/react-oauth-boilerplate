export declare interface IUser {
  _id: string;
  githubId: number;
  accessToken?: number;
}

export declare interface IRepo {
  name: string;
}

export type PPCB = (err: string, user: IUser) => any

export {}