import '../styles/globals.css'
import { ThemeProvider } from 'styled-components';
import { darkTheme } from '../styles/themes';
import { ThemeContextProvider } from '../contexts/Theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <Component {...pageProps} />
    </ThemeContextProvider>
  )
}

export default MyApp
