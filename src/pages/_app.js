import Head from 'next/head';
import '../styles/globals.css'
import { ThemeContextProvider } from '../contexts/Theme';
import { FavoriteNotesContextProvider } from '../contexts/FavoriteNotes';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Lopes [Notes]</title>

        <meta property="og:image" content="https://raw.githubusercontent.com/EricEOL/lopesnotes/main/readmeimages/logo.png" key="ogimage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lopesnotes.vercel.app/" />
        <meta property="og:title" content="Lopes [Notes]" key="ogtitle" />
        <meta property="og:description" content="Anotações de códigos" key="ogdesc" />

      </Head>

      <ThemeContextProvider>
        <FavoriteNotesContextProvider>
          <Component {...pageProps} />
        </FavoriteNotesContextProvider>
      </ThemeContextProvider>
    
    </>
  )
}

export default MyApp
