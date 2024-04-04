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

    // const itemTemplate = (w, index) => {
    //     return (
    //         <div className="col-12" >

    //             <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
    //                 <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={'http://localhost:5225/upload/'.concat(w.Img)} alt={w.name} />
    //                 <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
    //                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
    //                         <div className="text-2xl font-bold text-900">{w.word}</div>
    //                         <div className="flex align-items-center gap-3">
    //                             <span className="flex align-items-center gap-2">
    //                                 <span className="font-semibold">{w.translating}</span>
    //                             </span>
    //                         </div>
    //                     </div>
    //                     <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" align='right'>
    //                         {console.log("Wwwwwwww", w)}
    //                         <span><UpdateWord w={w} /></span>
    //                         <span><DeleteWord _id={w._id} /></span>

    //                     </div> 
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };
    // return (
    //     <div className="card">
    //         <Button icon="pi pi-arrow-left" onClick={() => navigate("/admin/learn")} />

    //         <div align='center'><Button
    //             label="Add Word to the Lesson"
    //             text
    //             onClick={() => { navigate('/admin/addWord/'.concat(idLess)) }}
    //         /></div>

    //         {words?.length && <DataScroller value={words} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />}
    //     </div>
    // );
}
export default ListWordOfLesson