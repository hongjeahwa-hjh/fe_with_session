import {useContext} from "react";
import { AuthContext } from "../context/AuthContext.js";

function useAuth() {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("AuthProvider는 반드시 Authcontext가 필요합니다!!!")
    }
    return context;
}

export default useAuth;
