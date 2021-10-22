import { createContext, useContext, useEffect, useState } from "react";

export const NotesContext = createContext();

export const NotesContextProvider = ({ children }) => {

  const [allNotes, setAllNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    fetch('https://lopesnotes.vercel.app/api/notes')
      .then(response => response.json())
      .then(notes => setAllNotes(notes));
  }, [])

  function filterNotes(title) {
    if (title !== '') {
      const filteredNotes = allNotes.filter(note => {
        if (note.title.toUpperCase().indexOf(title.toUpperCase()) >= 0) {
          return note;
        }
      });
      setFilteredNotes(filteredNotes);
    } else {
      setFilteredNotes([]);
    }
  }

  function resetFilter(){
    setFilteredNotes([]);
  }

  return (
    <NotesContext.Provider value={{ allNotes, filteredNotes, filterNotes, resetFilter }}>
      {children}
    </NotesContext.Provider>
  )
}

export const useNotesContext = () => {
  const { allNotes, filteredNotes, filterNotes, resetFilter } = useContext(NotesContext);

  return {
    allNotes,
    filteredNotes,
    filterNotes,
    resetFilter
  }
}