import { RichText } from 'prismic-dom';
import styled from 'styled-components';
import { BackgroundContainer } from '../../components/BakcgroundContainer';
import { Header } from '../../components/Header';
import { SideInformations } from '../../components/SideInformations';
import { getPrismicClient } from '../../services/prismic'

const ContentContainer = styled.main`
  display: flex;
  width: 100vw;
  padding: 4px;
`

const PostContainer = styled.div`
  width: 75%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  margin-left: 4px;

  background: ${props => props.theme.boxPost};

  h2 {
    font-size: 42px;
    width: 60%;
    color: ${props => props.theme.font};
    margin-bottom: 30px;
  }
  
  div {
    color: ${props => props.theme.font};

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
  }
`

export default function Post({ post }) {
  return (
    <BackgroundContainer>
      <Header />
      <ContentContainer>
        <PostContainer >
          <h2>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
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
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    postimage: response.data.image.url
  }

  console.log(post);

  return {
    props: {
      post
    }
  }
}