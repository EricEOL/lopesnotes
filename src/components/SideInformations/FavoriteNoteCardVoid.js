import styled from "styled-components";

export const FavoriteNoteCardVoid = () => {

  return (
    <CardContainer>
      <span className="textCardVoid">Por enquanto nenhuma...😢</span>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.header};
  border-radius: 4px;

  .textCardVoid {
    color: ${props => props.theme.font};
    font-size: 12px;
  }
`