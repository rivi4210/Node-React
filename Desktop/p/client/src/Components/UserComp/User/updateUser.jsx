import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "./userApiSlice";
import { Password } from "primereact/password";
import { useAsyncValue } from "react-router-dom";
import { asyncThunkCreator } from "@reduxjs/toolkit";

const UpdateUserUser = ({ user, refetch }) => {
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedUser, { isError, isSuccess, error }] = useUpdateUserMutation()

    const defaultValues = {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
        _id: user._id,
        role: user.role
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        data.value && show();
        // console.log(data);
        await updatedUser(data);
        refetch()
        setFormUpdate(false)
        // console.log('err', { isSuccess, isError, error });
        reset();
    };
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    return (<>
        <Button icon="pi pi-user-edit" label="עדכן פרטים" onClick={() => { setFormUpdate(true) }}></Button>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Dialog
            visible={formUpdate}

            onHide={() => setFormUpdate(false)}>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                    {/* <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                            </svg> */}
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
                    {/* <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'password is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label" >
                                            <Password id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} placeholder='password' toggleMask />
                                            <label htmlFor={field.name} >password</label>
                                        </span>

                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            /> */}
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: 'Email is required.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' } }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >



                                    {/* <label className="w-6rem">Username</label> */}
                                    <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.name} >email</label>


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

                                    {/* <label className="w-6rem">Username</label> */}
                                    <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.name} >phone</label>

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <div >
                        <Button label="עדכן" type="submit" text ></Button>
                    </div><div>
                        <Button label="ביטול" onClick={(e) => { setFormUpdate(false) }} text ></Button>
                    </div>

                </div>

            </form>
        </Dialog>
    </>
    )
}
export default UpdateUserUser