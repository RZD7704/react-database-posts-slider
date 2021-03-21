import * as yup from 'yup';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import './ModalForm.scss';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const validationSchema = yup.object().shape({
    title: yup.string().required().min(1).max(100),
    description: yup.string().required().min(1).max(1000),
});

function ModalForm({ title, description, btnVal, btnSize, btnVariant, btnColor, onSave }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: title || '',
            description: description || '',
        },
        validationSchema,
        onSubmit: (data, { resetForm }) => {
            // console.log('data', data);

            onSave(data);
            resetForm();
        },
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const initialClick = () => {
        formik.handleSubmit();
        setOpen(false);
    };

    return (
        <div>
            <Button size={btnSize} variant={btnVariant} color={btnColor} type="button" onClick={handleOpen}>
                {btnVal}
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={initialClick}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <form className="post-form" action="#">
                            <p className="post-form__title" id="transition-modal-description">Title</p>
                            <input className="post-form__field" type="text" value={formik.values.title} onChange={(event) => formik.setFieldValue('title', event.target.value)} />
                            <p className="post-form__title" id="transition-modal-description">Description</p>
                            <textarea className="post-form__textarea" type="text" value={formik.values.description} onChange={(event) => formik.setFieldValue('description', event.target.value)} />
                            <Button variant="contained" size="small" color="primary" onClick={() => initialClick()}>Save</Button>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default ModalForm;
