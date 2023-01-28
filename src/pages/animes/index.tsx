import { useContext, useEffect } from "react";
import CardContent from "../../components/CardContent";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/AuthContext";
import { withSSRAuth } from "../../utils/withSSRAuth";

function Animes() {

    const { user, animesB ,animes } = useContext(AuthContext)

    useEffect(() => {
        animesB({})
    }, [])

    return (
        <div className="h-screen">
            <Header />
            <main>
                <div className="mt-14 bg-gradient-to-r from-[#34265C]/60 via-[#754672]/60  to-[#34265C]/60 mx-auto xl:w-[1300px] rounded-b-md
               md:w-[980px] sm:w-[580px] grid grid-cols-4">
                        {animes?.map(anime => {
                            return (
                                <CardContent anime_id={anime.id} user_id={anime.favoriteAnimeUser.filter(anime => anime.user_id === user?.idUser)} key={anime.id} img={anime.image} name={anime.name} totalEpisodes={anime.episodeTotal} />
                            )
                        })}
                </div>
            </main>
        </div>
    )
}

export default Animes

export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
      props: {}
    }
  })