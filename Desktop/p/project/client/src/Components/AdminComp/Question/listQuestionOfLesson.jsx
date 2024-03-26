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
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

const ListQestionOfLesson = () => {
    const { idLess } = useParams();
    console.log(idLess);

    const navigate = useNavigate()
    const toast = useRef(null);


    const [_id, setId] = useState("")


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
    const sendToDelete = (question) => {
        return <DeleteQuestion _id={question._id} />
    }
    const sendToUpdate = (question) => {
        return <UpdateQuestion q={question} />

    }
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const {
        data: questions,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetQuestionByIdLessQuery(idLess)
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    return (
        <div>
            <div align='center'><Button label="ADD QUESTION" text onClick={() => { navigate('/admin/addQuestion/'.concat(idLess)) }} /></div>

            <DataTable value={questions} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="question" header="Question" style={{ width: '33%' }}></Column>
                <Column field="answer" header="Answer" style={{ width: '33%' }}></Column>
                <Column field="optional" header="Options" style={{ width: '33%' }} body={rowData => (
                    <ul>
                        {rowData.optional.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                )}></Column>
                <Column body={sendToUpdate}></Column>
                <Column body={sendToDelete}></Column>
            </DataTable>
        </div>
    )
    // const itemTemplate = (quest, index) => {
    //     return (
    //         <div className="col-12" >
    //             <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
    //                 <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
    //                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
    //                         <div className="text-4xl font-bold text-900">{quest.question}</div>
    //                         <div className="flex align-items-center gap-3">
    //                             <span className="flex align-items-center gap-2">
    //                                 <span className="text-2xl font-bold text-700">{quest.answer}</span>
    //                             </span>
    //                             <div>
    //                                 {quest.optional.map((e) => {
    //                                     return (<div>{e}</div>)
    //                                 })}
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" align='right'>
    //                         {console.log("Wwwwwwww", quest)}

    //                         <DeleteQuestion _id={quest._id} />
    //                         <UpdateQuestion q={quest} />



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
    //             label="ADD QUESTION"
    //             text
    //             onClick={() => { navigate('/admin/addQuestion/'.concat(idLess)) }}
    //         /></div>

    //         {questions?.length && <DataScroller value={questions} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />}
    //     </div>
    // );
}
export default ListQestionOfLesson