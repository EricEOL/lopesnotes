import Prismic from '@prismicio/client';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import { Header } from "../components/Header";
import { BackgroundContainer } from "../components/BakcgroundContainer";
import { PostCard } from '../components/CardPost';
import styled, { css } from "styled-components";
import { SideInformations } from "../components/SideInformations";

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
  border-radius: 4px;

  a {
    font-size: 68px;
    font-weight: 600;
    text-shadow:2px 2px 0 ${props => props.theme.background},
                2px 2px 4px ${props => props.theme.details},
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
`

export default function Home({ prismicPosts }) {

  const postsLenght = prismicPosts.length - 1;

  return (
    <BackgroundContainer>
      <Header />
      <ContentContainer>
        <PostsContainer>
          <PostPrincipal background={prismicPosts[0].image}>
            <Link href="">{prismicPosts[0].title}</Link>
            <span>Criado em: {prismicPosts[0].updatedAt}</span>
          </PostPrincipal>
          <PostsSecondary>
            {postsLenght > 0 ? (
              prismicPosts.map((post, index) => {
                if (index > postsLenght - 3 && index != (postsLenght - postsLenght)) {
                  return (
                    <PostCard title={post.title} image={post.image} />
                  )
                }
              })
            ) : (
              <strong className="no-annotations">Ainda não tenho outras anotações. Só essa aí de cima...😢</strong>
            )}
          </PostsSecondary>
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

