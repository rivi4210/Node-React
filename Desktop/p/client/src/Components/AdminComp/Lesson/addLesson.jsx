import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useAddLessonMutation } from './lessonsApiSlice';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';


const AddLesson = () => {

    const toast = useRef(null);
    const navigate=useNavigate()

    const [addLesson, { isErrorAdd, isSuccessAdd, errorAdd }] = useAddLessonMutation()
    // const handleAdd = (e) => {
    //     console.log(e);
    //     addLesson({})
    //     claer()
    // }

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        category: '',
        level: ''
    }; 

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data?.level && show();
        console.log({ category: data.category, level: data.level });
        addLesson({ category: data.category, level: data.level })
        reset();
        navigate('/admin/learn')
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <>
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
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>Category</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />

                    <Controller
                        name="level"
                        control={control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field }) => (
                            <>

                                <div className="flex justify-content-center">
                                    <div className="flex align-items-center">
                                        <RadioButton inputId="f5" {...field} inputRef={field.ref} value='level 1' checked={field.value === 'level 1'} />
                                        <label htmlFor="f5" className="ml-1 mr-3">
                                            level 1
                                        </label>

                                        <RadioButton inputId="f6" {...field} value="level 2" checked={field.value === 'level 2'} />
                                        <label htmlFor="f6" className="ml-1 mr-3">
                                            level 2
                                        </label>

                                        <RadioButton inputId="f7" {...field} value="level 3" checked={field.value === 'level 3'} />
                                        <label htmlFor="f7" className="ml-1 mr-3">
                                            level 3
                                        </label>
                                    </div>
                                </div>
                                {getFormErrorMessage(field.name)}
                                <Button label="Add Lessson" type="submit" icon="pi pi-check" />
                            </>
                        )}
                    />
                </div>
            </form>
        </>
    )
}
export default AddLesson