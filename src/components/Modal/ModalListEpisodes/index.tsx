import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from '../../../services/apiClient';


interface ModalListEpisodesProps {
    name: string,
    setOpen: Dispatch<SetStateAction<boolean>>
}

interface AnimesProps {
    id: string,
    name: string,
    episodeTotal: number,
    episodeAnime: {
        title: string,
        number: number
    }[]
}

function ModalListEpisodes({ name, setOpen }: ModalListEpisodesProps) {
    const [anime, setAnime] = useState<AnimesProps[]>([])

    useEffect(() => {
        api.get("animes/list", {
            params: {
                name: name,
                episodes: true,
            }
        })
            .then(response => setAnime(response.data))
    }, [name !== undefined])
    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#18102E] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded w-[480px] shadow-lg shadow-black/25'>
                {anime.map(a => a.episodeAnime.map(item => {
                    return (
                        <Link href={`/anime/[...slug]`}
                            as={`/anime/${name}/${item.number}`}
                        >
                            <a>
                                <p className="text-xl font-bold">{item.title} ep. {item.number}</p>
                            </a>

                        </Link>
                    )
                }))}
                <Dialog.Close
                    className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
                >
                    fechar
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default ModalListEpisodes