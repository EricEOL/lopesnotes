import styled from "styled-components";
import { useThemeContext } from '../../../contexts/Theme';
import { BsSun, BsMoon } from 'react-icons/bs';

export const ButtonTheme = () => {

  const { isDarkTheme, setIsDarkTheme } = useThemeContext();

  function handleChangeTheme() {
    if (isDarkTheme === 'dark') return setIsDarkTheme('light');
    if (isDarkTheme === 'light') return setIsDarkTheme('dark');
  }

  return (
    <>
      {isDarkTheme === 'dark' ? (
        <Button
          onClick={handleChangeTheme}
        >
          <BsSun size={20} color="#fee181" />
        </Button>
      ) : (
        <Button
          onClick={handleChangeTheme}
        >
          <BsMoon size={20} color="#000000"/>
        </Button>
      )}
    </>
  )
}

const Button = styled.button`
  width: 40px;
  height: 40px;
  
  position: absolute;
  right: 8px;

  border: none;
  padding: 6px;
  border-radius: 50%;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.font};

  cursor: pointer;
`