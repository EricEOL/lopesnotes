import styled from "styled-components";
import { useThemeContext } from '../../../contexts/Theme';

export const ButtonTheme = () => {

  const { isDarkTheme, setIsDarkTheme } = useThemeContext();

  function handleChangeTheme() {
    if(isDarkTheme === 'dark') return setIsDarkTheme('light');
    if(isDarkTheme === 'light') return setIsDarkTheme('dark');
  }

  return (
    <Button 
      onClick={handleChangeTheme}
    >dark | light</Button>
  )
}

const Button = styled.button`
  position: absolute;
  right: 8px;

  width: 100px;
  border: none;
  padding: 4px;
  border-radius: 50px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.font};

  cursor: pointer;
`