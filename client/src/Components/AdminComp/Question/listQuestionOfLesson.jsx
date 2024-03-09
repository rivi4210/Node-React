import React, { useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
// import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { DataScroller } from 'primereact/datascroller';
// import { ProductService } from './service/ProductService';
// import './Blog.css';
// import { useGetUsersQuery, useDeleteUserMutation, useAddUserMutation, useUpdateUserMutation } from './usersApiSlice';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useAddLessonMutation, useDeleteLessonMutation, useGetLessonQuery, useUpdateLessonMutation } from '../Lesson/lessonsApiSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';

import { Link, useParams } from "react-router-dom";
import { useGetQuestionByIdLessQuery } from './questionApiSlice';
// import UpdateWord from './updateWord';
import { useDeleteWordMutation, useUpdateWordMutation } from '../Word/wordApiSlice';
import DeleteQuestion from './deleteQuestion';
import UpdateQuestion from './updateQuestion';

const ListQestionOfLesson = () => {
    const { idLess } = useParams();
    console.log(idLess);

    const navigate = useNavigate()
    const toast = useRef(null);

    const [formUpdate, setFormUpdate] = useState(false)

    const [_id, setId] = useState("")

    const [deleteWord, { isErrorDel, isSuccessDel, errorDel }] = useDeleteWordMutation()
    const handleDelete = (e) => {
        console.log(e);
        deleteWord(e)
    }

    const [updatedWord, { isErrorup, isSuccessup, errorup }] = useUpdateWordMutation()

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        _id: '',
        question: '',
        question: '',
        optional: [],
        lesson: idLess
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data.word && show();
        console.log({ _id, question: data.question, lesson: data.lesson, answer: data.answer, optional: data.optional, });
        updatedWord({ _id, question: data.question, lesson: data.lesson, answer: data.answer, optional: data.optional })
        reset();
        setFormUpdate(false)
        // navigate('/admin/learn')
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const {
        data: questions,
        isLoading,
        isError,
        error
    } = useGetQuestionByIdLessQuery(idLess)
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>


    const itemTemplate = (quest, index) => {
        return (
            <div className="col-12" >
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={'http://localhost:5225/upload/'.concat(quest.Img)} alt={quest.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-4xl font-bold text-900">{quest.question}</div>
                            {/* <Rating value={product.username} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <span className="text-2xl font-bold text-700">{quest.answer}</span>
                                </span>
                                <div>
                                    {quest.optional.map((e) => {
                                        return (<div>{e}</div>)
                                    })}
                                </div>
                                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" align='right'>
                            {/* <span className="text-2xl font-semibold">${product.price}</span> */}
                            {/* <form onSubmit={handleDelete(product._id)}> */}
                            {console.log("Wwwwwwww", quest)}
                            {/* <span><UpdateWord w={quest} /></span> */}

                            <DeleteQuestion _id={quest._id} />
                            <UpdateQuestion q={quest} />
                            
                            {/* <Button
                                icon="pi pi-trash"
                                className="p-button-rounded"
                                onClick={() => handleDelete(quest._id)}></Button> */}

                            {/* <span><Button
                                icon="pi pi-pencil"
                                className="p-button-rounded"
                                onClick={() => { setWord(w); setFormUpdate(true); setId(w._id) }}>
                            </Button>
                            </span> */}

                            {/* <Button icon="pi pi-bars" className="p-button-rounded" onClick={() => { navigate("/admin/listWordOfLesson/".concat(word._id), { replace: false }) }}></Button> */}
                            <Dialog
                                visible={formUpdate}
                                modal
                                onHide={() => setFormUpdate(false)}
                                content={({ hide }) => (
                                    <form onSubmit={handleSubmit(onSubmit)} >
                                        <div className="flex flex-column  gap-3  flex-row  gap-2" >
                                            <Toast ref={toast} />
                                            <Controller
                                                name="word"
                                                control={control}
                                                rules={{ required: 'word is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <div></div><div></div>
                                                        <div className="flex justify-content-center" >
                                                            <label
                                                                htmlFor={field.name}
                                                                className={classNames({ 'p-error': errors.value })}></label>
                                                            <span className="p-float-label">
                                                                <InputText
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)} />
                                                                <label htmlFor={field.name}>Word</label>
                                                            </span>
                                                            {getFormErrorMessage(field.name)}</div></>)}
                                            />
                                            <Controller
                                                name="translating"
                                                control={control}
                                                rules={{ required: 'translating is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <div></div><div></div>
                                                        <div className="flex justify-content-center" >
                                                            <label
                                                                htmlFor={field.name}
                                                                className={classNames({ 'p-error': errors.value })}></label>
                                                            <span className="p-float-label">
                                                                <InputText
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)} />
                                                                <label htmlFor={field.name}>Translating</label>
                                                            </span>
                                                            {getFormErrorMessage(field.name)}</div></>)}
                                            />
                                            <Controller
                                                name="Img"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <div></div><div></div>
                                                        <div className="flex justify-content-center" >
                                                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                            <span className="p-float-label">
                                                                <InputText
                                                                    id={field.name}
                                                                    value={field.value}
                                                                    className={classNames({ 'p-invalid': fieldState.error })}
                                                                    onChange={(e) => field.onChange(e.target.value)} />
                                                                <label htmlFor={field.name}>Img</label>
                                                            </span>
                                                            {getFormErrorMessage(field.name)}</div></>)}
                                            />


                                        </div>
                                    </form>)}
                            ></Dialog>

                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className="card">
            <div align='center'><Button
                label="ADD QUESTION"
                text
                onClick={() => { navigate('/admin/addQuestion/'.concat(idLess)) }}
            /></div>

            {questions?.length && <DataScroller value={questions} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />}
        </div>
    );
}
export default ListQestionOfLesson