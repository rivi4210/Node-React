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
import { useAddWordMutation } from './wordApiSlice';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputSwitch } from 'primereact/inputswitch';
import { FileUpload } from 'primereact/fileupload';

const AddWord = () => {

    const { idLess } = useParams();
    const [selectedFile, setSelectedFile] = useState(null);

    const toast = useRef(null);
    const navigate = useNavigate()

    const [addWord, { isErrorAdd, isSuccessAdd, errorAdd }] = useAddWordMutation()
    
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

        const formData = new FormData();
        //   formData.append('Img', selectedFile)
        // debugger
        for (const value of formData.keys()) {
            console.log(value);
        }
        // console.log(formData);
        formData.append('word', data.word);
        formData.append('translating', data.translating);
        formData.append('Img', selectedFile);
        formData.append('lesson', idLess);

        // Send the file to your Node.js server using axios
        addWord(formData)
        // data=new FormData()


        data.level && show();
        // console.log({ word: data.word, translating: data.translating, Img: data.Img, lesson: idLess });
        // addWord({ word: data.word, translating: data.translating, Img: data.Img, lesson: idLess })
        reset();
        navigate('/admin/listWordOfLesson/'.concat(idLess))
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
                        name="word"
                        control={control}
                        rules={{ required: 'word is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
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
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>Translating</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <Controller
                        name="Img"
                        type='file'
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <input type="file" name="Img" onChange={handleFileChange} />
                                {/* <input type='file'  name='Img' id={field.name}  onChange={(e) => field.onChange(e.target.value)}  /> */}

                                {/* <div className="flex justify-content-center" > */}
                                {/* <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label> */}
                                {/* <span className="p-float-label"> */}
                                {/* <FileUpload mode="basic"  id={field.name} value={field.value} type='file' className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} /> */}
                                {/* <FileUpload mode="basic" name="demo[]" url="/publib/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} auto chooseLabel="Browse" /> */}
                                {/* <label htmlFor={field.name}>Img</label> */}
                                {/* </span> */}
                                {/* {getFormErrorMessage(field.name)}</div> */}
                            </>
                        )}
                    />
                    {/* <form enctype="multipart/form-data"> */}
                    {/* <input type='file' name='Img' /> */}
                    {/* </form> */}

                    {/* <Toast ref={toast} /> */}


                    <Button label="Add Word" type="submit" />

                </div>
            </form>
        </>
    )
}
export default AddWord
