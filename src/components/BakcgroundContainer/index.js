import styled from "styled-components";

export const BackgroundContainer = ({ children, onWheel }) => {
  return (
    <Container id="page-container" onWheel={onWheel}>
      {children}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;

  background: ${props => props.theme.background};
`