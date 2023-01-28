import Router from "next/router"
import { parseCookies, setCookie, destroyCookie } from "nookies"
import { createContext, useEffect, useState } from "react"
import { api } from "../services/apiClient"


interface AnimesProps {
    id: string,
    name: string,
    episodeTotal: number,
    image: string,
    favoriteAnimeUser: {
        id: string,
        user_id: string,
        anime_id: string
    }[]
}

interface SearchAnime {
    recents?: boolean,
    episodes?: boolean,
    name?: string,
    numberEpisode?: number
}


type SignInCredentials = {
    username: string,
    password: string
}

type AuthContextData = {
    signIn(credentials: SignInCredentials): Promise<void>,
    favoriteAnime(anime_id: string): Promise<void>,
    animesB({ episodes, name, numberEpisode, recents }: SearchAnime): Promise<void>
    animes: AnimesProps[],
    isAuthenticated: boolean,
    user: User | undefined
}

type User = {
    name: string,
    idUser: string
}

type AuthProviderProps = {
    children: React.ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    destroyCookie(undefined, "animex.token")
    destroyCookie(undefined, "animex.refresh-token")

    Router.push("/")
}

export function AuthProvaider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>()
    const [animes, setAnimes] = useState<AnimesProps[]>([])

    const isAuthenticated = !!user

    useEffect(() => {
        const { 'animex.token': token } = parseCookies()
        const { 'animex.refresh-token': refresh_token } = parseCookies()

        if (token) {
            api.get('/me').then(response => {
                const { id, name } = response.data
                setUser({ idUser: id, name })
            })
                .catch(() => {
                    signOut()
                })
        }
    }, [])


    async function signIn({ username, password }: SignInCredentials) {

        try {
            await api.post('sessions', {
                username,
                password
            }).then(response => {
                const { token, refresh_token } = response.data
                const { name, idUser } = response.data.user


                setCookie(undefined, 'animex.token', token, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                })

                setCookie(undefined, 'animex.refresh-token', refresh_token, {
                    maxAge: 60 * 60 * 24 * 30,
                    path: '/'
                })

                setUser({
                    idUser,
                    name
                })

                api.defaults.headers['Authorization'] = `Bearer ${token}`

                alert("Sucesso!")

                Router.push("/Home")
            }).catch((err) => {
                if (err.response.data.message == "Username or password incorrect!") {
                    return alert("User ou senha inválidos")
                }

            })

        } catch (error) {
            console.log(error)
        }
    }

    async function favoriteAnime(anime_id: string) {
        await api.post("animes/favorite", {
            anime_id
        })

        //animesB()
    }

    async function animesB({ episodes, name, numberEpisode, recents }: SearchAnime) {
        const response = await api.get("animes/list", {
            params: {
                recents: recents,
                name: name,
                number: numberEpisode
            }
        })

        const anime = response.data

        setAnimes(anime)

    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user, favoriteAnime, animesB, animes }} >
            {children}
        </AuthContext.Provider>
    )
}