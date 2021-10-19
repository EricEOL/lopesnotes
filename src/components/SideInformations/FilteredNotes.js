import Link from 'next/link';
import styled from "styled-components"
import { useNotesContext } from '../../contexts/Notes';

const NotesContainer = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
  width: 100%;
  top: 50px;
  background: ${props => props.theme.header};
  border-bottom: 2px solid ${props => props.theme.background};
  z-index: 1;

  li {
    border-bottom: 1px solid ${props => props.theme.details};
    width: 90%;
    padding: 10px;
    font-size: 12px;

    a {
      color: ${props => props.theme.font};
    }

    &:last-child {
      border-bottom: none;
    }
  }
`

export const FilteredNotes = ({ notes }) => {

  const { resetFilter } = useNotesContext();

  return (
    <NotesContainer>
      {notes.map(note => (
        <li key={note.id} onClick={resetFilter}>
          <Link href={`/post/${note.id}`}>
            {note.title}
          </Link>
        </li>
      ))
      }
    </NotesContainer >
  )
}