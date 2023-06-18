import React, { createContext, useEffect, useState, useReducer } from 'react'
import axios from './axios.js'
import { Loading } from '../components/MatxLoading'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}
const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = accessToken
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'SIGNIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'SIGNUP': {
            const { hasError, message } = action.payload

            return {
                ...state,
                isAuthenticated: false,
                message,
                hasError
            }
        }
        default: {
            return { ...state }
        }
    }
}

const UserContext = createContext({
    ...initialState,
    signIn: () => Promise.resolve(),
    logout: () => { },
    signUp: () => Promise.resolve(),
    recoverPassword: () => Promise.resolve(),
})

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const signIn = async (email, password) => {
        //Pendiente hacer.
        const response = await axios.post('/api/auth/login', {
            email,
            password,
        })
        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'SIGNIN',
            payload: {
                user,
            },
        })
    }

    const signUp = async (email, name, lastname, password) => {
        const response = await axios.post('/users', {
            email,
            name,
            lastname,
            password
        })

        const { hasError, message } = response.data

        //setSession(accessToken)

        dispatch({
            type: 'SIGNUP',
            payload: {
                hasError,
                message
            },
        })
    }

    const recoverPassword = async (email) => {
       
        console.log(email);

        const response = await axios.post('/users/recover-password', {
            email
        })

        
        console.log(response);

        const { hasError, message } = response.data

        dispatch({
            type: 'RECOVERPASSWORD',
            payload: {
                hasError,
                message
            },
        })
    }

    const logout = () => {
        //Pendiente hacer.
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axios.get('/api/auth/profile')
                    const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <Loading/>
    }

    return (
        <UserContext.Provider
            value={{
                ...state,
                signIn,
                signUp,
                recoverPassword
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
