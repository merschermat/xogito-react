import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import Project from '../interfaces/Project';

export interface ProjectState {
  value: Array<Project>;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProjectState = {
  value: [],
  status: 'idle',
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    iniateValue: (state, action: PayloadAction<Project[]>) => {
      state.value = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.value.push(action.payload);
    },
    editProject: (state, action: PayloadAction<Project>) => {
      let aux = state.value
      let index = state.value.findIndex(project => project.id == action.payload.id)
      aux[index] = action.payload
      state.value = aux;
    }
  },
});

export const { iniateValue, addProject, editProject } = projectSlice.actions;

// The function below is called a selector and allows us to select a value from the state
export const selectProject = (state: RootState) => state.project.value;


export default projectSlice.reducer;
