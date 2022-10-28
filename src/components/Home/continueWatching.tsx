import Image from "next/image"

import { FaPlay } from "react-icons/fa"

import ImgSukuna from "../../assets/Imagem.png"


function ContinueWatching() {
    return (
        <>
            <div className="flex items-center relative bottom-12">
                    <Image src={ImgSukuna} width={1000} height={1000}/> 
                </div>
                <div className="right-48 mt-4 flex flex-col gap-4 w-[1400px]">
                    <div className="bg-[#754672] w-[320px] flex items-center rounded-t-2xl">
                        <p className="text-3xl flex-1 ml-2">Continue Assistindo</p>
                        <div className="bg-[#C4C4C4] p-3 rounded-tr-2xl">
                            <FaPlay className="text-[#1ABDF2]" size={18} />
                        </div>
                    </div>
                        <h2 className="text-6xl">Jujutsu Kaisen</h2>   
                    <div>
                        <h3 className="text-[#1ABDF2] text-3xl">Episódio 3</h3>
                        <span className="text-gray-400">24 Episódios</span>
                    </div>
                
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In fuga sint animi temporibus. Illum consectetur quisquam explicabo architecto mollitia corporis dolore dolor quas! Quas ipsa sit nihil earum non recusandae.
                    </p>
                </div>
        </>
    )
}

export default ContinueWatching