import Prismic from '@prismicio/client';
import Link from 'next/link';
import { getPrismicClient } from '../services/prismic';
import { GoTriangleRight } from 'react-icons/go';
import { Header } from "../components/Header";
import { BackgroundContainer } from "../components/BakcgroundContainer";
import { PostCard } from '../components/CardPost';
import styled from "styled-components";
import { SideInformations } from "../components/SideInformations";

const ContentContainer = styled.main`
  display: flex;
  width: 100vw;

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
    margin-bottom: -10px;
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

  @media(max-width: 768px) {
    display: flex;
    flex-direction: column;
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
            <span>{prismicPosts[0].updatedAt}</span>
            <Link href={`/post/${prismicPosts[0].id}`}>{prismicPosts[0].title}</Link>
          </PostPrincipal>
          <div className="linkOtherPosts">
            <Link href="">Outras anotações</Link>
            <GoTriangleRight />
          </div>
          <PostsSecondary>
            {postsLenght > 0 ? (
              prismicPosts.map((post, index) => {
                if (index > postsLenght - 3 && index != (postsLenght - postsLenght)) {
                  return (
                    <PostCard title={post.title} image={post.image} date={post.updatedAt} href={`/post/${post.id}`} background={post.image}  key={post.id} />
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

  const postsDesc = response.results.sort((a, b) => new Date(b.last_publication_date) - new Date(a.last_publication_date));

  const posts = postsDesc.map(post => {
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
      prismicPosts: posts
    }
  }
}

