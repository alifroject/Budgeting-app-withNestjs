import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
typography: {
fontFamily: [
"Inter",
"Roboto",
"Helvetica",
"Arial",
"sans-serif",
].join(","),
},
});

export default muiTheme;
