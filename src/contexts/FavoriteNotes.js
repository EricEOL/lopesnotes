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

  return (
    <FavoriteNotesContext.Provider value={{ notes, addFavoriteNote }} >
      {children}
    </FavoriteNotesContext.Provider >
  )
}

export const useFavoriteNotesContext = () => {
  const { notes, addFavoriteNote } = useContext(FavoriteNotesContext);

  return {
    notes,
    addFavoriteNote
  }
}