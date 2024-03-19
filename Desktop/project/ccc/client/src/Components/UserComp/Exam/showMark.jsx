import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useUpdateExamMutation } from "./examApiSlice";
// import { Avatar } from '@/components/lib/avatar/Avatar';

const ShowMark = ({ mistake, unMistake, lesson }) => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState(true);
    const [mark, setMark] = useState(0)

    const [updateExam, { isErrorAdd, isSuccessAdd, errorAdd }] = useUpdateExamMutation()
    console.log('lesson', lesson);

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">
            {/* <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> */}
            {/* <span className="font-bold white-space-nowrap">Amy Elsner</span> */}
        </div>
    );

    const footerContent = (
        <div>
            <Button label="Ok" icon="pi pi-check" onClick={() => { setVisible(false); navigate("/user/lesson"); updateExam({ mark: String((unMistake / (unMistake + mistake)) * 100), lesson })}} autoFocus />
        </div>
    );
    return (
        <div className="card flex justify-content-center">
            {console.log("im here ok??????????")}
            {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible(true)} /> */}
            <Dialog visible={visible} modal header=" :ציונך במבחן זה" footer={footerContent} style={{ width: '50rem' }} onHide={() => setVisible(false)}>
                <h3 className="m-0">
                    {
                        (unMistake / (unMistake + mistake)) * 100
                    }
                </h3>
            </Dialog>
        </div>
    )
}
export default ShowMark