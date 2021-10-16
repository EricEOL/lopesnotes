import { RichText } from 'prismic-dom';
import styled from 'styled-components';
import { FaGithub, FaStar } from 'react-icons/fa';
import { BackgroundContainer } from '../../components/BakcgroundContainer';
import { Header } from '../../components/Header';
import { SideInformations } from '../../components/SideInformations';
import { getPrismicClient } from '../../services/prismic';
import { useFavoriteNotesContext } from '../../contexts/FavoriteNotes';
import { useEffect, useState } from 'react';

const ContentContainer = styled.main`
  display: flex;
  width: 100%;
  padding: 4px;

  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`
const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
    }

    ol {
      margin-left: 30px;
    }

    @media (max-width: 768px) {

      p {
        font-size: 16px;
        line-height: 28px;
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
  }
`
const PostHeader = styled.header`
  position: relative;
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
      }


`

export default function Post({ post }) {

  const { addFavoriteNote, notes } = useFavoriteNotesContext();
  const [isFavoriteNote, setIsFavoriteNote] = useState(() => {
    return checkFavoriteNote(post.id);
  });

  useEffect(() => {
    setIsFavoriteNote(checkFavoriteNote(post.id))
  }, [notes]);

  function checkFavoriteNote(id) {
    const checkIsFavoriteNote = notes.some(note => note.id === id);
    return checkIsFavoriteNote;
  }

  return (
    <BackgroundContainer>
      <Header />
      <ContentContainer>
        <PostContainer>
          <PostContent>
            <PostHeader>
              <h2>{post.title}</h2>
              <div>
                <a href={post.link} alt="Repositório no Github" target="_blank" rel="noreferrer">
                  <Icon favorite={isFavoriteNote}>
                    <FaGithub  />
                  </Icon>
                </a>
                <a
                  alt="Favoritar essa Nota"
                  rel="noreferrer"
                  onClick={() => addFavoriteNote(post.id, post.title, post.postimage)}
                >
                  <Icon favorite={isFavoriteNote}>
                    <FaStar />
                  </Icon>
                </a>
              </div>
            </PostHeader>
            <div className="post" dangerouslySetInnerHTML={{ __html: post.content }} />
          </PostContent>
        </PostContainer>
        <SideInformations />
      </ContentContainer>
    </BackgroundContainer>
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