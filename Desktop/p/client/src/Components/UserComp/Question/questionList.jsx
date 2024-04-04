import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useGetQuestionByIdLessQuery } from './questionApiSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';
import { MdDirections } from 'react-icons/md';
import { setupListeners } from '@reduxjs/toolkit/query';
import ShowMark from '../Exam/showMark';
import MyAccount from '../User/myAccount';

const QuestionList = () => {
    const { idLess } = useParams()
    const navigate = useNavigate()
    const [i, setI] = useState(0)
    const [showMark, setShowMark] = useState(false)
    const [mistake, setMistake] = useState(0)
    const [unMistake, setUnMistake] = useState(0)
    const [current, setCurrent] = useState("")
    const [firstTime, setFirstTime] = useState(false)
    const [currentAnswers, setCurrentAnswers] = useState([])

    let quest = ''
    let answers = []

    const {
        data: questions,
        isLoading,
        isError,
        error,
        isSuccess
    } = useGetQuestionByIdLessQuery(idLess)

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    const firstList = () => {
        if (answers?.length && !firstTime) {
            setCurrentAnswers(shuffle(answers[0]))
            setFirstTime(true)
        }
    }

    if (isSuccess) {
        console.log(firstTime);
        quest = questions[i]?.question
        // console.log('qqqqqqqqestions', questions[0].question);
        for (let index = 0; index < questions.length; index++) {
            answers[index] = [...questions[index].optional]
            answers[index].push(questions[index].answer)
        }
        firstList()
        // console.log('after', answers);
    }

    const nextQest = async () => {
        // console.log('answers', answers[i + 1]);
        // console.log('qlqlql', i + 1 > questions.length);
        if (i + 1 < questions.length) {
            setCurrentAnswers(shuffle(answers[i + 1]))
            if (current !== questions[i]?.answer) {

                await setMistake(mistake + 1)
                console.log(questions[i]?.answer);
            }
            else {
                await setUnMistake(unMistake + 1)
            }
            quest = questions[i + 1].question
            setI(i + 1);
            console.log('i', i);
        }
        else {
            if (mistake + unMistake + 1 == questions.length) {
                if (current !== questions[i]?.answer) {

                    await setMistake(mistake + 1)
                    setShowMark(true)
                }

                else {
                    await setUnMistake(unMistake + 1)
                    setShowMark(true)
                    console.log(mistake);
                }
            }
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

    const footer = (
        <>
            <Button label="Next" icon="pi pi-arrow-right" onClick={() => nextQest()} />
        </>
    );

    return (
        <>
            <Button icon="pi pi-arrow-left" onClick={() => navigate("/user/lesson")} />
            <div className="card flex justify-content-center py-5 px-4" >
                <Card title={`שאלה מספר ${i + 1}`} subTitle={`? ${quest} מה התרגום של `} footer={footer} className="md:w25-rem">
                    <form>
                        <Controller
                            name="current"
                            control={control}
                            rules={{ required: 'current is required.' }}
                            render={({ field }) => (
                                <>
                                    <div className="flex justify-content-center">
                                        <div className="flex align-items-center">
                                            {answers[0]?.length ? console.log('ttttttttttttttttttttt', answers[0][0]) : ''}
                                            <RadioButton inputId="f5" {...field} inputRef={field.ref} value={currentAnswers?.length && currentAnswers[0]} onChange={() => { setCurrent(currentAnswers?.length && currentAnswers[0]) }}
                                            />
                                            <label htmlFor="f5" className="ml-1 mr-3">
                                                {currentAnswers?.length && currentAnswers[0]}
                                            </label>

                                            <RadioButton inputId="f6" {...field} inputRef={field.ref} value={currentAnswers?.length && currentAnswers[1]} onChange={() => { setCurrent(currentAnswers?.length && currentAnswers[1]) }} />
                                            <label htmlFor="f6" className="ml-1 mr-3">
                                                {currentAnswers?.length && currentAnswers[1]}
                                            </label>

                                            <RadioButton inputId="f7" {...field} inputRef={field.ref} value={currentAnswers?.length && currentAnswers[2]} onChange={() => setCurrent(currentAnswers?.length && currentAnswers[2])} />
                                            <label htmlFor="f7" className="ml-1 mr-3">
                                                {currentAnswers?.length && currentAnswers[2]}
                                            </label>
                                            <RadioButton inputId="f8" {...field} inputRef={field.ref} value={currentAnswers?.length && currentAnswers[3]} onChange={() => { console.log("הקליקו עלי"); setCurrent(currentAnswers?.length && currentAnswers[3]) }} />
                                            <label htmlFor="f8" className="ml-1 mr-3">
                                                {currentAnswers?.length && currentAnswers[3]}
                                            </label>
                                        </div>
                                    </div>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                    </form>
                </Card>
                {showMark && <ShowMark mistake={mistake} unMistake={unMistake} lesson={idLess} />}
            </div></>
    )
}
export default QuestionList




