import axios from 'axios';
import { APIRootPath, templateId, serviceId, userID } from './configuration/config';
import emailjs, { init } from 'emailjs-com';
import {User} from "./configuration/models/users"
init(userID);

export type ApiClient = {
    getUser: (email: string, password: string) => Promise<User>;
    sendEmail: (agentName: string, clientName: string, clientEmail: string, message: string) => Promise<number>;
}

export const createApiClient = (): ApiClient => {
    return {
        getUser: async (email, password) => {
            const request = {
                params: {
                    email,
                    password
                }
            };
            
            return axios.get(`${APIRootPath}/users/getuser`, request)
                .then((res) => res.data)
                .catch(err => {
                    handelError(err);
                    throw new(err);
                });
        },
        sendEmail: (agentName: string, clientName: string, clientEmail: string, message: string) => {
            const params = {
                to_name: clientName,
                from_name: agentName,
                message: message,
                send_to: clientEmail,
            }

            return emailjs.send(serviceId, templateId, params)
                .then((result) => {
                    console.log("SENT EMAIL SUCCESS. status=%d, text=%s", result.status, result.text);
                    return 200;
                }, (error) => {
                    console.log("FAILED ", error.text);
                    return 400;
                });
        },
    }
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

export const api = createApiClient();
