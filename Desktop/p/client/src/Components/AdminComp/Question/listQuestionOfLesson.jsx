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
import { useGetQuestionByIdLessQuery } from './questionApiSlice';
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
   
}
export default ListQestionOfLesson