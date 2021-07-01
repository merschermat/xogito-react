import React, { useState } from 'react';

import WithTransitionsModal from '../modal/Modal'
import ProjectForm from '../forms/ProjectForm';
import UserForm from '../forms/UserForm';

export function Header() {


  const ModalProject = () => WithTransitionsModal(ProjectForm(), "New Project")
  const ModalUser = () => WithTransitionsModal(UserForm(), "New User")


  return (
    <div>
      <div>
        <ModalProject />
        <ModalUser />
      </div>
    </div>
  );
}
