import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useAddUserMutation } from './usersApiSlice';
import { Divider } from 'primereact/divider';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';


const AddUser = () => {

    const toast = useRef(null);
    const navigate = useNavigate()
    const roles = [
        { name: 'User', code: 'user' },
        { name: 'Admin', code: 'admin' }
    ];
    const [addUser, { isErrorAdd, isSuccessAdd, errorAdd }] = useAddUserMutation()
    // const handleAdd = (e) => {
    //     console.log(e);
    //     addLesson({})
    //     claer()
    // }

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };

    const defaultValues = {
        name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        _id: "",
        role: "user"
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
        console.log({ name: data.name, username: data.username, email: data.email, password: data.password, phone: data.phone, _id: data._id, role: data.role });
        addUser({ name: data.name, username: data.username, email: data.email, password: data.password, phone: data.phone, _id: data._id, role: data.role })
        reset();
        navigate('/admin/user')
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
                        name="name"
                        control={control}
                        rules={{ required: 'name is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>Name</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'username is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.username} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.username} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.username}>Username</label>
                                    </span>
                                    {getFormErrorMessage(field.username)}</div></>)}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: 'password is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.password} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.password} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.password}>Password</label>
                                    </span>
                                    {getFormErrorMessage(field.password)}</div></>)}

                    />
                    <Controller
                    name="email"
                    control={control}
                    rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                    render={({ field, fieldState }) => (
                        <>
                        <div></div><div></div>
                        <div className="flex justify-content-center" >
                            <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                            <span className="p-float-label" >
                                <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                <label htmlFor={field.name} >email</label>
                            </span>
                            {getFormErrorMessage(field.name)}</div>
                        </>
                    )}
                />
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: 'role is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                            <div></div><div></div>
                            <div className="flex justify-content-center" >
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >
                                    <Dropdown value={field.value} onChange={(e) => { console.log(e.value.code); field.onChange(e.value.code) }} options={roles} optionLabel="name"
                                        placeholder="Select a Role" className="w-full md:w-14rem" />
                                </span>

                                {getFormErrorMessage(field.name)}</div>
                            </>
                        )}
                    />


                    <Button label="Add User" type="submit" icon="pi pi-check" />

                    {/* <Toast ref={toast} /> */}

                </div>
            </form>
        </>
    )
}
export default AddUser