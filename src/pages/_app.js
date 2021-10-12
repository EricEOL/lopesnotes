import '../styles/globals.css'
import { ThemeContextProvider } from '../contexts/Theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Component {...pageProps} />
    </ThemeContextProvider>
  )
}

export default MyApp
