import styled from "styled-components";
import Link from 'next/link';

export const PostCard = ({ title, image, background, date, href }) => {

  return (
    <PostCardContainer background={background}>
      <div className="postTitle">
        <strong>{title}</strong>
        <div>
          <span>{date}</span>
          <Link href={href}>Ler agora</Link>
        </div>
      </div>
    </PostCardContainer>
  )
}

const PostCardContainer = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: end;

  width: 30%;
  height: 80%;
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 4px;

  .postTitle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 50%;
    padding: 10px;
    background: ${props => props.theme.boxPost};

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

  @media(max-width: 768px) {
    width: 95%;
    height: 180px;
    margin-bottom: 10px;

    img {
      height: 100px;
    }

    .postTitle {
      font-size: 12px;

      div{
        span {
          font-size: 10px;
        }

        a {
          font-size: 8px;
          padding: 6px;
        }
      }
    }
  }
`