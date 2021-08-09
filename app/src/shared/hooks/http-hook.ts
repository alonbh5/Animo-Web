import { useState, useCallback, useRef, useEffect } from 'react'
import axios, { AxiosRequestConfig } from 'axios';
export const serverAPIPort = 3000;
export const host = 'http://localhost'
export const APIRootPath = `${host}:${serverAPIPort}`
export const staticsPort = 3001;
export const staticsUrl = `${host}:${staticsPort}/`;


export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [success, setSuccess]=useState(undefined)
    // const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (params: AxiosRequestConfig) => {
        params.baseURL = `${APIRootPath}`;
        setIsLoading(true);

        try {
            const result = await axios.request(params);
            setSuccess(result.data.message);
            return result.data;
        } catch (error) {
            setError(error.response.data.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearMessages = () => {
        setError(undefined);
        setSuccess(undefined);
    };

    // useEffect(()=> {
    //     return () => {
    //         activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    //     };
    // }, [])

    return { isLoading: isLoading, error, success,sendRequest, clearMessages };
}


function handelError(error: any) {
    if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
    }
    console.log(error.config);
}
