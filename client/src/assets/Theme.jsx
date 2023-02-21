import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#CABDB3",
      main: "#4A4147",
      dark: "#563A3C",
      contrastText: "#333",
    },
    secondary: {
      light: "#9BBAE6",
      main: "#fefefe",
      dark: "#333",
      contrastText: "#6d6a6a7e",
    },
    button: { main: "#1B225A" },
    background: {
      default: "#FAF8F2",
    },
  },
  typography: {
    fontFamily: "Open Sans",
  },
});

export default theme;
