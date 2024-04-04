import { useSelector } from "react-redux"
import { selectToken } from "./authSlice"
import {jwtDecode} from "jwt-decode"
const useAuth = () => {

    const token = useSelector(selectToken)
    let isAdmin = false
    let isUser = false
    if (token) {
        const userDecoded = jwtDecode(token)
        console.log("userDecoded", userDecoded);
        const { username, name,role, _id,email } = userDecoded
        isAdmin = role == "admin"
        isUser = role == "user"
        return { username,name, role,_id ,email}
    }
    return { username: "", isAdmin, isUser, fulname: "" }


}
export default useAuth