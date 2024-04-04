
import React, { useState } from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
// import { useGetLessonByLevelQuery } from './lessonApiSlice';

export default function ChooseByLevel() {
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const navigate=useNavigate()
    
    // const[level,setLevel]=useState("")

    // const {
    //     data: lessons,
    //     isLoading,
    //     isError,
    //     error
    // } = useGetLessonByLevelQuery(level)

    // if (isLoading) return <h1>Loading</h1>
    // if (isError) return <h2>{error}</h2>
    // // if (lessons) return <h2></h2>
    // console.log(lessons);
   

    const footerL1 = (
        <>
            <Button label="Let's start" onClick={() =>{navigate("/user/lessonByLevel/level 1",{ replace: false })}} />
        </>
    );
    const footerL2 = (
        <>
            <Button label="Let's start"  onClick={()=>{navigate("/user/lessonByLevel/level 2",{ replace: false })}}/>
        </>
    );
    const footerL3 = (
        <>
            <Button label="Let's start"  onClick={()=>navigate("/user/lessonByLevel/level 3",{ replace: false })}/>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card title="Level 1" subTitle="Easy" footer={footerL1} header={header} className="md:w-25rem">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
            <Card title="Level 2" subTitle="Medium" footer={footerL2} header={header} className="md:w-25rem">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
            <Card title="Level 3" subTitle="Hard" footer={footerL3} header={header} className="md:w-25rem">
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>
        </div>
    )
}
        