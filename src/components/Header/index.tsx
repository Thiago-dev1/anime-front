import Image from "next/image"
import { AiFillHome } from "react-icons/ai"
import { BsDisplayFill } from "react-icons/bs"

import Logo from "../../assets/AnimexLogo.png"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { useRouter } from "next/router"
import { FaThList } from "react-icons/fa"


function Header () {
    const router = useRouter();
    const { user } = useContext(AuthContext)

    return (
        <header className="flex bg-[#2B1F46] p-4 items-center justify-between">
            <Image src={Logo}/>
            <div className="flex gap-28">
                <a href="/Home" className={router.pathname == "/Home" ? "bg-[#18102E] p-3 rounded shadow shadow-blue-500" : "p-3 border-[1px] border-[#F484ED]/20 rounded hover:bg-[#18102E]/40 group"}>
                    <AiFillHome className={router.pathname == "/Home" ? "text-[#1ABDF2]" : "text-[#FFFFFF]/20 group-hover:text-[#1ABDF2]/60" } size={24}/>
                </a>
                <a href="/animes"  className={router.pathname == "/animes" ? "bg-[#18102E] p-3 rounded shadow shadow-blue-500" : "p-3 border-[1px] border-[#F484ED]/20 rounded hover:bg-[#18102E]/40 group"}>
                    <FaThList className={router.pathname == "/animes" ? "text-[#1ABDF2]" : "text-[#FFFFFF]/20 group-hover:text-[#1ABDF2]/60" } size={24}/>
                    </a>
                <a href="#" className="p-3 border-[1px] border-[#F484ED]/20 rounded hover:bg-[#18102E]/40 group"><BsDisplayFill className="text-[#FFFFFF]/20 group-hover:text-[#1ABDF2]/60" size={24}/></a>
            </div>

            <div>
                <span>{user?.name}</span>
            </div>
        </header>
    )
}

export default Header