import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai"
import { AuthContext } from "../../contexts/AuthContext"


interface CardProps {
    img: string,
    name: string,
    totalEpisodes: number,
    user_id?: any[],
    anime_id: string
}


function CardContent({ img, name, totalEpisodes, user_id, anime_id }: CardProps) {
    const router = useRouter();

    const { user, favoriteAnime } = useContext(AuthContext)
    const [status, setStatus] = useState(false)

    useEffect(() => {
        if (user_id?.length) {
            setStatus(true)
        }
    }, [user_id?.length])

    return (
        <div>
            <Link href={`/anime/[...slug]`}
            as={`/anime/${name}/1`}
            >
                <a>
                    <img className="rounded-2xl w-64 h-96 border-4 border-[#1ABDF2]" src={img} />
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-bold">{name}</p>
                        <span className="text-gray-500">{totalEpisodes} Episódios</span>
                    </div>
                </a>

            </Link>
            {router.pathname == "/Home" && (
                <div className="flex justify-center">
                    <button onClick={() => { favoriteAnime(anime_id); status === false ? setStatus(true) : setStatus(false) }} className="flex items-center gap-2 border-2 border-[#1ABDF2] p-1 px-3 rounded-lg">
                        {status === true ? <AiTwotoneStar className="text-[#1BA8DB]" size={28} /> : <AiOutlineStar className="text-[#1BA8DB]" size={28} />}

                        <p className="text-lg font-bold">FAVORITAR</p>
                    </button>
                </div>

            )}
        </div>
    )
}

export default CardContent