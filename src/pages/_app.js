import Head from 'next/head';
import '../styles/globals.css'
import { ThemeContextProvider } from '../contexts/Theme';
import { FavoriteNotesContextProvider } from '../contexts/FavoriteNotes';
import { NotesContextProvider } from '../contexts/Notes';

function MyApp({ Component, pageProps }) {
  return (
      <ThemeContextProvider>
        <NotesContextProvider>
          <FavoriteNotesContextProvider>
            <Component {...pageProps} />
          </FavoriteNotesContextProvider>
        </NotesContextProvider>
      </ThemeContextProvider>
  )
}

export default MyApp
