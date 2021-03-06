import Head from 'next/head';
import Prismic from '@prismicio/client';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import { GoTriangleRight } from 'react-icons/go';
import { Header } from "../components/Header";
import { BackgroundContainer } from "../components/BakcgroundContainer";
import { PostCard } from '../components/CardPost';
import styled from "styled-components";
import { SideInformations } from "../components/SideInformations";
import { useNotesContext } from '../contexts/Notes';

const ContentContainer = styled.main`
  display: flex;
  width: 100%;

  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
const PostsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    width: 75%;
  }

  .linkOtherPosts {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 90%;
    margin-top: 20px;
    text-transform: uppercase;
    font-size: 12px;
    cursor: pointer;

    a {
      color: ${props => props.theme.font};
      font-weight: bold;
    }

    svg {
      width: 20px;
      height: 20px;
      color: ${props => props.theme.details};
    }

    @media(max-width: 768px) {
      margin-bottom: -10px;
    }
  }
`
const PostPrincipal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 95%;
  height: 50vh;
  padding: 16px;
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin-top: 15px;
  border-radius: 4px;
  border-style: solid;
  border: 2px solid ${props => props.theme.details};
  text-shadow: 2px 2px 2px ${props => props.theme.border};
  box-shadow: 2px 2px 2px ${props => props.theme.border};

  a {
    font-size: 68px;
    font-weight: 600;

    color: ${props => props.theme.fontCardPost};
  }

  span {
    color: ${props => props.theme.fontCardPost};
    font-size: 20px;
    font-style: italic;
  }

  @media(max-width: 768px) {
    height: 60vh;

    a {
      font-size: 30px;
    }

    span {
      font-size: 16px;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    height: 60vh;

    a {
      font-size: 35px;
    }

    span {
      font-size: 14px;
    }
  }

  @media screen and (min-width: 1025px) and (max-width: 1280px) {
    height: 60vh;

    a {
      font-size: 45px;
    }

    span {
      font-size: 14px;
    }
  }
`
const PostsSecondary = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 50%;
  margin-top: 30px;
  
  .no-annotations {
    background: ${props => props.theme.header};
    color: ${props => props.theme.font};
    font-size: 24px;
    padding: 24px;
    border-radius: 4px;
  }

  @media(max-width: 1023px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    margin-top: 0;
  }
`
export default function Home({ prismicNotes }) {

  const { filteredNotes, filterNotes } = useNotesContext();

  const postsLenght = prismicNotes.length - 1;

  return (
    <>
      <Head>
        <title>Lopes [Notes]</title>

        <meta property="og:image" content="https://raw.githubusercontent.com/EricEOL/lopesnotes/main/readmeimages/logo.png" key="ogimage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lopesnotes.vercel.app/" />
        <meta property="og:title" content="Lopes [Notes]" key="ogtitle" />
        <meta property="og:description" content="Anota????es de c??digos" key="ogdesc" />

      </Head>

      <BackgroundContainer>
        <Header />
        <ContentContainer>
          <PostsContainer>
            <PostPrincipal background={prismicNotes[0].image}>
              <span>{prismicNotes[0].updatedAt}</span>
              <Link href={`/post/${prismicNotes[0].id}`}>{prismicNotes[0].title}</Link>
            </PostPrincipal>
            <div className="linkOtherPosts">
              <Link href="/post/all">Outras anota????es</Link>
              <GoTriangleRight />
            </div>
            <PostsSecondary>
              {postsLenght > 0 ? (
                prismicNotes.map((post, index) => {
                  if (index > postsLenght - 3 && index != (postsLenght - postsLenght)) {
                    return (
                      <PostCard title={post.title} image={post.image} date={post.updatedAt} href={`/post/${post.id}`} background={post.image} key={post.id} />
                    )
                  }
                })
              ) : (
                <strong className="no-annotations">Ainda n??o tenho outras anota????es. S?? essa a?? de cima...????</strong>
              )}
            </PostsSecondary>
          </PostsContainer>
          <SideInformations
            onChange={(event) => filterNotes(event)}
            filteredNotes={filteredNotes}
          />
        </ContentContainer>
      </BackgroundContainer>
    </>
  )
}

export const getStaticProps = async (context) => {

  const prismic = await getPrismicClient();

  const response = await prismic.query(
    Prismic.Predicates.at('document.type', 'postblog'),
    { lang: '*' }
  );

  const notesDesc = response.results.sort((a, b) => new Date(b.last_publication_date) - new Date(a.last_publication_date));

  const notes = notesDesc.map(post => {
    return {
      id: post.uid,
      title: post.data.title[0].text,
      image: post.data.image.url,
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  });

  return {
    props: {
      prismicNotes: notes
    },
    revalidate: 60
  }
}

