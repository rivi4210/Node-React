import { Button } from "primereact/button"
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { useDispatch } from "react-redux";
import { removeToken } from "../../auth/authSlice";
import apiSlice from "../../../app/apiSlice";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
    const toast = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accept = () => {
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
    }
    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to log out from this site?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            accept,
        });
    };

    return (<>
        <Toast ref={toast} />
        <ConfirmPopup />
        <Button icon="pi pi-sign-out" label="יציאה" onClick={confirm}></Button>
    </>)
}
export default SignOut