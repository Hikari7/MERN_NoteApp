import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#CABDB3",
      main: "#4A4147",
      dark: "#563A3C",
      contrastText: "#1B225A",
    },
    // secondary: {
    //   light: "#9BBAE6",
    //   main: "#fff",
    //   dark: "#333",
    //   contrastText: "#333",
    // },
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
