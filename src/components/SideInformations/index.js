import Image from 'next/image';
import styled from "styled-components";
import { RiLinkedinFill } from 'react-icons/ri';

export const SideInformations = () => {
  return (
    <SideInformationsContainer>
      <div>
        <strong>Anotações favoritas</strong>
        <Image src="/assets/void.svg" width={150} height={150} />
      </div>
      <div>
        <strong>Minhas redes</strong>
        <SocialNetwork>
          <RiLinkedinFill size={20} color="#a8a8b3" />
          <span>Linkedin</span>
        </SocialNetwork>
      </div>
    </SideInformationsContainer>
  )
}

const SideInformationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 85vh;
  border-left: 1px solid ${props => props.theme.border};
  padding: 16px;
  margin-top: 20px;

  strong {
    color: ${props => props.theme.font};
    font-size: 22px;
  }

  div {
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;

    &:last-child {
      margin-top: 40px;
    }

    strong {
      margin-bottom: 30px;
    }
  }
`

const SocialNetwork = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    color: ${props => props.theme.border};
    margin-left: 10px;
  }

  svg, span {
    &:hover {
      background-color: ${props => props.theme.details};
    }
  }
`