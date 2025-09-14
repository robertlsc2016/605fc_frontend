export interface UserHistory {
  date: Date;
  goals: number;
  assists: number;
  errors: number;
  presence: boolean;
}

export interface Player {
  _id?: string; // MongoDB cria automaticamente o _id
  name: string;
  nickname: string;
  photo?: string;
  goals: number;
  assists: number;
  errors: number;
  history: UserHistory[];
  createdAt?: string; // timestamps do Mongoose
  updatedAt?: string;
  description?: string;
}
