import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reducer, { addProject, editProject } from './reducers/projectSlice'
import Projects from './projects.json'

test('should add a new project', () => {
  expect(reducer(undefined, addProject({ id: 1001, name: 'React Redux', description: 'testing case', owner: 1 }))).toEqual(
    { "status": "idle", "value": [...Projects, { id: 1001, name: 'React Redux', description: 'testing case', owner: 1 }] }
  )
})
test('should edit project of id 1001', () => {
  expect(reducer(
    {
      "status": "idle", "value": [...Projects, {
        id: 1001,
        name: 'React Redux',
        description: 'testing case',
        owner: 1
      }]
    },
    editProject({
      id: 1001,
      name: 'React Reduxx',
      description: 'testing case',
      owner: 2
    })))
    .toEqual(
      { "status": "idle", "value": [...Projects, { id: 1001, name: 'React Reduxx', description: 'testing case', owner: 2 }] }
    )
})