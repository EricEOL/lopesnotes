import styled from "styled-components"

export const BackgroundContainer = ({ children }) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  min-height: 100vh;

  background: ${props => props.theme.background};
`