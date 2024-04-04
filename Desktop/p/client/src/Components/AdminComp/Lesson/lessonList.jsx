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
import { useAddLessonMutation, useDeleteLessonMutation, useGetLessonQuery, useUpdateLessonMutation } from './lessonsApiSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useFormik } from 'formik';
import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';
import DeleteLesson from './deleteLesson';
import UpdateLesson from './updateLesson';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const LessoList = () => {
    const navigate = useNavigate()
    const toast = useRef(null);

    const [formUpdate, setFormUpdate] = useState(false)

    const [_id, setId] = useState("")
    // const [category, setCategory] = useState("")
    // const [level, setLevel] = useState("")

    const [lesson, setLesson] = useState({})


    const [updatedLesson, { isErrorup, isSuccessup, errorup }] = useUpdateLessonMutation()


    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        category: '',
        level: '',
        _id: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data.level && show();
        console.log({ _id, category: data.category, level: data.level });
        updatedLesson({ _id, category: data.category, level: data.level })
        reset();
        setFormUpdate(false)
        // navigate('/admin/learn')
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    const sendToUpdate = (less) => {
        return <UpdateLesson less={less} />
    }

    const sendToDelete = (less) => {
        return <DeleteLesson _id={less._id} />
    }
    const sendToWords = (less) => {
        return <Button icon="pi pi-bars" className="p-button-rounded" onClick={() => { navigate("/admin/listWordOfLesson/".concat(less._id), { replace: false }) }}></Button>
    }
    const sendToQestions = (less) => {
        return <Button icon="pi pi-book" className="p-button-rounded" onClick={() => { navigate("/admin/listQuestionOfLesson/".concat(less._id), { replace: false }) }}></Button>
    }


    const {
        data: lessons,
        isLoading,
        isError,
        error
    } = useGetLessonQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    return (
        <div>
            <div align='center'><Button label="Add lesson" text onClick={() => { navigate('/admin/addlesson') }} /></div>
            <DataTable value={lessons} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                <Column field="category" header="Category" style={{ width: '50%' }}></Column>
                <Column field="level" header="Level" style={{ width: '50%' }}></Column>
                {/* <Column field="phone" header="Phone" style={{ width: '20%' }}></Column> */}
                {/* <Column field="role" header="Role" body={statusBodyTemplate} style={{ width: '25%' }}></Column> */}
                <Column body={sendToUpdate}></Column>
                <Column body={sendToDelete}></Column>
                <Column body={sendToWords}></Column>
                <Column body={sendToQestions}></Column>
            </DataTable>
        </div>
    )


    // const itemTemplate = (less, index) => {
    // return (


    // <div className="col-12" >
    //     <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
    //         <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
    //             <div className="flex flex-column align-items-center sm:align-items-start gap-3">
    //                 <div className="text-2xl font-bold text-900">{less.category}</div>
    //                 <div className="flex align-items-center gap-3">
    //                     <span className="flex align-items-center gap-2">
    //                         <span className="font-semibold">{less.level}</span>
    //                     </span>
    //                 </div>
    //             </div>
    //             <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" align='right'>
    //                <DeleteLesson _id={less._id}/>
    //                <UpdateLesson less={less}/>
    //                 <Button icon="pi pi-bars" className="p-button-rounded" onClick={() =>{navigate("/admin/listWordOfLesson/".concat(less._id),{ replace: false })}}></Button>
    //                 <Button icon="pi pi-book" className="p-button-rounded" onClick={() =>{navigate("/admin/listQuestionOfLesson/".concat(less._id),{ replace: false })}}></Button>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // );
    // };



    // return (
    //     <div className="card">
    //         <div align='center'><Button label="Add lesson" text onClick={() => { navigate('/admin/addlesson') }} /></div>
    //         <DataScroller value={lessons} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />
    //     </div>
    // );
};
export default LessoList;
