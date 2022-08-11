import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Produto from "./pages/Produto/index"
import EditarProduto from "./pages/EditarProduto/index"
import Box from "@mui/material/Box";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NotifyButton from "./Components/Notificacao";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import logo from "./image/tok-logo-branco-horizontal 1.png";
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "end",
          bgcolor: "background.default",
          color: "text.primary",
          p: 3,
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <AppBar
          sx={{ width: "100%" }}
        >
          <Toolbar style={{ backgroundColor: "#0A775A", justifyContent: "space-between" }}>
            <Link to="/">
              <img src={logo} alt="Logo TokEStok"/>
            </Link>
            <div style={{ flexDirection: "row", display: "flex" }} >
              <NotifyButton />
              <Button sx={{ ml: 1 }} onClick={() => colorMode.toggleColorMode()} color="inherit" alt="modo escuro">
                {theme.palette.mode === "dark" ? <><Brightness7Icon />Tema Escuro</> : <><Brightness4Icon />Tema Claro</>}
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Produto />} />
          <Route path="EditarProduto" element={<EditarProduto />} />
        </Routes>
      </Box>
    </>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : prevMode === 'dark' && "light"));
        localStorage.setItem('theme',mode)
      },
    }),
    [mode],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}