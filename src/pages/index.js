import { Header } from "../components/Header";
import { BackgroundContainer } from "../components/BakcgroundContainer";
import styled from "styled-components";
import { SideInformations } from "../components/SideInformations";
import { posts } from '../database';

export default function Home() {
  return (
    <BackgroundContainer>
      <Header />
      <ContentContainer>
        <PostsContainer>
          <PostPrincipal background={posts[0].image}>
            <strong>{posts[0].title}</strong>
          </PostPrincipal>
        </PostsContainer>
        <SideInformations />
      </ContentContainer>
    </BackgroundContainer>
  )
}

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
  width: 95%;
  height: 50vh;
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.4;
  margin-top: 15px;
`


