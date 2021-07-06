import React, { useState } from 'react';

import WithTransitionsModal from '../modal/Modal'
import ProjectForm from '../forms/ProjectForm';
import UserForm from '../forms/UserForm';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'evenly',
    },
  }),
);

export function Header() {
  const classes = useStyles();


  const ModalProject = () => WithTransitionsModal(ProjectForm(), "New Project")
  const ModalUser = () => WithTransitionsModal(UserForm(), "New User")


  return (
    <div>
      <div className={classes.header}>
        <ModalProject />
        <ModalUser />
      </div>
    </div>
  );
}
