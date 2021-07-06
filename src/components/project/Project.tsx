import React, { useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import { useAppSelector } from '../../app/hooks';
import {
  // incrementAsync,
  selectProject,
} from '../../reducers/projectSlice';
import styles from './Project.module.css';
import ProjectForm from '../forms/ProjectForm';
import WithTransitionsModal from '../modal/Modal';


interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left';
  format?: (value: number) => string;
}
const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 20 },
  { id: 'name', label: 'Name', minWidth: 170 },
  {
    id: 'description',
    label: 'Description',
    minWidth: 400,
  },
  {
    id: 'owner',
    label: 'Owner',
    minWidth: 20,
  },
  { id: 'action', label: 'Action', minWidth: 40 }
];

export function Project() {
  const projetcs = useAppSelector(selectProject);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [projectsFiltered, setProjectsFiltered] = React.useState(projetcs);
  const [keyword, setKeyword] = React.useState('');

  useEffect(() => {
    let filtered = projetcs.filter(project => project.name.toLowerCase().includes(keyword.toLowerCase()) || project.description.toLowerCase().includes(keyword.toLowerCase()))
    setProjectsFiltered(filtered)
  }, [keyword, projetcs])

  const ModalProject = (props: any) => WithTransitionsModal(ProjectForm(props.project), "Edit")

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div>
      <div>
        <h1>Projects</h1>

        <TextField id="filled-search" label="Search field" fullWidth type="search" value={keyword} onChange={(e) => setKeyword(e.target.value)} variant="filled" />

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {projectsFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        column.id !== 'action' ?
                          <TableCell key={column.id} align={column.align}>
                            {column.id !== 'owner' ? value : value.email}
                          </TableCell>
                          :
                          <TableCell key={column.id} align={column.align}>
                            <ModalProject project={{ ...row, owner: row.owner.id }} />
                          </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={projectsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}
