import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "../services/errors/AuthTokenError"


export function withSSRAuth(fn: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        const cookies = parseCookies(ctx)
        if (!cookies['animex.token']) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        try {
            return await fn(ctx)
        } catch (error) {
            if (error instanceof AuthTokenError) {
                console.log(error)
                destroyCookie(ctx, 'animex.token')
                destroyCookie(ctx, 'animex.refresh-token')

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }
    }
}