import Link from 'next/link';
import { RichText } from 'prismic-dom';
import styled from 'styled-components';
import { FaGithub, FaStar } from 'react-icons/fa';
import { BackgroundContainer } from '../../components/BakcgroundContainer';
import { Header } from '../../components/Header';
import { SideInformations } from '../../components/SideInformations';
import { getPrismicClient } from '../../services/prismic';

const ContentContainer = styled.main`
  display: flex;
  width: 100%;
  padding: 4px;
`

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const PostContent = styled.div`
  width: 90%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;

  background: ${props => props.theme.boxPost};
  
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

const PostHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 42px;
    width: 60%;
    color: ${props => props.theme.font};
    margin-bottom: 30px;
  }

  a {
    color: ${props => props.theme.details};
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }
`

export default function Post({ post }) {
  return (
    <BackgroundContainer>
      <Header />
      <ContentContainer>
        <PostContainer>
          <PostContent>
            <PostHeader>
              <h2>{post.title}</h2>
              <div>
                <a href={post.link} alt="Repositório no Github" target="_blank">
                  <FaGithub size={40} />
                </a>
                <a href={post.link} alt="Repositório no Github" target="_blank">
                  <FaStar size={40} />
                </a>
              </div>
            </PostHeader>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
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

  console.log(response);

  const post = {
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