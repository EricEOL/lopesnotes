import styled from "styled-components";
import { FaLinkedin } from 'react-icons/fa';
import { VscGithub } from 'react-icons/vsc';
import { FavoriteNoteCardVoid } from './FavoriteNoteCardVoid';

export const SideInformations = () => {
  return (
    <SideInformationsContainer>
      <section>
        <strong>Anotações favoritas</strong>
        <span className="subtitle">Aqui vão estar sua anotações marcadas como favoritas</span>
        
        <FavoriteNoteCardVoid />
        <FavoriteNoteCardVoid />

      </section>
      <section>
        <strong>Minhas redes</strong>
        <span className="subtitle">Me adiciona lá! Será um grande prazer</span>
        <SocialNetwork href="https://www.linkedin.com/in/eric-oliveira-lopes/" target="_blank">
          <FaLinkedin size={30} />
          <span>Linkedin</span>
        </SocialNetwork>

        <SocialNetwork href="https://github.com/EricEOL" target="_blank">
          <VscGithub size={30} />
          <span>GitHub</span>
        </SocialNetwork>
      </section>
    </SideInformationsContainer>
  )
}

const SideInformationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  min-height: 55vh;
  padding: 16px;
  margin-top: 20px;

  section {
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

    .subtitle {
      color: #333;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 15px;
    }
  }

  @media(max-width: 768px) {
    width: 100%;
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

