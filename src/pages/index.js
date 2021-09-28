import { Header } from "../components/Header";
import { BackgroundContainer } from "../components/BakcgroundContainer";
import styled from "styled-components";
import { SideInformations } from "../components/SideInformations";

export default function Home() {
  return (
      <BackgroundContainer>
        <Header />
        <ContentContainer>
          <PostsContainer>

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
  flex-direction: column;
  width: 75%;
`


