import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useUpdateUserMutation } from "./usersApiSlice";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";

const UpdateUser = ({ user }) => {
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


    const onSubmit = (data) => {
        data.value && show();
        console.log(data);
        updatedUser(data);
        setFormUpdate(false)
        console.log('err', { isSuccess, isError, error });
        // if (!isSuccess) return (alert("try again"), reset(), navigate('/register'))
        // else  navigate('/')
        reset();
    };
    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: getValues('value') });
    };
    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };


    const roles = [
        { name: 'User', code: 'user' },
        { name: 'Admin', code: 'admin' }
    ];

    return (<>
        <Button icon="pi pi-user-edit" className="p-button-rounded" onClick={() => { setFormUpdate(true) }}></Button>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Dialog
            visible={formUpdate}

            onHide={() => setFormUpdate(false)}>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="flex flex-column  gap-3  flex-row  gap-2" >
                    {/* <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                            </svg> */}

                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: 'role is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >

                                    {/* <label className="w-6rem">Username</label> */}

                                    <Dropdown value={field.value} onChange={(e) =>{console.log(e.value.code);field.onChange(e.value.code)} } options={roles} optionLabel="name"
                                        placeholder="Select a Role" className="w-full md:w-14rem" />
                                    {/* <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.name} >role</label> */}

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />


                    {/* <div className="flex align-items-center gap-2">
                        <Button label="Sign-In" type='submit'  text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={()=>{navigate('/aaa')}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div> */}
                    <div >
                        <Button label="Update" type="submit" ></Button>
                    </div> <div>
                        <Button label="Cancel" onClick={(e) => { setFormUpdate(false) }} ></Button>
                    </div>

                </div>

            </form>
        </Dialog>
        {/* </form> */}
        {/* <Button onClick={setFormUpdate(true)} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>) */}
    </>
    )
}
export default UpdateUser