import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { parseCookies } from "nookies"

export function withSSRGuest(fn: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {
        const cookies = parseCookies(ctx)
        if (cookies['animex.token']) {
            return {
                redirect: {
                    destination: '/Home',
                    permanent: false
                }
            }
        }
        return await fn(ctx)
    }
}