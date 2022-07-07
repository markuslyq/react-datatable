import { createTheme } from "@mui/material/styles";

const tableTheme = createTheme({
  components: {
    // Name of the component
    MuiPaper: {
      defaultProps: {
        // The props to change the default for.
        elevation: 1, // No more ripple, on the whole application 💣!
        square: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          width: "max-content",
        },
      },
    },
  },
});

export default tableTheme;