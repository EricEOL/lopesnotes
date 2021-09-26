import styled from "styled-components"

export const Logo = () => {
  return (
    <LogoContainer>
      <span>LOPES</span>
      <strong>NOTES</strong>
    </LogoContainer>
  )
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;

  span {
    color: ${props => props.theme.font};
    margin-right: 4px;
  }
  
  strong {
    color: ${props => props.theme.details};
    padding: 4px;
    border-radius: 8px;
    background: ${props => props.theme.background};
  }
`