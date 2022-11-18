import Link from "next/link"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import * as Dialog from '@radix-ui/react-dialog';

import { ImMenu3 } from "react-icons/im"
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi"
import { withSSRAuth } from "../../utils/withSSRAuth"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { api } from "../../services/apiClient"
import ModalListEpisodes from "../../components/Modal/ModalListEpisodes";


interface AnimesProps {
    id: string,
    name: string,
    episodeTotal: number,
    image: string,
    favoriteAnimeUser: {
        id: string,
        user_id: string,
        anime_id: string
    }[],
    episodeAnime: {
        title: string
    }[]
}

function Anime() {
    const router = useRouter()
    const slug = (router.query.slug as string[]) || []

    const [open, setOpen] = useState(false)
    const [anime, setAnime] = useState<AnimesProps[]>([])

    const [name, number] = slug

    useEffect(() => {
        api.get("animes/list", {
            params: {
                name: name,
                episodes: true,
                number: Number(number)
            }
        })
            .then(response => setAnime(response.data))

            setOpen(false)
    }, [number])


    return (
        <div >
            <Header />

            <div className="w-10/12 mx-auto">
                <div className="flex gap-2 justify-center">
                    <h3 className="text-2xl text-[#1BA8DB]">{anime[0]?.episodeAnime[0]?.title} Ep. {number}</h3>

                </div>
                <div className="flex justify-center">
                    <iframe width="980" height="320" src="https://www.youtube.com/embed/iEBe8O2O50M" title="CASIMIRO ESTÁ FAZENDO UMA LISTA DE CONTRATAÇÕES PARA O VASCO EM 2023 | Cortes do Casimito" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="flex items-center gap-4 justify-around px-3">
                    <Link
                        href={`/anime/[...slug]`}
                        as={`/anime/${name}/${Number(number) == 1 ? 1 : Number(number) - 1}`}
                    >
                        <a className="flex items-center gap-1">
                            <FiArrowLeftCircle className="text-[#1BA8DB]" size={28} />
                            <span className="text-2xl">Anterior</span>
                        </a>
                    </Link>
                    <div>
                        <Dialog.Root open={open} onOpenChange={setOpen}>
                            <Dialog.Trigger>
                                <ImMenu3 className="text-[#1BA8DB]" size={32} />
                            </Dialog.Trigger>

                            <ModalListEpisodes setOpen={setOpen} name={name} />
                        </Dialog.Root>
                    </div>
                    <Link
                        href={`/anime/[...slug]`}
                        as={`/anime/${name}/${Number(number) == anime[0]?.episodeTotal ? number : Number(number) + 1}`}
                    >
                        <a className="flex items-center gap-1">
                            <span className="text-2xl">Proximo</span>
                            <FiArrowRightCircle className="text-[#1BA8DB]" size={28} />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Anime

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})