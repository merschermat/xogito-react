import React, { useEffect } from 'react';

import { Formik, Form } from 'formik'; import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import User from '../../interfaces/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Project from '../../interfaces/Project';
import { selectProject, addProject, editProject } from '../../reducers/projectSlice';
import { selectUser } from '../../reducers/userSlice';


const validationSchema = yup.object({
    name: yup
        .string()
        // .email('Enter a valid email')
        .required('Email is required'),
    description: yup
        .string()
        // .min(8, 'Password should be of minimum 8 characters length')
        .required('Description is required'),
    owner: yup
        .number()
        .required('Owner is required'),
});

const ProjectForm = (editingProject: Project = { id: 0, name: '', description: '', owner: 0 }) => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUser);
    const projetcs = useAppSelector(selectProject);

    const submit = (e: any) => {
        console.log(e)
        if (editingProject.id !== 0) {
            let editedProject = { id: editingProject.id, ...e }
            dispatch(editProject(editedProject))
        }
        else {
            //finds the max id and increment it
            let newId = Math.max(...projetcs.map(project => project.id)) + 1
            //adds the new project to the projects list
            let newProject: Project = { id: newId, ...e }
            dispatch(addProject(newProject))
        }
    }

    return (

        <Formik
            key={Math.random()}
            enableReinitialize={true}
            initialValues={editingProject}
            onSubmit={async (values) => {
                submit(values)
            }}
            validationSchema={validationSchema}
        >
            {({ errors, touched, handleChange, values }) => (
                <Form>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="name"
                        value={values.name}
                        onChange={handleChange}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />

                    <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="description"
                        value={values.description}
                        onChange={handleChange}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                    />

                    <InputLabel id="owner-label">Age</InputLabel>
                    <Select
                        fullWidth
                        labelId="owner-label"
                        id="owner"
                        name="owner"
                        value={values.owner}
                        onChange={handleChange}
                        error={touched.owner && Boolean(errors.owner)}
                    >
                        {/* <MenuItem value={'select'} disabled>Select the owner</MenuItem> */}

                        {users.map((user: User) => (
                            <MenuItem value={user.id}>{user.name} / {user.email}</MenuItem>
                        ))}
                    </Select>

                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {editingProject.id == 0 ? 'Create Project' : 'Save changes'}
                    </Button>
                </Form>)}
        </Formik>
    );
}
export default ProjectForm
