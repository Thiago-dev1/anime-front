import axios, {AxiosError} from "axios"
import { parseCookies, setCookie } from "nookies"

import { signOut } from '../contexts/AuthContext'


let isRefreshing = false
let failedRequestQueue: { onSuccess: (token: string) => void; onFailure: (err: AxiosError<unknown, any>) => void }[] = [] = [] 


export function setupApiClient(ctx = undefined) {
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['animex.token']}`
        }
    })

api.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    if (error.response?.status === 401 ) {
        console.log("aq")
        const message = error.response.data
        //@ts-ignore
        if (message?.message === "Token expired"){
            cookies = parseCookies(ctx)

            const {'animex.refresh-token': refresh_token} = cookies

            const originalConfig = error.config as any

            if (!isRefreshing) {
                isRefreshing = true

                api.post("/refresh-token", {
                    token: refresh_token
                }).then(response => {
                    
                    const  token  = response?.data.token
                    console.log(token)
                    console.log(response?.data.refresh_token)
                    
                    setCookie(undefined, 'animex.token', token, {
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/'
                    })
    
                    setCookie(undefined, 'animex.refresh-token', response?.data.refresh_token, {
                        maxAge: 60 * 60 * 24 * 30,
                        path: '/'
                    })
    
                    api.defaults.headers['Authorization'] = `Bearer ${token}`

                    failedRequestQueue.forEach(request => request.onSuccess(token))
                    failedRequestQueue = []
                }).catch(err => {
                    failedRequestQueue.forEach(request => request.onFailure(err))
                    failedRequestQueue = []
                }).finally(() => {
                    isRefreshing = false 

                })
            }

            return new Promise((resolve, reject) => {
                failedRequestQueue.push({
                    onSuccess: (token: string) => {
                        originalConfig.headers  = { Authorization: `Bearer ${token}` }

                        resolve(api(originalConfig))
                    },
                    onFailure: (err: AxiosError) => {
                        reject(err)
                    }
                })
            }) 

        } else {
            if (!(typeof window === "undefined")) {
                signOut()
            } else {
                return Promise.reject(new Error("Error with authentication token."))
            }
        }
    }
    return Promise.reject(error)
})
    return api
}