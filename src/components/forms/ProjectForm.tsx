import React, { useEffect } from 'react';

import { Formik, Form } from 'formik'; import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';



import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import User from '../../interfaces/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Project from '../../interfaces/Project';
import { selectProject, addProject, editProject } from '../../reducers/projectSlice';
import { selectUser } from '../../reducers/userSlice';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        label: {
            marginTop: '15px'
        },
        field: {
            marginBottom: '5px'
        },
        button: {
            marginTop: '15px'

        }
    }),
);

const validationSchema = yup.object({
    name: yup
        .string()
        .required('Email is required'),
    description: yup
        .string()
        .required('Description is required'),
    owner: yup
        .number()
        .required('Owner is required'),
});

const ProjectForm = (editingProject = { id: 0, name: '', description: '', owner: '' }) => {
    const classes = useStyles();

    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUser);
    const projetcs = useAppSelector(selectProject);

    const getUser = (id: number) => {
        return users.find(user => user.id == id)
    }

    const submit = (e: any) => {
        if (editingProject.id !== 0) {
            let editedProject = { ...e }
            editedProject.id = editingProject.id;
            editedProject.owner = getUser(e.owner)
            dispatch(editProject(editedProject))
        }
        else {
            //finds the max id and increment it
            const newId = Math.max(...projetcs.map(project => project.id)) + 1
            //adds the new project to the projects list
            let newProject = { ...e }
            newProject.id = newId;
            newProject.owner = getUser(e.owner)

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
                    <h2>{editingProject.id == 0 ? 'New Project' : 'Edit Project'}</h2>
                    <TextField
                        className={classes.field}
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
                        className={classes.field}
                        fullWidth
                        id="description"
                        name="description"
                        label="description"
                        value={values.description}
                        onChange={handleChange}
                        error={touched.description && Boolean(errors.description)}
                        helperText={touched.description && errors.description}
                    />

                    <InputLabel className={classes.label} id="owner-label">Select an owner</InputLabel>
                    <Select
                        fullWidth
                        labelId="owner-label"
                        id="owner"
                        name="owner"
                        value={values.owner}
                        onChange={handleChange}
                        error={touched.owner && Boolean(errors.owner)}
                    >
                        {users.map((user: User) => (
                            <MenuItem key={user.id} value={user.id}>{user.name} / {user.email}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText error>{errors.owner}</FormHelperText>

                    <Button className={classes.button} color="primary" variant="contained" fullWidth type="submit">
                        {editingProject.id == 0 ? 'Create Project' : 'Save changes'}
                    </Button>
                </Form>)}
        </Formik>
    );
}
export default ProjectForm
