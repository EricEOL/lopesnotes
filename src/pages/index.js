import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';
import { Header } from "../components/Header";
import { BackgroundContainer } from "../components/BakcgroundContainer";
import styled from "styled-components";
import { SideInformations } from "../components/SideInformations";
import { posts } from '../database';

const ContentContainer = styled.main`
  display: flex;
  width: 100vw;
`
const PostsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 75%;
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
  border-bottom: 1px solid ${props => props.theme.details};

  strong {
    font-size: 68px;
    text-shadow: 2px 2px 4px ${props => props.theme.details},
                2px 2px 8px ${props => props.theme.background},
                2px 2px 16px ${props => props.theme.details};
    color: ${props => props.theme.font};
  }

  span {
    color: ${props => props.theme.fontDetails};
    text-shadow: 2px 2px 4px ${props => props.theme.background};
    font-size: 20px;
    font-style: italic;
  }
`

export default function Home({ prismicPosts }) {

  return (
    <BackgroundContainer>
      <Header />
      <ContentContainer>
        <PostsContainer>
          <PostPrincipal background={posts[0].image}>
            <strong>{prismicPosts[0].title}</strong>
            <span>Criado em: {prismicPosts[0].updatedAt}</span>
          </PostPrincipal>
        </PostsContainer>
        <SideInformations />
      </ContentContainer>
    </BackgroundContainer>
  )
}

export const getStaticProps = async (context) => {

  const prismic = await getPrismicClient();

  const response = await prismic.query(
    Prismic.Predicates.at('document.type', 'postblog'),
    { lang: '*' }
  );

  const posts = response.results.map(post => {
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

  console.log(posts);

  return {
    props: {
      prismicPosts: posts
    }
  }
}

