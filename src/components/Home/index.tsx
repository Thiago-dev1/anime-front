import Image from "next/image"
import Header from "../../components/Header"

import { BiTimeFive } from "react-icons/bi"

import ContinueWatching from "../../components/Home/continueWatching"
import CardContent from "../CardContent"
import { useContext, useEffect, useState } from "react"
import { api } from "../../services/apiClient"
import { AuthContext } from "../../contexts/AuthContext"



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

function PageHome() {
    //const [animes, setAnimes] = useState<AnimesProps[]>([])

    const { user, animesB ,animes } = useContext(AuthContext)

    useEffect(() => {
        animesB({recents: true})
    }, [])

    return (
        <div className="h-screen">
            <Header />
            <div className="bg-gradient-to-r from-[#18102E]/60 via-[#41284C]/60 to-[#754672]/60 flex mt-28 mx-auto xl:w-[1200px] xl:h-[310px] rounded
               md:w-[980px] md:h-[310px] sm:w-[580px]
            ">
                <ContinueWatching />
            </div>

            <div className="mt-14 bg-gradient-to-r from-[#34265C]/60 via-[#754672]/60  to-[#34265C]/60 mx-auto xl:w-[1300px] rounded-b-md
               md:w-[980px] sm:w-[580px]">
                <div className="bg-[#170E2E] rounded-t-md p-4 flex items-center gap-4 border-2 border-[#513053]">
                    <BiTimeFive size={24} />
                    <h3 className="text-2xl font-bold">Últimos <span className="text-[#1BA8DB]">Animes</span> Adcionados</h3>
                </div>

                <div className="flex justify-around py-10">
                    {animes?.map(anime => {
                        return (
                            <CardContent anime_id={anime.id} user_id={anime.favoriteAnimeUser.filter(anime => anime.user_id === user?.idUser)} key={anime.id} img={anime.image} name={anime.name} totalEpisodes={anime.episodeTotal} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PageHome