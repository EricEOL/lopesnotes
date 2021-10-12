import Link from 'next/link';
import styled from "styled-components"

export const Logo = () => {
  return (
    <Link href="/">
      <LogoContainer>
        <span>LOPES</span>
        <strong>NOTES</strong>
      </LogoContainer>
    </Link>
  )
}

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;

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