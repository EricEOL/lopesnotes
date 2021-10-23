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
  height: 250px;
  background-image: url(${props => props.background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 1px solid ${props => props.theme.details};
  box-shadow: 2px 2px 2px ${props => props.theme.border};
  transition: 0.2s;

  &:hover {
    box-shadow: 0 4px 8px ${props => props.theme.details};
  }

  .postTitle {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 50%;
    padding: 10px;
    background: ${props => props.theme.boxPost};
    text-shadow: 2px 2px 2px ${props => props.theme.border};

    strong {
      color: ${props => props.theme.fontCardPost};
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      span {
        font-size: 12px;
        color: ${props => props.theme.fontCardPost};
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
        text-shadow: none;

        &:hover {
          background-color: ${props => props.theme.background};
          color: ${props => props.theme.details};
        }
      }
    }
  }

  @media(max-width: 1023px) {
    width: 95%;
    height: 250px;
    margin-bottom: 10px;
    padding: 8px;
    box-shadow: 2px 2px 2px ${props => props.theme.border};

    img {
      height: 100px;
    }

    .postTitle {
      font-size: 14px;

      div{
        span {
          font-size: 10px;
        }

        a {
          font-size: 10px;
          padding: 6px;
        }
      }
    }
  }
  
  @media screen and (min-width: 1024px) and (max-width: 1280px) {
    height: 250px;
    margin-bottom: 10px;
    padding: 8px;
    box-shadow: 2px 2px 2px ${props => props.theme.border};

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