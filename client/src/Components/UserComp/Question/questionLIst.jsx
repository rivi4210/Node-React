import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useGetQuestionByIdLessQuery } from './questionApiSlice';
import { useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';
import { MdDirections } from 'react-icons/md';
import { setupListeners } from '@reduxjs/toolkit/query';

const QuestionList = () => {
    const { idLess } = useParams()
    console.log(idLess);
    const [i, setI] = useState(0)
    const [mistake, setMistake] = useState(0)
    const [unMistake, setUnMistake] = useState(0)
    const [current, setCurrent] = useState("")

    // const[quest,setQuest]=useState("")
    let quest = ''
    let answers = []

    const {
        data: questions,
        isLoading,
        isError,
        error,
        isSuccess
    } = useGetQuestionByIdLessQuery(idLess)

    if (isSuccess) {
        // setQuest(questions[0].question)
        quest = questions[i].question
        console.log('qqqqqqqqestions', questions[0].question);
        for (let index = 0; index < questions.length; index++) {
            answers[index] = [...questions[index].optional]
            answers[index].push(questions[index].answer)
        }
        // answers=[...questions[0].optional]
        // answers.push(questions[0].answer)
        console.log('after', answers);
    }


    const nextQest = () => {
        console.log('qlqlql', i + 1 > questions.length);
        if (i + 1 <questions.length) {
            if (current !== questions[i]?.answer)
                setMistake(mistake + 1)
            else
            setUnMistake(unMistake+1)
            quest = questions[i + 1].question
            setI(i + 1);
            console.log('i', i);
        }
        else {
            if(mistake+unMistake+1==questions.length)
            if (current !== questions[i]?.answer )
                setMistake(mistake + 1)
            else
            setUnMistake(unMistake+1)
            console.log(mistake);
        }
    }
    const defaultValues = {
        check: false,

    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
        reset
    } = useForm({ defaultValues });

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    // setAnswers(questions.answer,...questions.optional)
    // console.log('after',answers);
    // console.log("questionsss", questions);
    // const header = (
    //     <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    // );
    const footer = (
        <>
            <Button label="Next" icon="pi pi-arrow-right" onClick={() => nextQest()} />
            {/* <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} /> */}
        </>
    );

    return (

        <div className="card flex justify-content-center py-5 px-4" >
            {/* {console.log(questions[0]&& questions[i]?.question )} */}
            <Card title={`שאלה מספר ${i + 1}`} subTitle={`? ${quest} מה התרגום של `} footer={footer} className="md:w25-rem">
                <form>
                    <Controller
                        name="level"
                        control={control}
                        // checked={lesson.level}
                        rules={{ required: 'Value is required.' }}
                        render={({ field }) => (
                            <>
                                {/* <div>Please choose the level.</div> */}
                                <div className="flex justify-content-center">
                                    <div className="flex align-items-center">
                                        {answers[0]?.length ? console.log('ttttttttttttttttttttt', answers[0][0]) : ''}
                                        <RadioButton inputId="f5" {...field} inputRef={field.ref} value={answers[i]?.length && answers[i][0]} onChange={() => { setCurrent(answers[i]?.length && answers[i][0]) }}
                                        // checked={lesson.level === 'level 1'}
                                        />
                                        <label htmlFor="f5" className="ml-1 mr-3">
                                            {answers[i]?.length && answers[i][0]}
                                        </label>

                                        <RadioButton inputId="f6" {...field} inputRef={field.ref} value={answers[i]?.length && answers[i][1]} onChange={() => { setCurrent(answers[i]?.length && answers[i][1]) }} />
                                        <label htmlFor="f6" className="ml-1 mr-3">
                                            {answers[i]?.length && answers[i][1]}
                                        </label>

                                        <RadioButton inputId="f7" {...field} inputRef={field.ref} value={answers[i]?.length && answers[i][2]} onChange={() => setCurrent(answers[i]?.length && answers[i][2])} />
                                        <label htmlFor="f7" className="ml-1 mr-3">
                                            {answers[i]?.length && answers[i][2]}
                                        </label>
                                        <RadioButton inputId="f8" {...field} inputRef={field.ref} value={answers[i]?.length && answers[i][3]} onChange={() => { console.log("הקליקו עלי");; setCurrent(answers[i]?.length && answers[i][3]) }} />
                                        <label htmlFor="f8" className="ml-1 mr-3">
                                            {answers[i]?.length && answers[i][3]}
                                        </label>
                                    </div>
                                </div>
                                {getFormErrorMessage(field.name)}
                                {/* <Button label="Update Lessson" type="submit" icon="pi pi-check" /> */}
                            </>
                        )}
                    />
                </form>
            </Card>
        </div>
    )
}
export default QuestionList




