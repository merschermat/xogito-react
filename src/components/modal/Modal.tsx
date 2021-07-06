import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            // boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        button: {
            marginRight: '10px',
            marginLeft: '10px'
        }
    }),
);



export default function WithTransitionsModal(component: any, buttonLabel: string) {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = React.useState(false)


    return (
        <>
            <Button className={classes.button}
                color="primary" onClick={() => {
                    console.log('sssssssss')
                    setModalOpen(true)
                }} variant="contained">
                {buttonLabel}
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={modalOpen}>
                    <div className={classes.paper}>
                        {component}
                    </div>
                </Fade>
            </Modal >
        </>
    );
}
