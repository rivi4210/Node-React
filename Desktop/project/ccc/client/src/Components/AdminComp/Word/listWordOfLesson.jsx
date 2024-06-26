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
import { useDeleteWordMutation, useGetWordsByIdLessQuery, useGetWordsByIdLessQuery as useGetWordsByIdWordQuery, useGetWordsQuery, useUpdateWordMutation } from './wordApiSlice';
import UpdateWord from './updateWord';


const ListWordOfLesson = () => {
    const { idLess } = useParams();
    console.log(idLess);

    const navigate = useNavigate()
    const toast = useRef(null);

    const [formUpdate, setFormUpdate] = useState(false)

    const [_id, setId] = useState("")
    // const [category, setCategory] = useState("")
    // const [level, setLevel] = useState("")

    // const [word, setWord] = useState({})
    // const claer = () => {
    //     setLevel("")
    //     setCategory("")
    // }

    const [deleteWord, { isErrorDel, isSuccessDel, errorDel }] = useDeleteWordMutation()
    const handleDelete = (e) => {
        console.log(e);
        deleteWord(e)
        // claer()
    }

    const [updatedWord, { isErrorup, isSuccessup, errorup }] = useUpdateWordMutation()
    // const handleUpdate = (word) => {
    //     // !name && setName(user.name)
    //     console.log({ word:word.word,translating:word.translating,lesson:word.lesson})
    //     updatedWord({ word:word.word,translating:word.translating,lesson:word.lesson })
    //     // claer()

    // // }

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        _id: '',
        word: '',
        translating: '',
        Img: {}
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
        console.log({ _id, word: data.word, lesson: data.lesson, translating: data.translating });
        updatedWord({ _id, word: data.word, lesson: idLess, translating: data.translating, Img: data.Img })
        reset();
        setFormUpdate(false)
        // navigate('/admin/learn')
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const {
        data: words,
        isLoading,
        isError,
        error
    } = useGetWordsByIdLessQuery(idLess)
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>


    const itemTemplate = (w, index) => {
        return (
            <div className="col-12" >

                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={'http://localhost:5225/upload/'.concat(w.Img)} alt={w.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{w.word}</div>
                            {/* <Rating value={product.username} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <span className="font-semibold">{w.translating}</span>
                                </span>
                                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" align='right'>
                            {/* <span className="text-2xl font-semibold">${product.price}</span> */}
                            {/* <form onSubmit={handleDelete(product._id)}> */}
                            {console.log("Wwwwwwww", w)}
                            <span><UpdateWord w={w} /></span>
                            <Button
                                icon="pi pi-trash"
                                className="p-button-rounded"
                                onClick={() => handleDelete(w._id)}></Button>

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
                                            {/* <Toast ref={toast} /> */}
                                            {/* <Button
                                                label="Update Word"
                                                type="submit" /> */}
                                            {/* <updatedWord w={w} /> */}

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
            <Button icon="pi pi-arrow-left" onClick={() => navigate("/admin/learn")} />

            <div align='center'><Button
                label="Add Word to the Lesson"
                text
                onClick={() => { navigate('/admin/addWord/'.concat(idLess)) }}
            /></div>

            {words?.length && <DataScroller value={words} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />}
        </div>
    );
}
export default ListWordOfLesson