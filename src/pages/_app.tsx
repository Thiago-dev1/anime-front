import type { AppProps } from 'next/app'
import { AuthProvaider } from '../contexts/AuthContext'

import "../styles/main.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvaider>
      <Component {...pageProps} />
    </AuthProvaider>
  )
}

export default MyApp
