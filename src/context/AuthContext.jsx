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
    role: null,
};

const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_START:
            return { ...state, isLoading: true, error: null };

        case AUTH_ACTIONS.LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                role: action.payload.role,
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
                role: null,
            };

        case AUTH_ACTIONS.SET_USER:
            return {
                ...state,
                user: action.payload.user,
                role: action.payload.role || state.role,
                isLoading: false,
            };

        default:
            return state;
    }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const fetchUserData = async () => {
            if (state.token) {
                localStorage.setItem('userToken', state.token);
                try {
                    const response = await apiClient.get('/user/me', {
                        headers: { Authorization: `Bearer ${state.token}` },
                    });
                    const userData = response.data.user;
                    dispatch({
                        type: AUTH_ACTIONS.SET_USER,
                        payload: { user: userData, role: userData.role },
                    });
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    dispatch({ type: AUTH_ACTIONS.LOGOUT });
                }
            } else {
                localStorage.removeItem('userToken');
            }
        };

        fetchUserData();
    }, [state.token]);

    const logout = async (clearCartCallback = () => {}) => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        localStorage.removeItem('guestCart');

        try {
            await apiClient.post('/user/logout');
        } catch (error) {
            console.error('Logout error:', error);
        }

        if (clearCartCallback && typeof clearCartCallback === 'function') {
            clearCartCallback();
        }

        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    };

    const login = async (email, password) => {
        try {
            dispatch({ type: AUTH_ACTIONS.LOGIN_START });

            const response = await apiClient.post('/user/login', { email, password });
            const data = response.data;

            const userResponse = await apiClient.get('/user/me', {
                headers: { Authorization: `Bearer ${data.userToken}` },
            });

            const userData = userResponse.data.user;

            localStorage.setItem('userToken', data.userToken);

            dispatch({
                type: AUTH_ACTIONS.LOGIN_SUCCESS,
                payload: {
                    token: data.userToken,
                    user: userData,
                    role: userData.role,
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

    const register = async (userData) => {
        try {
            dispatch({ type: AUTH_ACTIONS.LOGIN_START });
            const response = await apiClient.post('/user/register', userData);
            const data = response.data;
            return { success: true, data };
        } catch (error) {
            const backendError =
                error.response?.data?.err_msg ||
                error.response?.data?.message ||
                error.message ||
                'Registration failed';

            dispatch({
                type: AUTH_ACTIONS.LOGIN_FAILURE,
                payload: { error: backendError },
            });

            return {
                success: false,
                error: backendError,
            };
        }
    };

    const setUser = (user) => {
        dispatch({
            type: AUTH_ACTIONS.SET_USER,
            payload: { user, role: user.role },
        });
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
