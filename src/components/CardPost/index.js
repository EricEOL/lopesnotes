import styled from "styled-components";
import Link from 'next/link';

export const PostCard = ({ title, image, date }) => {

  return (
    <PostCardContainer>
      <img src={image} />
      <div className="postTitle">
        <strong>{title}</strong>
        <div>
          <span>{date}</span>
          <Link href="">Ler agora</Link>
        </div>
      </div>
    </PostCardContainer>
  )
}

const PostCardContainer = styled.div`
  width: 30%;
  height: 80%;
  background: ${props => props.theme.box};
  border-radius: 4px;

  img {
    width: 100%;
    height: 60%;
    border-radius: 4px 4px 0 0;
  }

  .postTitle {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40%;
    padding: 10px;

    strong {
      color: ${props => props.theme.font};
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      span {
        font-size: 12px;
        color: ${props => props.theme.fontDetails};
      }

      a {
        padding: 8px;
        color: ${props => props.theme.font};
        background: ${props => props.theme.details};
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 600;
        border-radius: 4px;
        transition: 0.2s;

        &:hover {
          background-color: ${props => props.theme.background};
          color: ${props => props.theme.details};
        }
      }
    }
  }
`