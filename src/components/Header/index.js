import styled from "styled-components";
import { Logo } from "../Logo";

export const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Logo />
      </HeaderContainer>
      <HeaderDetail />
    </>
  )
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.header};
  
  width: 100vw;
  height: 70px;
  padding: 8px;
`

const HeaderDetail = styled.div`
  margin: 0 auto;
  width: 20px;
  height: 20px;
  background: ${props => props.theme.header};
  transform: rotate(45deg);
  margin-top: -10px;
`

