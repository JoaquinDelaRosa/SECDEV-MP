import axios from "axios";
const Cookies = require('js-cookie')

const DEPLOYMENT_BASE_URL = 'https://autoworks-api.up.railway.app/'
const DEVELOPMENT_BASE_URL = "https://localhost:3000/"

export const BASE_URL = DEVELOPMENT_BASE_URL

export const createAPIEndpoint = (endpoint : string) => {
    axios.defaults.withCredentials = true
    let url = BASE_URL + 'api/' + endpoint ;

    let token = Cookies.get("jwtacc")
    console.log(token)

    return {
        fetch: (params?: any, headers:any = 
            {'Content-Type': 'application/json'
        }) => axios.get(url, {"headers" : {...headers , Authorization: `Bearer ${token}`}, "params": params}),

        post: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.post(url, data, { "headers" : {...headers, Authorization: `Bearer ${token}`, }, "params": params }),

        upload: (data: any, params? : any, headers: any = {
            'Content-Type': 'multipart/form-data'
        }) => axios.postForm(url, data, {"headers" : {...headers, Authorization: `Bearer ${token}`, }, "params": params }),

        patch: (data: any, params?: any, headers: any = {
            'Content-Type': 'application/json'
        }) => axios.patch(url, data, {"headers": {...headers, Authorization: `Bearer ${token}`}, "params" : params}),

        delete: (params?: any, headers?: any) => axios.delete(url, {"headers": {...headers, Authorization: `Bearer ${token}`}, "params" : params})
    }
}