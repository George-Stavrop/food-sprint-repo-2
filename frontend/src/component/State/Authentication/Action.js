import axios from "axios";
import { api, API_URL } from "../../config/api";
import { GET_USER_REQUEST, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, GET_USER_SUCCESS, REGISTER_FAILURE, LOGIN_FAILURE, GET_USER_FAILURE } from "./ActionTypes";


export const registerUser = (reqData) => async (dispatch) => {

    dispatch({ type: REGISTER_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signup`, reqData.userData)

        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }

        dispatch({ type: REGISTER_SUCCESS, payload: data.jwt })

    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error })
        console.log("error");
    }
}


export const loginUser = (reqData) => async (dispatch) => {

    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData)

        if (data.jwt) localStorage.setItem("jwt", data.jwt);
        if (data.role === "ROLE_RESTAURANT_OWNER") {
            reqData.navigate("/admin/restaurant")
        }
        else {
            reqData.navigate("/")
        }

        dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });

    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error })
        console.log("error");
    }
}


export const getUser = (jwt) => async (dispatch) => {

    dispatch({ type: GET_USER_REQUEST })
    try {
        const { data } = await api.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })

        dispatch({ type: GET_USER_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: GET_USER_FAILURE, payload: error })
        console.log("error");
    }
}




export const logout = () => async (dispatch) => {

    dispatch({ type: LOGOUT })
    try {

        localStorage.clear();
        dispatch({ type: LOGOUT })

    } catch (error) {

        console.log("error");
    }
}


