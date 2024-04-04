
import React from 'react';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Controller } from 'react-hook-form';


import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Password } from 'primereact/password';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import { useLoginMutation, useRegisterMutation } from '../Components/auth/authApiSlice';
import { setToken } from "../Components/auth/authSlice";
import { useDispatch } from 'react-redux';
import useAuth from '../Components/auth/useAuth';
export default function LoginDemo() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);

    const [registerFunc, { isErrorReg, isSuccessReg, isLoadingReg, dataReg, errorReg }] = useRegisterMutation()
    const [loginFunc, { isError, error, isSuccess, data }] = useLoginMutation()

    const toast = useRef(null);
    const{role}=useAuth()
    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
           
            console.log('aaa', role);
            if (role == 'user')
                navigate('/user')
            else if (role == 'admin')
                navigate('/admin')
        }
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')


    // console.log(data);
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        username: '',
        password: '',
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    // const handleSubmitReg = () => {
    //     // preventDefault();
    //     registerFunc({ name, username, password, email, phone });
    //     console.log({ name, username, password, email, phone });
    //     reset();
    // }

    const onSubmit = (data) => {
        data.username && show();
        console.log(data);
        // data.preventDefault();
        loginFunc(data)
        // navigate('/home')
        reset();
    };
    // const onSubmit2 = (data) => {
    //     data.username && show();
    //     console.log(data);
    //     // data.preventDefault();
    //     registerFunc(data)
    //     // navigate('/home')
    //     reset();
    // };

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
                            <span className="p-float-label" >

                                {/* <div > */}
                                    {/* <label className="w-6rem">Username</label> */}
                                    <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)}  />
                                    <label htmlFor={field.name}>username</label>
                                {/* </div> */}

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
                                <Password id={field.name} {...field} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} feedback={false}  toggleMask/>
                                <label htmlFor={field.name}>password</label>
                            </span>
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />

                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    {/* <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Username</label>
                        <InputText id="username" type="text" className="w-12rem" />
                    </div>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <label className="w-6rem">Password</label>
                        <InputText id="password" type="password" className="w-12rem" />
                    </div> */}
                    <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" type='submit'></Button>
                </div>



            </form>

            <div className="w-full md:w-2">
                <Divider layout="vertical" className="hidden md:flex">
                    <b>OR</b>
                </Divider>
                <Divider layout="horizontal" className="flex md:hidden" align="center">
                    <b>OR</b>
                </Divider>
            </div>
            <div className="w-full md:w-5 flex align-items-center justify-content-center py-5" align='center'>
                <Button label="Sign Up" icon="pi pi-user-plus" severity="success" className="w-10rem" onClick={() => { navigate('/register'); setVisible(true) }} ></Button>
            </div>

            {/* <form  onSubmit={handleSubmit(onSubmit2)}>
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => setVisible(false)}
                    content={({ hide }) => (
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

                                        <div >
                                            <label className="w-6rem">Username</label>
                                            <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='name' />
                                            <label htmlFor={field.name} >username</label>
                                        </div>

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

                                        <div >
                                            <label className="w-6rem">Username</label>
                                            <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='username' />
                                            <label htmlFor={field.name} >username</label>
                                        </div>

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

                                        <div >
                                            <label className="w-6rem">Username</label>
                                            <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='password' />
                                            <label htmlFor={field.name} >username</label>
                                        </div>

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

                                        <div >
                                            <label className="w-6rem">Username</label>
                                            <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='username' />
                                            <label htmlFor={field.name} >username</label>
                                        </div>

                                        </span>

                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <Controller
                                name="phone"
                                control={control}
                                rules={{ required: 'phone is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label" >

                                        <div >
                                            <label className="w-6rem">Username</label>
                                            <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='username' />
                                            <label htmlFor={field.name} >username</label>
                                        </div>

                                        </span>

                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />

                            <div className="inline-flex flex-column gap-2">
                            <InputText placeholder='Name' id="name" label="Name" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setName(e.target.value)} ></InputText>
                            </div>

                            <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                Username
                            </label> 
                            <InputText placeholder='Username' id="username" label="Username" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setUsername(e.target.value)}></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                Password
                            </label>
                            <InputText placeholder='Password' id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" onChange={(e) => setPassword(e.target.value)}></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label>
                            <InputText placeholder='Email' id="email" label="Email" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setEmail(e.target.value)}></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                            <label htmlFor="username" className="text-primary-50 font-semibold">
                                Email
                            </label> 
                            <InputText placeholder='Phone' id="phone" label="Phone" className="bg-white-alpha-20 border-none p-3 text-primary-50" onChange={(e) => setPhone(e.target.value)}></InputText>
                            </div>


                            <div className="flex align-items-center gap-2">
                                <Button label="Sign-In" type='submit'  text></Button>
                                <Button label="Cancel" onClick={(e) => hide(e)} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                        </div>
                    )}
                ></Dialog></form> */}
        </div>



    )
}


