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

    

    const {
        data: lessons,
        isLoading,
        isError,
        error
    } = useGetLessonQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    const itemTemplate = (less, index) => {
        return (

            <div className="col-12" >
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{less.category}</div>
                            {/* <Rating value={product.username} readOnly cancel={false}></Rating> */}
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    {/* <i className="pi pi-tag"></i> */}
                                    <span className="font-semibold">{less.level}</span>
                                </span>
                                {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2" align='right'>
                            {/* <span className="text-2xl font-semibold">${product.price}</span> */}
                            {/* <form onSubmit={handleDelete(product._id)}> */}
                            {/* <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => handleDelete(less._id)}></Button> */}
                           <DeleteLesson _id={less._id}/>
                           <UpdateLesson less={less}/>
                            {/* <span><Button icon="pi pi-pencil" className="p-button-rounded" onClick={() => {setLesson(less);setFormUpdate(true); setId(less._id) }}></Button></span> */}
                            <Button icon="pi pi-bars" className="p-button-rounded" onClick={() =>{navigate("/admin/listWordOfLesson/".concat(less._id),{ replace: false })}}></Button>
                            <Button icon="pi pi-book" className="p-button-rounded" onClick={() =>{navigate("/admin/listQuestionOfLesson/".concat(less._id),{ replace: false })}}></Button>
                            <Dialog
                                visible={formUpdate}
                                modal
                                onHide={() => setFormUpdate(false)}
                                content={({ hide }) => (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="flex flex-column  gap-3  flex-row  gap-2" >
                                            <Toast ref={toast} />
                                            <Controller
                                                name="category"
                                                control={control}
                                                rules={{ required: 'category is required.' }}
                                                render={({ field, fieldState }) => (
                                                    <>
                                                        <div></div><div></div>
                                                        <div className="flex justify-content-center" >
                                                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                                            <span className="p-float-label">
                                                                <InputText id={lesson.category}  defaultValue={lesson.category} className={classNames({ 'p-invalid': fieldState.error })}  onChange={(e) => field.onChange(e.target.value)} />
                                                                <label htmlFor={field.name}>Category</label>
                                                            </span>
                                                            {getFormErrorMessage(field.name)}</div></>)}
                                            />

                                            {/* <Toast ref={toast} /> */}
                                            <Controller
                                                name="level"
                                                control={control}
                                                checked={lesson.level}
                                                rules={{ required: 'Value is required.' }}
                                                render={({ field }) => (
                                                    <>
                                                        {/* <div>Please choose the level.</div> */}
                                                        <div className="flex justify-content-center">
                                                            <div className="flex align-items-center">
                                                                <RadioButton inputId="f5" {...field} inputRef={field.ref} value='level 1' checked={lesson.level === 'level 1'}/>
                                                                <label htmlFor="f5" className="ml-1 mr-3">
                                                                    level 1
                                                                </label>

                                                                <RadioButton inputId="f6" {...field} inputRef={field.ref} value="level 2"  checked={lesson.level === 'level 2'}  />
                                                                <label htmlFor="f6" className="ml-1 mr-3">
                                                                    level 2
                                                                </label>

                                                                <RadioButton inputId="f7" {...field} inputRef={field.ref} value="level 3" checked={lesson.level === 'level 3'} />
                                                                <label htmlFor="f7" className="ml-1 mr-3">
                                                                    level 3
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {getFormErrorMessage(field.name)}
                                                        {/* <Button label="Update Lessson" type="submit" icon="pi pi-check" /> */}
                                                    </>
                                                )}
                                            />
                                        </div>
                                    </form>
                                   
                                )}
                            ></Dialog>


                        </div>
                    </div>
                </div>
            </div>
        );
    };



    return (
        <div className="card">
            <div align='center'><Button label="Add lesson" text onClick={() => { navigate('/admin/addlesson') }} /></div>
            <DataScroller value={lessons} itemTemplate={itemTemplate} rows={10000} inline scrollHeight="700px" />
        </div>



    );
};
export default LessoList;
