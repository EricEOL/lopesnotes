import Link from 'next/link';
import styled from "styled-components"
import { useNotesContext } from '../../contexts/Notes';

const NotesContainer = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  width: 100%;
  max-height: 200px;
  overflow: auto;
  top: 50px;
  background: ${props => props.theme.header};
  border-bottom: 2px solid ${props => props.theme.background};
  border-radius: 0 0 25px 25px;
  z-index: 1;

  li {
    border-bottom: 1px solid ${props => props.theme.details};
    width: 90%;
    padding: 10px;
    font-size: 12px;
    font-weight: 600;
    text-shadow: none;

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