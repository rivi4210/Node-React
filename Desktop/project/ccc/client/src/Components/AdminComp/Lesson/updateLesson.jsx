
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import {  useUpdateLessonMutation } from "./lessonsApiSlice";
import { Password } from "primereact/password";
import { RadioButton } from "primereact/radiobutton";

const UpdateLesson = ({  less }) => {
    console.log(less);
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedLesson, { isError, isSuccess, error }] = useUpdateLessonMutation()
    // const handleUpdate = (user) => {
    //     // !name && setName(user.name)
    //     console.log({ _id, name, username, password, phone, email, role })
    //     updatedUser({ _id, name, username, password, phone, email, role })
    //     claer()

    // }

    const defaultValues = {
        category: less.category,
        level: less.level,
        _id:less._id
       
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
        updatedLesson(data);
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


    return (<>
        <Button icon="pi pi-pencil" className="p-button-rounded" onClick={() => {  setFormUpdate(true) }}></Button>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <Dialog
                visible={formUpdate}
                
                onHide={() => setFormUpdate(false)}>
                
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                            {/* <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                            </svg> */}
                           
                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: 'category is required.' }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label" >

                                            {/* <label className="w-6rem">Username</label> */}
                                            <InputText id={field.category} defaultValue={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                            <label htmlFor={field.category} >Category</label>

                                        </span>

                                        {getFormErrorMessage(field.name)}
                                    </>
                                )}
                            />
                            <Controller
                                                name="level"
                                                control={control}
                                                checked={less.level}
                                                rules={{ required: 'Value is required.' }}
                                                render={({ field }) => (
                                                    <>
                                                        {/* <div>Please choose the level.</div> */}
                                                        <div className="flex justify-content-center">
                                                            <div className="flex align-items-center">
                                                                <RadioButton inputId="f5" {...field} inputRef={field.ref} value='level 1' defaultChecked={less.level === 'level 1'}/>
                                                                <label htmlFor="f5" className="ml-1 mr-3">
                                                                    level 1
                                                                </label>

                                                                <RadioButton inputId="f6" {...field} inputRef={field.ref} value="level 2"  defaultChecked={less.level === 'level 2'}  />
                                                                <label htmlFor="f6" className="ml-1 mr-3">
                                                                    level 2
                                                                </label>

                                                                <RadioButton inputId="f7" {...field} inputRef={field.ref} value="level 3" defaultChecked={less.level === 'level 3'} />
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


                            {/* <div className="flex align-items-center gap-2">
                        <Button label="Sign-In" type='submit'  text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={()=>{navigate('/aaa')}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div> */}
                            <div className="flex align-items-center gap-2">
                                <Button label="Update" type="submit" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="Cancel" onClick={(e) => { setFormUpdate(false)}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>

                        </div>

                    </form>
            </Dialog>
            {/* </form> */}
        {/* <Button onClick={setFormUpdate(true)} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>) */}
        </>
)}
export default UpdateLesson