import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Toast } from "primereact/toast";
import { useDeleteWordMutation } from "./wordApiSlice";
import { useEffect, useRef } from "react";

const DeleteWord=({_id})=>{
    console.log(_id)
    const toast = useRef(null);
    const [deleteWord, { isError, isSuccess, error }] = useDeleteWordMutation()

    useEffect(() => {
        if (isSuccess) {
            
            toast.current.show({ severity: 'success', summary: 'Success', detail: `You have deleted ` });
        }
    }, [isSuccess])
    const accept = () => {
        //  toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have deleted' });
        deleteWord(_id)
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,
        });


    };

    return (
        <>
            <Toast ref={toast} />
            <ConfirmPopup />
            <Button onClick={confirm} icon="pi pi-trash" rounded aria-label="Bookmark"></Button>
        </>
    )
}
export default DeleteWord