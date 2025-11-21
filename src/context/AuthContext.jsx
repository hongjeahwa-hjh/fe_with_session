import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

function AuthProvider({children})  {
    const [user, setUser] = useState(null);

    useEffect( () => {
        // 처리할 함수
        checkSession();
    }, []);     // 이벤트를 빈배열로 두면 Authprovider가 처름 실행될때 이벤트가 발생함

    const checkSession = async () => {
        try {
            const response = await axios.get(
                "/api/user/session",
                {
                    withCredentials: true,
                }
            );

            if(response.data.status === "success") {
                if(response.data.data)
                    setUser(response.data.data);
                else
                    setUser(null);
            } else {
                setUser(null);
            }
        } catch(error){
            console.log(error);
            setUser(null);
        }
    }


    function login(userInfo) {
        setUser(userInfo);
    }

    async function logout(){
        try{
            const response = await axios.post(
                "/api/user/logout",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if(response.data && response.data.status === "success"){
                setUser(null);
            }
            else{
                setUser(null);
            }
        } catch (error) {
            console.log(error.response);
        }
    }   // logout

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;
