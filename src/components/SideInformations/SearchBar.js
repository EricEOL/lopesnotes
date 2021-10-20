import { useContext, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import { useNotesContext } from '../../contexts/Notes';
import { FilteredNotes } from './FilteredNotes';

const Container = styled.div`
  position: relative;
  width: 100%;
`

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: ${props => props.theme.header};
  ${props => props.focus ? `border-radius: 25px 25px 0 0` : `border-radius: 50px`};
  margin-bottom: 40px;
  transition: 0.2s;

  input {
    height: 40px;
    width: 80%;
    margin-left: 20px;
    outline: none;
    border: none;
    font-size: 14px;
    color: ${props => props.theme.font};
    background: ${props => props.theme.header};
    caret-color: ${props => props.theme.details};

    &::-webkit-input-placeholder {
      color: ${props => props.theme.fontDetails};
    }
    &::-moz-placeholder {
      color: ${props => props.theme.fontDetails};
    }

    @media screen and (min-width: 769px) and (max-width: 1024px) {
      font-size: 10px;
    }
  }
`
const SearchIcon = styled.div`
    ${props => props.focus ? `color: ${props.theme.details}` : `color: ${props.theme.font}`};
    margin-right: 5px;
    border-radius: 50%;
    background: ${props => props.theme.background};
    padding: 10px;
    width: 40px;
    height: 40px;
    transition: 0.2s;

    svg {
      width: 20px;
      height: 20px;
    }
`

export const SearchBar = ({ onChange, filteredNotes }) => {

  const { resetFilter } = useNotesContext();
  const [inputFocus, setInputFocus] = useState(false);

  function focusOut() {
    setTimeout(() => {
      setInputFocus(false);
      resetFilter();
    }, 150)
  }

  return (
    <Container>
      <SearchBarContainer focus={inputFocus && (filteredNotes.length > 0)}>
        <input
          type="text"
          name="search-note"
          placeholder="Qual anotação você procura ?"
          onFocus={() => setInputFocus(true)}
          onBlur={() => {
            focusOut();
          }}
          onChange={(event) => onChange(event.target.value)}
        />
        <SearchIcon focus={inputFocus}><FiSearch /></SearchIcon>
      </SearchBarContainer>
      {filteredNotes.length > 0 ? <FilteredNotes notes={filteredNotes} /> : ''}
    </Container>
  )
}