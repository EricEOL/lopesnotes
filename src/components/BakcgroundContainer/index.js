import styled from "styled-components"

export const BackgroundContainer = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;

  background: ${props => props.theme.background};
`