import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthAction";
export const login = async(user,dispatch)=>{
    dispatch(loginStart());
    try {
        const res = await axios.post('auth/login',user);
        res.data.info.isAdmin && dispatch(loginSuccess(res.data));
        window.location.reload(1)
    } catch (error) {
        dispatch(loginFailure());
        window.location.reload(1)
    }
}