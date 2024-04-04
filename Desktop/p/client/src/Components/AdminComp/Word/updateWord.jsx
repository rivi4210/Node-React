
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { RadioButton } from "primereact/radiobutton";
import { useGetWordsByIdLessQuery, useUpdateWordMutation } from "./wordApiSlice";

const UpdateWord = ({ w }) => {
    console.log(w.Img);
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedWord, { isError, isSuccess, error }] = useUpdateWordMutation()
    const [selectedFile, setSelectedFile] = useState(null);
    // const handleUpdate = (user) => {
    //     // !name && setName(user.name)
    //     console.log({ _id, name, username, password, phone, email, role })
    //     updatedUser({ _id, name, username, password, phone, email, role })
    //     claer()

    // // }
    const handleFileChange = (event) => {
        // debugger
        console.log(event);
        if (event)
            setSelectedFile(event.target.files[0]);
    };

    const defaultValues = {
        word: w.word,
        translating: w.translating,
        Img: w.Img,
        _id: w._id,
        lesson: w.lesson
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
        console.log('gggggggggg', data.Img);

        const formData = new FormData();
        //   formData.append('Img', selectedFile)
        // debugger
        for (const value of formData.values()) {
            console.log('fd', value);
        }
        // console.log('dddddddddd', selectedFile);
        // if (selectedFile != null) {
        //     console.log("IIIIIIIIIII");
        //     formData.append('Img', selectedFile)
        // }
        // else {
        //     formData.append('Img', data.Img)
        //     console.log('Img', data.Img);
        //     console.log("eeeeee");
        // }
        // console.log(formData);
        formData.append('word', data.word);
        formData.append('_id', data._id);
        formData.append('translating', data.translating);
        selectedFile?formData.append('Img', selectedFile ):formData.append('Img',data.Img );
        formData.append('lesson', data.lesson);
        // debugger
        console.log("wwwwwwwwwwwwwwwwww ", formData.get('Img'));
        // Send the file to your Node.js server using axios
        updatedWord(formData)
        // updatedWord(data);
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
        <Button icon="pi pi-pencil" className="p-button-rounded" onClick={() => { setFormUpdate(true) }}></Button>

        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Dialog
            visible={formUpdate}
            onHide={() => setFormUpdate(false)}>

            <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px' }}>
                    {/* <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" className="block mx-auto">

                            </svg> */}

                    <Controller
                        name="word"
                        control={control}
                        rules={{ required: 'category is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.word} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >

                                    {/* <label className="w-6rem">Username</label> */}
                                    <InputText id={field.word} defaultValue={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.word} >Word</label>

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="translating"
                        control={control}
                        rules={{ required: 'translating is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.translating} className={classNames({ 'p-error': errors.value })}></label>
                                <span className="p-float-label" >

                                    {/* <label className="w-6rem">Username</label> */}
                                    <InputText id={field.translating} defaultValue={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                    <label htmlFor={field.translating} >Translating</label>

                                </span>

                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="Img"
                        type='file'
                        control={control}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <input type="file" name="Img" onChange={handleFileChange}/>

                            </>
                        )}
                    />



                    {/* <div className="flex align-items-center gap-2">
                        <Button label="Sign-In" type='submit'  text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={()=>{navigate('/aaa')}} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div> */}
                    <div className="flex align-items-center gap-2">
                        <Button label="Update" type="submit" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                        <Button label="Cancel" onClick={(e) => { setFormUpdate(false) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                    </div>

                </div>

            </form>
        </Dialog>
        {/* </form> */}
        {/* <Button onClick={setFormUpdate(true)} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>) */}
    </>
    )
}
export default UpdateWord