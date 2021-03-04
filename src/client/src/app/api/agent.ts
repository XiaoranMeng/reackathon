import { Team } from './../models/team';
import axios, { AxiosResponse } from 'axios';

// Return a promise with the resolve function delayed by the specified duration
const delay = (duration: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    });
}

axios.defaults.baseURL = 'http://localhost:5000/api';

// A response interceptor that invokes the delay function 
axios.interceptors.response.use(async response => {
    try {
        await delay(500);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

// Maps axios response to response data
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

// Contains generically typed GET/POST/PUT/DELETE requests that return response data
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody)
};

// Contains functions that invoke axios requests for teams
const Teams = {
    list: () => requests.get<Team[]>('/teams'),
    details: (id: string) => requests.get<Team>(`/teams/${id}`),
    create: (team: Team) => requests.post<void>('/teams', team),
    update: (team: Team) => requests.put<void>(`/teams/${team.id}`, team),
    delete: (id: string) => requests.delete<void>(`/teams/${id}`)
};

const agent =  {
    Teams
};

export default agent;