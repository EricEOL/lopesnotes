import styled from "styled-components";
import { FaLinkedin } from 'react-icons/fa';
import { VscGithub } from 'react-icons/vsc';

export const SideInformations = () => {
  return (
    <SideInformationsContainer>
      <div>
        <strong>Anotações favoritas</strong>
        <span>Aqui vão estar sua anotações marcadas como favoritas</span>

        <FavoriteNoteCardVoid>
          <span className="textCardVoid">Por enquanto vazio...</span>
        </FavoriteNoteCardVoid>
        <FavoriteNoteCardVoid>
          <span className="textCardVoid">Por enquanto vazio...</span>
        </FavoriteNoteCardVoid>
      
      </div>
      <div>
        <strong>Minhas redes</strong>
        <span>Me adiciona lá! Será um grande prazer</span>
        <SocialNetwork href="https://www.linkedin.com/in/eric-oliveira-lopes/" target="_blank">
          <FaLinkedin size={30} />
          <span>Linkedin</span>
        </SocialNetwork>

        <SocialNetwork href="https://github.com/EricEOL" target="_blank">
          <VscGithub size={30} />
          <span>GitHub</span>
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

  div {
    display: flex;
    flex-direction: column;
    padding-bottom: 8px;

    &:last-child {
      margin-top: 40px;
    }

    strong {
      color: ${props => props.theme.font};
      font-size: 22px;
    }

    span {
      color: #333;
      font-size: 14px;
      font-weight: 600;
    }
  }
`

const SocialNetwork = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 15px;

  &:hover svg {
    color: ${props => props.theme.details};
  }

  &:hover span {
    color: ${props => props.theme.details};
  }

  span {
    margin-left: 10px;
    color: ${props => props.theme.fontDetails};
    transition: 0.2s;
  }

  svg {
    color: ${props => props.theme.fontDetails};
    transition: 0.2s;
  }
`

const FavoriteNoteCardVoid = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.header};
  border-radius: 4px;

  .textCardVoid {
    color: ${props => props.theme.font};
    font-style: italic;
  }
`