import React, { useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { DataScroller } from 'primereact/datascroller';
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
import DeleteWord from './deleteWord';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const ListWordOfLesson = () => {
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



    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const {
        data: words,
        isLoading,
        isError,
        error
    } = useGetWordsByIdLessQuery(idLess)
    if (isLoading) return <h1>...טוען</h1>
    if (isError) return <h2>{error}</h2>

    const showImg = (word) => {
        return <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto" src={'http://localhost:5225/upload/'.concat(word.Img)} alt={word.name} />
    }

    const sendToUpdate = (word) => {
        return <UpdateWord w={word} />
    }

    const sendToDelete = (word) => {
        return <DeleteWord _id={word._id} />
    }

    return (
        <div>
            <div align='center'><Button
                label="Add Word to the Lesson"
                text
                onClick={() => { navigate('/admin/addWord/'.concat(idLess)) }}
            /></div>
            {words.length&&<DataTable value={words} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
            <Column field="word" header="Word" style={{ width: '33%' }}></Column> 
            <Column field="translating" header="Translating" style={{ width: '33%' }}></Column>
            <Column header="Image" style={{ width: '33%' }} body={showImg}></Column>
               <Column  body={sendToUpdate}></Column>
                <Column body={sendToDelete}></Column>
            </DataTable>}
        </div>
    )

    
}
export default ListWordOfLesson