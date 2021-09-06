import { User } from '../domain/user.model';

export interface AuthState {
  user: User;
  error: string;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};
