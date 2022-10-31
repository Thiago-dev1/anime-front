import Router from "next/router"
import { useContext } from "react"
import PageHome from "../../components/Home"
import { AuthContext } from "../../contexts/AuthContext"
import { withSSRAuth } from "../../utils/withSSRAuth"


function Home() {

    return (
       <PageHome /> 
    )
    
    
}

export default Home


export const getServerSideProps = withSSRAuth(async (ctx) => {
    return {
      props: {}
    }
  })