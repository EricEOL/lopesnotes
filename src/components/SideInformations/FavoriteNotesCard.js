import Link from 'next/link';
import styled from "styled-components";
import { FiXCircle } from 'react-icons/fi';

export const FavoriteNotesCard = ({ id, title, onClick }) => {

  return (
    <CardContainer>
      <Link href={`/post/${id}`}>
        <span className="textCard">{title}</span>
      </Link>
      <FiXCircle onClick={onClick}/>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  padding: 20px;
  
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.boxPost};
  border-radius: 4px;

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    padding: 10px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  svg {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 20px;
    height: 20px;
    color: ${props => props.theme.header};
    cursor: pointer;
  }

  .textCard {
    color: ${props => props.theme.font};
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    padding: 10px;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    .textCard {
      color: ${props => props.theme.font};
      font-size: 10px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`