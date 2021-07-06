import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import User from '../interfaces/User';
import Users from '../users.json'

export interface UserState {
    value: Array<User>;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    value: Users,
    status: 'idle',
};

export const UserSlice = createSlice({
    name: 'users',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.value.push(action.payload);
        },
    },
 });

export const { addUser } = UserSlice.actions;

// The function below is called a selector and allows us to select a value from the state
export const selectUser = (state: RootState) => state.user.value;


export default UserSlice.reducer;
