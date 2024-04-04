import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import Alert from 'react-bootstrap/Alert';
// import { withAlert } from 'react-alert'


import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import Login from './login.jsx';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../Components/auth/authApiSlice.jsx';
// import { login } from '../../server/Controller/authController.js';

const Register = () => {
    const toast = useRef(null);
    const navigate = useNavigate()
    // const[name,setName]=useState('')
    // const[password,setPassword]=useState('')
    const [registerFunc, { isError, isSuccess, isLoading, data, error }] = useRegisterMutation()


    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const checkAllow = (isSuccess) => {
        if (!isSuccess) {
            reset()
            navigate('/register')
        }
        else navigate('/login')
    }

    useEffect(() => {
        checkAllow(isSuccess)
    }, [isSuccess])
    const defaultValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        phone: ''
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = (data) => {
        data.value && show();
        console.log(data);
        registerFunc(data);
        console.log('err', { isSuccess, isError, error });
        // if (!isSuccess) return (alert("try again"), reset(), navigate('/register'))
        // else  navigate('/')
        reset();
    };

    // useEffect(() => {
    //     if (name) {
    //         console.log(name);
    //       <Login />
    //     }
    //   }, [name,password]);


    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    return (
        <><form onSubmit={handleSubmit(onSubmit)}>

            {/* visible={visible}
            modal
            onHide={() => setVisible(false)}
            content={({ hide }) => ( */}
            <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                </svg>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'name is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >

                                {/* <label className="w-6rem">Username</label> */}
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >name</label>

                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: 'username is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >


                                {/* <label className="w-6rem">Username</label> */}
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >username</label>


                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    rules={{ required: 'password is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >
                                {/* <label className="w-6rem">Username</label> */}
                                <Password id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='password' toggleMask />
                                <label htmlFor={field.name} >password</label>
                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >



                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >email</label>


                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {/* <Controller
                    name="phone"
                    control={control}
                    rules={{ required: 'phone is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >

                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >phone</label>

                            </span>

                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                /> */}


                {/* <div className="flex align-items-center gap-2">
                        <Button label="Sign-In" type='submit'  text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={()=>{navigate('/aaa')}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div> */}
                <div className="flex align-items-center gap-2">
                    <Button label="Sign-In" type='submit' text></Button>

                    <Button label="Cancel" onClick={(e) => navigate('/')} text ></Button>
                </div>

            </div>

        </form></>
        // <div className="card flex justify-content-center">
        //     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-column gap-2">
        //         <Toast ref={toast} />
        //         <Controller
        //             name="value"
        //             control={control}
        //             rules={{ required: 'name is required.' }}
        //             render={({ field, fieldState }) => (
        //                 <>
        //                     <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
        //                     <span className="p-float-label">
        //                         <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
        //                         <label htmlFor={field.name}>name</label>
        //                     </span>

        //                     {getFormErrorMessage(field.name)}
        //                 </>
        //             )}
        //         />
        //         <Controller
        //             name="username"
        //             control={control}
        //             rules={{ required: 'username is required.' }}
        //             render={({ field, fieldState }) => (
        //                 <>
        //                     <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
        //                     <span className="p-float-label">
        //                         <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
        //                         <label htmlFor={field.name}>username</label>
        //                     </span>

        //                     {getFormErrorMessage(field.name)}
        //                 </>
        //             )}
        //         />
        //         <Controller
        //             name="email"
        //             control={control}

        //             render={({ field, fieldState }) => (
        //                 <>
        //                     <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
        //                     <span className="p-float-label">
        //                         <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
        //                         <label htmlFor={field.name}>email</label>
        //                     </span>

        //                     {getFormErrorMessage(field.name)}
        //                 </>
        //             )}
        //         />
        //         <Controller
        //             name="password"
        //             control={control}
        //             rules={{ required: 'Password is required.' }}
        //             render={({ field, fieldState }) => (
        //                 <>
        //                     <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
        //                     <span className="p-float-label">
        //                         <Password id={field.name} {...field} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} feedback={false} />
        //                     <label htmlFor={field.name}>password</label></span>
        //                     {getFormErrorMessage(field.name)}
        //                 </>
        //             )}
        //         />
        //         <Button label="Register" type="submit" icon="pi pi-check" />
        //         <Button label="Cancel" onClick={navigate('/login')} icon="pi pi-check" />
        //     </form>       
        // </div>
    )
}

export default Register