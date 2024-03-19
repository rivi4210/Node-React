
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { RadioButton } from "primereact/radiobutton";
// import { useGetWordsByIdLessQuery, useUpdateWordMutation } from "./wordApiSlice";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useUpdateWordMutation } from "../Word/wordApiSlice";
import { useUpdateQuestionMutation } from "./questionApiSlice";

const UpdateQuestion = ({ q }) => {
    const toast = useRef(null);
    const [formUpdate, setFormUpdate] = useState(false)
    const [_id, setId] = useState("")
    const [updatedQuestion, { isError, isSuccess, error }] = useUpdateQuestionMutation()
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate()
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
        optional: q.optional,
        question: q.question,
        answer: q.answer,
        _id: q._id,
        option1: q.optional[0],
        option2: q.optional[1],
        option3: q.optional[2],
        lesson: q.lesson
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });


    const onSubmit = (data) => {
        console.log(data);
        setFormUpdate(false)
        data.optional[0]=data.option1
        data.optional[1]=data.option2
        data.optional[2]=data.option3
        console.log('oppppptional', data);
        updatedQuestion(data)
        // data=new FormData()


        data.level && show();
        // console.log({ word: data.word, translating: data.translating, Img: data.Img, lesson: idLess });
        // addWord({ word: data.word, translating: data.translating, Img: data.Img, lesson: idLess })
        reset();
        navigate('/admin/listQuestionOfLesson/'.concat(q.lesson))

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

            <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                <div className="flex flex-column  gap-3  flex-row  gap-2" >
                    <Toast ref={toast} />
                    <Controller
                        name="question"
                        control={control}
                        rules={{ required: 'word is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>Question</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />

                    <Controller
                        name="answer"
                        control={control}
                        rules={{ required: 'answer is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <div></div><div></div>
                                <div className="flex justify-content-center" >
                                    <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                    <span className="p-float-label">
                                        <InputText id={field.name} value={field.value} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                        <label htmlFor={field.name}>Answer</label>
                                    </span>
                                    {getFormErrorMessage(field.name)}</div></>)}
                    />
                    <div>
                        <Controller
                            name="option1"
                            control={control}
                            rules={{ required: 'option1 is required.' }}
                            render={({ field, fieldState }) => (
                                <>
                                    <div></div><div></div>
                                    <div className="flex justify-content-center" >
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label">

                                            <InputText placeholder='Option 1' defaultValue={q.optional[0]} id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                            {/* <label htmlFor={field.name}>Option 1</label> */}
                                        </span>
                                        {getFormErrorMessage(field.name)}</div></>)}
                        />
                        <Controller
                            name="option2"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <div></div><div></div>
                                    <div className="flex justify-content-center" >
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label">

                                            <InputText placeholder='Option 2' defaultValue={q.optional[1]} id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                            {/* <label htmlFor={field.name}>Option 2</label> */}
                                        </span>
                                        {getFormErrorMessage(field.name)}</div></>)}
                        />
                        <Controller
                            name="option3"
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <div></div><div></div>
                                    <div className="flex justify-content-center" >
                                        <label htmlFor={field.name} className={classNames({ 'p-error': errors.value })}></label>
                                        <span className="p-float-label">

                                            <InputText placeholder='Option 3' defaultValue={q.optional[2]} id={field.name} className={classNames({ 'p-invalid': fieldState.error })} onChange={(e) => field.onChange(e.target.value)} />
                                            {/* <label htmlFor={field.name}>Option 3</label> */}
                                        </span>
                                        {getFormErrorMessage(field.name)}</div></>)}
                        />
                    </div>
                    <Button label="UPDATE" type="submit" />
                    <Button label="CANCLE" onClick={() => setFormUpdate(false)} />

                </div>
            </form>
        </Dialog>
        {/* </form> */}
        {/* <Button onClick={setFormUpdate(true)} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>) */}
    </>
    )
}
export default UpdateQuestion