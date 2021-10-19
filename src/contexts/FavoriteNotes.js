import { createContext, useContext, useEffect, useState } from 'react';

export const FavoriteNotesContext = createContext();

export const FavoriteNotesContextProvider = ({ children }) => {

  const [favoriteNotes, setFavoriteNotes] = useState([]);

  useEffect(() => {
    const notesStoraged = localStorage.getItem('@lopesnotes_favoriteNotes');
    if (notesStoraged) setFavoriteNotes(JSON.parse(notesStoraged));
  }, [])

  function addFavoriteNote(id, title, imageUrl) {
    
    const note = {
      id,
      title,
      imageUrl
    }
    
    localStorage.setItem('@lopesnotes_favoriteNotes', JSON.stringify([...favoriteNotes, note]));
    setFavoriteNotes([note, ...favoriteNotes]);
  }

  function removeFavoriteNote(id) {
    const newFavoriteNotes = favoriteNotes.filter(note => note.id !== id);
    localStorage.setItem('@lopesnotes_favoriteNotes', JSON.stringify(newFavoriteNotes));
    setFavoriteNotes(newFavoriteNotes);
  }

  return (
    <FavoriteNotesContext.Provider value={{ favoriteNotes, addFavoriteNote, removeFavoriteNote }} >
      {children}
    </FavoriteNotesContext.Provider >
  )
}

export const useFavoriteNotesContext = () => {
  const { favoriteNotes, addFavoriteNote, removeFavoriteNote } = useContext(FavoriteNotesContext);

  return {
    favoriteNotes,
    addFavoriteNote,
    removeFavoriteNote
  }
}