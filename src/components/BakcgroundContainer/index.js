import styled from "styled-components";

export const BackgroundContainer = ({ children, onWheel, onTouchMove }) => {
  return (
    <Container id="page-container" onWheel={onWheel} onTouchMove={onTouchMove}>
      {children}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;

  background: ${props => props.theme.background};
`