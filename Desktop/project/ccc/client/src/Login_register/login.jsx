import React, { useRef, useState ,useEffect} from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Link, Navigate, useNavigate } from "react-router-dom";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Register from './register';

const Login=()=>{

    const navigate=useNavigate()

    const toast = useRef(null);
    
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        username:'',
        password:''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    // const handleSubmitReg = (event) => {
    //     event.preventDefault();
    //     // Add your form submission logic here
    //     console.log('Form submitted!');
        
    //    return <Navigate to="/register"/>
    //     // Navigate to the Register component after form submission
    //     // history.push('/register');
        
    // };

    const onSubmit = (data) => {
        data.value && show();
        console.log(data);
        
        // setUsername(data.username)
        navigate('/home')

        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (
        <div className="card flex justify-content-center">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Toast ref={toast} />
                
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'username is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                            <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name}>username</label>
                            </span>
                            
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'Password is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label">
                                <Password id={field.name} {...field} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} feedback={false} />
                            <label htmlFor={field.name}>password</label></span>
                            {getFormErrorMessage(field.name)}
                 </>
                )}
                        />
                <Button label="Sign-in" type="submit" icon="pi pi-check" />
            </form>
            
                <Button label="Sign-up" onClick={()=>{navigate('/register')}} icon="pi pi-check" />
            
            
</div>
)}

export default Login