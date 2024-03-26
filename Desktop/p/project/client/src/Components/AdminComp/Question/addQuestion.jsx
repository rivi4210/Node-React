import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
// import { useAddLessonMutation } from './lessonsApiSlice';
import { Divider } from 'primereact/divider';
import { useNavigate, useParams } from 'react-router-dom';
// import { useAddWordMutation } from './wordApiSlice';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { FileUpload } from 'primereact/fileupload';
import { useAddQestionMutation } from './questionApiSlice';

const AddQuestion = () => {

    const { idLess } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);

    const toast = useRef(null);
    const navigate = useNavigate()

    const [addQuestion, { isErrorAdd, isSuccessAdd, errorAdd }] = useAddQestionMutation()
    // const handleAdd = (e) => {
    //     console.log(e);
    //     addLesson({})
    //     claer()
    // }
    const handleFileChange = (event) => {

        setSelectedFile(event.target.files[0]);
    };

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    const defaultValues = {
        question: '',
        answer: '',
        optional: [],
        option1: "",
        option2: "",
        option3: "",
        lesson:idLess
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        console.log(data);
        data.optional.push(data.option1)
        data.optional.push(data.option2)
        data.optional.push(data.option3)
        console.log('oppppptional',data);
        addQuestion(data)
        // data=new FormData()


        data.level && show();
        // console.log({ word: data.word, translating: data.translating, Img: data.Img, lesson: idLess });
        // addWord({ word: data.word, translating: data.translating, Img: data.Img, lesson: idLess })
        reset();
        navigate('/admin/listQuestionOfLesson/'.concat(idLess))
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                <div className="flex flex-column  gap-3  flex-row  gap-2" >
                    <Toast ref={toast} />
                    <Controller
                        name="question"
                        control={control}
                        rules={{ required: 'word is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>Question</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    
                    
                    <Controller
                        name="answer"
                        control={control}
                        rules={{ required: 'answer is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>Answer</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <div>
                    <Controller
                        name="option1"
                        control={control}
                        rules={{ required: 'option1 is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">

                                        <InputText placeholder='Option 1' id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        {/* <label htmlFor={field.name}>Option 1</label> */}
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <Controller
                        name="option2"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">

                                        <InputText placeholder='Option 2' id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        {/* <label htmlFor={field.name}>Option 2</label> */}
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <Controller
                        name="option3"
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">

                                        <InputText placeholder='Option 3' id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        {/* <label htmlFor={field.name}>Option 3</label> */}
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    </div>
                    <Button label="Add Word" type="submit" />

                </div>
            </form>
        </>
    )
}
export default AddQuestion
