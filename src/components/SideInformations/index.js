import styled from "styled-components";
import { FaLinkedin } from 'react-icons/fa';
import { VscGithub } from 'react-icons/vsc';
import { FavoriteNoteCardVoid } from './FavoriteNoteCardVoid';
import { FavoriteNotesCard } from './FavoriteNotesCard';
import { useFavoriteNotesContext } from "../../contexts/FavoriteNotes";
import { SearchBar } from "./SearchBar";

export const SideInformations = ({ onChange, filteredNotes }) => {

  const { favoriteNotes, removeFavoriteNote } = useFavoriteNotesContext();

  return (
    <SideInformationsContainer>
      <section>
        <SearchBar onChange={onChange} filteredNotes={filteredNotes} />
        <strong>Anotações favoritas</strong>
        <hr />
        <span className="subtitle">Aqui estão suas anotações marcadas como favoritas</span>

        {favoriteNotes.length > 0
          ? favoriteNotes.map(note => <FavoriteNotesCard key={note.id} id={note.id} title={note.title} onClick={() => removeFavoriteNote(note.id)} />)
          : <FavoriteNoteCardVoid />
        }

      </section>
      <section>
        <strong>Minhas redes</strong>
        <hr />
        <span className="subtitle">Me adiciona lá! Será um grande prazer</span>
        <SocialNetwork href="https://www.linkedin.com/in/eric-oliveira-lopes/" target="_blank" rel="noreferrer">
          <FaLinkedin size={30} />
          <span>Linkedin</span>
        </SocialNetwork>

        <SocialNetwork href="https://github.com/EricEOL" target="_blank" rel="noreferrer">
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
    
    hr {
      width: 20%;
      margin-bottom: 5px;
      border: 2px solid ${props => props.theme.details};
      border-radius: 50px;
    }

    .subtitle {
      color: #333;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 15px;

      @media (max-width: 1024px) {
        font-size: 12px;
      }
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

