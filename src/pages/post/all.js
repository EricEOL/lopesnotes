import styled from 'styled-components';
import { Header } from '../../components/Header';
import { BackgroundContainer } from '../../components/BakcgroundContainer';
import { SideInformations } from '../../components/SideInformations';
import { PostCard } from '../../components/CardPost';
import { useNotesContext } from '../../contexts/Notes';
import { useEffect, useState } from 'react';

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  @media(max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
`

const NotesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  padding: 20px;

  @media(max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`

export default function all() {
  const { allNotes, filterNotes, filteredNotes } = useNotesContext();
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    setNotes(allNotes);
  }, [allNotes])
  
  return (
    <BackgroundContainer>
      <Header />
      <ContentContainer>
        <NotesContainer>
          {notes.length >= 1 && notes.map((post, index) => (
            <PostCard title={post.title} image={post.image} date={post.updatedAt} href={`/post/${post.id}`} background={post.image} key={post.id} />
          ))}
        </NotesContainer>
        <SideInformations
          onChange={(event) => filterNotes(event)}
          filteredNotes={filteredNotes}
        />
      </ContentContainer>
    </BackgroundContainer>
  )
}