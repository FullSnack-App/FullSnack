import { createContext, useReducer, useEffect } from 'react';
import apiClient from '../config/axiosConfig';

const AUTH_ACTIONS = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGOUT: 'LOGOUT',
    SET_USER: 'SET_USER',
};

const initialState = {
    user: null,
    token: localStorage.getItem('userToken') || null,
    isAuthenticated: !!localStorage.getItem('userToken'),
    isLoading: false,
    error: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };

        case AUTH_ACTIONS.LOGIN_FAILURE:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload.error,
            };

        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };

        case AUTH_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload.user,
            };

        default:
            return state;
    }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        if (state.token) {
            localStorage.setItem('userToken', state.token);
        } else {
            localStorage.removeItem('userToken');
        }
    }, [state.token]);

    const login = async (email, password) => {
        try {
            dispatch({ type: AUTH_ACTIONS.LOGIN_START });

            const response = await apiClient.post('/user/login', {
                email,
                password,
            });

            const data = response.data;

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: {
                    token: data.userToken,
                    user: data.user || { email },
                },
            });

            return { success: true, data };
        } catch (error) {
            const backendError =
                error.response?.data?.err_msg ||
                error.response?.data?.message ||
                error.message ||
                'Login failed';

            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: { error: backendError },
            });

            return { success: false, error: backendError };
        }
    };

    const logout = async (clearCartCallback) => {
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        localStorage.removeItem('guestCart'); // Clear guest cart on logout

        if (clearCartCallback && typeof clearCartCallback === 'function') {
            clearCartCallback();
        }
        await apiClient.post('/user/logout');
    };

    const register = async (userData) => {
        try {
            const response = await apiClient.post('/user/register', userData);
            const data = response.data;
            return { success: true, data };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || error.message };
        }
    };

    const setUser = (user) => {
        dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: { user },
        });
        localStorage.setItem('user', JSON.stringify(user));
    };

    const value = {
        ...state,
        login,
        logout,
        register,
        setUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
