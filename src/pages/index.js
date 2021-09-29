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
            <span>{posts[0].subtitle}</span>
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


