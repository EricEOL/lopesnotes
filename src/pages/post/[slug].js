import Head from 'next/head';
import { RichText } from 'prismic-dom';
import styled from 'styled-components';
import { FiChevronsUp } from 'react-icons/fi';
import { FaGithub, FaStar, FaWhatsappSquare, FaLinkedin } from 'react-icons/fa';
import { BackgroundContainer } from '../../components/BakcgroundContainer';
import { Header } from '../../components/Header';
import { SideInformations } from '../../components/SideInformations';
import { getPrismicClient } from '../../services/prismic';
import { useFavoriteNotesContext } from '../../contexts/FavoriteNotes';
import { useEffect, useState } from 'react';
import { useNotesContext } from '../../contexts/Notes';

const ContentContainer = styled.main`
  display: flex;
  width: 100%;
  padding: 4px;

  @media(max-width: 768px){
    display: flex;
    flex-direction: column;
  }
`
const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 60px;

  @media screen and (min-width: 769px) and (max-width: 1280px) {
    width: 75%;
  }

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`
const PostContent = styled.div`
  width: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;

  background: ${props => props.theme.boxPost};

  @media (max-width: 768px) {
    width: 100%;
  }
  
  .post {
    width: 100%;
    color: ${props => props.theme.font};

    p {
      font-size: 18px;
      line-height: 36px;
    }

    img {
      width: 70%;
      border: 1px solid ${props => props.theme.details};
    }

    p, ol, pre {
      margin: 20px 0 20px 0;
    }

    pre {
      display: flex;
      align-items: center;
      background-color: ${props => props.theme.box};
      width: 70%;
      min-height: 50px;
      border-radius: 4px;
      padding: 10px;
      overflow: auto;

      &::-webkit-scrollbar {
        height: 10px;
      }

      &::-webkit-scrollbar-thumb:active {
        background: rgb(68, 68, 68);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: rgb(100, 100, 100);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: rgb(100, 100, 100);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:active {
        background: rgb(68, 68, 68);
        border-radius: 10px;
      }
    }

    ol {
      margin-left: 30px;
    }

    @media (max-width: 768px) {

      p {
        font-size: 16px;
        line-height: 28px;
      }

      img {
        width: 100%;
      }

      pre {
        text-align: justify;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        font-size: 14px;
        padding: none;
        overflow: auto;
      }
    }

    @media screen and (min-width: 769px) and (max-width: 1024px) {
      p {
        font-size: 16px;
      }

      pre {
        overflow: auto;
        width: 100%;
      }
    }
  }
`
const PostHeader = styled.header`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 42px;
    width: 60%;
    color: ${props => props.theme.font};
    margin-bottom: 30px;
  }

  div {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    min-width: 120px;
    padding: 10px;
    border-radius: 4px;
    background-color: ${props => props.theme.background};
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 26px;
      width: 70%;
    }

    div {
      min-width: 80px;
    }
  }

  @media (max-width: 1024px) {
    h2 {
      font-size: 30px;
      width: 70%;
    }

    div {
      min-width: 80px;
    }
  }
`
const Icon = styled.span`
      ${props => props.favorite ? `color: ${props.theme.details};` : `color: ${props.theme.header};`};
      cursor: pointer;
      
      svg {
        width: 40px;
        height: 40px;
        transition: 0.2s;

        .favorite {
          
        }

        &:hover {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          width: 25px;
          height: 25px;
        }

        @media (max-width: 1024px) {
          width: 25px;
          height: 25px;
        }
      }


`
const GoTopButton = styled.a`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.details};
  border-radius: 8px;
  opacity: 0.7;
  cursor: pointer;
  text-decoration: none;

  svg {
    width: 30px;
    height: 30px;
    color: #333;
  }
`
const ShareNote = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50px;
  margin-bottom: 60px;

  strong {
    font-size: 18px;
    color: ${props => props.theme.details};
    margin-bottom: 10px;
  }

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    width: 120px;

    svg {
      width: 50px;
      height: 50px;

      color: ${props => props.theme.fontDetails};
      transition: 0.2s;

      &:hover {
        color: ${props => props.theme.details};
      }
    }
  }

`

export default function Post({ post }) {

  const { filterNotes, filteredNotes } = useNotesContext();
  const { addFavoriteNote, removeFavoriteNote, favoriteNotes } = useFavoriteNotesContext();
  const [isFavoriteNote, setIsFavoriteNote] = useState(() => {
    return checkFavoriteNote(post.id);
  });
  const [pageYPosition, setPageYPosition] = useState(0);
  const [pageUrl, setPageUrl] = useState('');

  useEffect(() => {
    setIsFavoriteNote(checkFavoriteNote(post.id))
    setPageUrl(window.location.href);
    window.addEventListener('scroll', getPageYAfterScroll);
  }, [favoriteNotes]);

  function checkFavoriteNote(id) {
    const checkIsFavoriteNote = favoriteNotes.some(note => note.id === id);
    return checkIsFavoriteNote;
  }

  function getPageYAfterScroll() {
    setPageYPosition(window.scrollY);
  }

  return (
    <>
      <Head>
        <title>{`Lopes [Notes] - ${post.title}`}</title>

        <meta property="og:image" content="https://raw.githubusercontent.com/EricEOL/lopesnotes/main/readmeimages/logo.png" key="ogimage" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Lopes [Notes]" key="ogtitle" />
        <meta property="og:description" content={post.title} key="ogdesc" />

      </Head>

      <BackgroundContainer >
        <Header />
        <ContentContainer>
          <PostContainer>
            <PostContent>
              <PostHeader>
                <h2 id="post-title">{post.title}</h2>
                <div>
                  <a href={post.link} alt="Repositório no Github" target="_blank" rel="noreferrer">
                    <Icon favorite={isFavoriteNote}>
                      <FaGithub />
                    </Icon>
                  </a>
                  <a
                    alt="Favoritar essa Nota"
                    rel="noreferrer"
                    onClick={() => {
                      if (isFavoriteNote) {
                        removeFavoriteNote(post.id);
                      } else {
                        addFavoriteNote(post.id, post.title, post.postimage);
                      }
                    }}
                  >
                    <Icon favorite={isFavoriteNote}>
                      <FaStar />
                    </Icon>
                  </a>
                </div>
              </PostHeader>
              <div className="post" dangerouslySetInnerHTML={{ __html: post.content }} />
              <ShareNote>
                <strong>Gostou? Compartilhe essa anotação!</strong>
                <ul>
                  <li>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`} target="_blank" rel="noreferrer">
                      <FaLinkedin />
                    </a>
                  </li>
                  <li>
                    <a href={`https://api.whatsapp.com/send?text=${pageUrl}`} data-action="share/whatsapp/share" target="_blank" rel="noreferrer">
                      <FaWhatsappSquare />
                    </a>
                  </li>
                </ul>
              </ShareNote>
            </PostContent>
          </PostContainer>
          <SideInformations
            onChange={(event) => filterNotes(event)}
            filteredNotes={filteredNotes}
          />
        </ContentContainer>
        {pageYPosition > 990 && <GoTopButton href="#page-container" onClick={() => setPageYPosition(0)}> <FiChevronsUp /> </GoTopButton>}
      </BackgroundContainer>
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('postblog', String(slug), {});

  const post = {
    id: response.uid,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    postimage: response.data.image.url,
    link: response.data.linkrepository.url
  }

  return {
    props: {
      post
    }
  }
}