import React from 'react';

import { Formik, Form } from 'formik'; import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
    addUser, selectUser
} from '../../reducers/userSlice';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import User from '../../interfaces/User';


const ProjectForm = () => {
    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUser);

    const validationSchema = yup.object({
        name: yup
            .string()
            // .email('Enter a valid email')
            .required('Name is required'),
        email: yup
            .string()
            .email('Insert a valid email')
            // .min(8, 'Password should be of minimum 8 characters length')
            .required('Email is required')
            .test('email-exists', 'Email already used', val => {
                let exists = users.find(e => e.email.toLowerCase() === val?.toLocaleLowerCase())
                if (exists !== undefined)
                    return false
                else
                    return true
            })
    });

    const onSubmit = (e: any) => {
        //finds the max id and increment it
        let newId = Math.max(...users.map(user => user.id)) + 1
        //adds the new project to the projects list
        let newUser: User = { id: newId, ...e }
        dispatch(addUser(newUser))
    }
    return (

        <Formik
            initialValues={{
                name: '',
                email: '',
            }}
            onSubmit={async (values) => {
                onSubmit(values)
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
                        id="email"
                        name="email"
                        label="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Create User
                    </Button>
                </Form>)}
        </Formik>
    );
}
export default ProjectForm