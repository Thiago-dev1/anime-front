import Link from "next/link"
import { useRouter } from "next/router"
import Header from "../../components/Header"

import { ImMenu3 } from "react-icons/im"
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi"


function Anime() {
    const router = useRouter()
    const slug = (router.query.slug as string[]) || []

    const [name, number] = slug


    return (
        <div >
            <Header />

            <div className="w-10/12 mx-auto">
                <div className="flex gap-2 justify-center">
                    <h3 className="text-2xl text-[#1BA8DB]">{name} Ep. {number}</h3>
                    
                </div>
                <div className="flex justify-center">
                    <iframe width="1280" height="720" src="https://www.youtube.com/embed/iEBe8O2O50M" title="CASIMIRO ESTÁ FAZENDO UMA LISTA DE CONTRATAÇÕES PARA O VASCO EM 2023 | Cortes do Casimito" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="flex items-center gap-4 justify-around px-3">
                    <Link
                        href={`/anime/[...slug]`}
                        as={`/anime/${name}/${ Number(number) == 1 ? 1 :Number(number) - 1}`}
                    >
                        <a className="flex items-center gap-1">
                            <FiArrowLeftCircle className="text-[#1BA8DB]" size={28}/>
                            <span className="text-2xl">Anterior</span>
                        </a>
                    </Link>
                    <div>
                            <ImMenu3 className="text-[#1BA8DB]" size={32}/>
                    </div>
                    <Link
                        href={`/anime/[...slug]`}
                        as={`/anime/${name}/${Number(number) + 1}`}
                    >
                        <a className="flex items-center gap-1">
                            <span className="text-2xl">Proximo</span>
                            <FiArrowRightCircle className="text-[#1BA8DB]" size={28}/>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Anime