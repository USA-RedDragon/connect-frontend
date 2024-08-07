import { createTheme } from '@mui/material/styles';
import Colors from './colors';
import { ChevronIcon } from './icons';

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: Colors.white,
        },
        outlined: {
          border: `1px solid ${Colors.white20}`,
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#30373B',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          overflowY: null,
        },
        paperAnchorDockedLeft: {
          borderRight: 'none',
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        disableUnderline: true,
        IconComponent: ChevronIcon,
      },
      styleOverrides: {
        select: {
          padding: '12px',
          paddingRight: '48px',
          margin: '0px',
          '&>div': {
            margin: '0',
          },
          '&:focus': {
            background: 'inherit',
          },
        },
        selectMenu: {
          paddingRight: 54,
        },
        icon: {
          marginRight: 20,
          color: Colors.white30,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputProps: {
          disableUnderline: true,
        },
        variant: 'standard',
      },
    },
    MuiInputBase: {
      defaultProps: {
      },
      styleOverrides: {
        root: {
          position: 'relative',
          border: `1px solid ${Colors.grey800}`,
          borderRadius: 20,
          overflow: 'hidden',
        },
        input: {
          padding: '12px 16px',
          '&::placeholder': {
            opacity: 1,
            color: Colors.white30,
          },
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          transform: 'translate(0, -9px) scale(0.75)',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          marginLeft: 16,
          marginTop: 8,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 8,
          marginTop: 8,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 40,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:focus': {
            outline: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.grey700,
          color: Colors.white,
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    placeholder: Colors.white30,
    background: {
      default: Colors.grey999,
    },
    primary: {
      light: Colors.lightBlue700,
      main: Colors.lightBlue900,
      dark: Colors.blue100,
    },
    secondary: {
      light: Colors.green100,
      main: Colors.green200,
      dark: Colors.green500,
    },
    states: {
      drivingBlue: Colors.blue500,
      engagedGreen: Colors.green400,
      engagedGrey: '#919b95',
      alertOrange: Colors.orange50,
      alertRed: Colors.red100,
      userFlag: Colors.yellow500,
    },
    grey: {
      50: Colors.grey50,
      100: Colors.grey100,
      200: Colors.grey200,
      300: Colors.grey300,
      400: Colors.grey400,
      500: Colors.grey500,
      600: Colors.grey600,
      700: Colors.grey700,
      800: Colors.grey800,
      900: Colors.grey900,
      950: Colors.grey950,
      999: Colors.grey999,
    },
    lightGrey: {
      200: Colors.lightGrey200,
    },
    white: {
      10: Colors.white10,
      12: Colors.white12,
      20: Colors.white20,
      30: Colors.white30,
      40: Colors.white40,
      50: Colors.white50,
    },
    error: {
      main: 'rgba(209, 35, 35, 0.72)',
    },
  },
});

export default theme;
