import { createContext, useContext, useEffect, useState } from 'react';

export const FavoriteNotesContext = createContext();

export const FavoriteNotesContextProvider = ({ children }) => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const notesStoraged = localStorage.getItem('@lopesnotes_favoriteNotes');
    if (notesStoraged) setNotes(JSON.parse(notesStoraged));
  }, [])

  function addFavoriteNote(id, title, imageUrl) {
    
    const note = {
      id,
      title,
      imageUrl
    }
    
    localStorage.setItem('@lopesnotes_favoriteNotes', JSON.stringify([...notes, note]));
    setNotes([note, ...notes]);
  }

  function removeFavoriteNote(id) {
    const newFavoriteNotes = notes.filter(note => note.id !== id);
    localStorage.setItem('@lopesnotes_favoriteNotes', JSON.stringify(newFavoriteNotes));
    setNotes(newFavoriteNotes);
  }

  return (
    <FavoriteNotesContext.Provider value={{ notes, addFavoriteNote, removeFavoriteNote }} >
      {children}
    </FavoriteNotesContext.Provider >
  )
}

export const useFavoriteNotesContext = () => {
  const { notes, addFavoriteNote, removeFavoriteNote } = useContext(FavoriteNotesContext);

  return {
    notes,
    addFavoriteNote,
    removeFavoriteNote
  }
}