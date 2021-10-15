import '../styles/globals.css'
import { ThemeContextProvider } from '../contexts/Theme';
import { FavoriteNotesContextProvider } from '../contexts/FavoriteNotes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <FavoriteNotesContextProvider>
        <Component {...pageProps} />
      </FavoriteNotesContextProvider>
    </ThemeContextProvider>
  )
}

export default MyApp
