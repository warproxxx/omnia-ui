import { createTheme } from "@mui/material/styles";

// use media query to query screen size
import { useMediaQuery } from "@mui/material";

const size = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
} as const;


let defaultPlatte = {
    bothLightAndDark: {
        actionColor: "#fecd35",
        errorColor: "#FF6161",
        successColor: "#0aad5a",
    },
    light: {
        foregroundColor: "#2C2C2C",
        secondaryForeGoundColor: "#2C2C2C8f",
        backgroundColor: "#FFFFFF",
        buttonTextColor: "#13131a",
        actionBttonTextColor: "#13131a",
        inactiveColor: "#9EA4A0",
        cardColor: "#090909",
        borederColor: "#fecd35",
    },
    dark: {
        foregroundColor: "#FFFFFF",
        secondaryForeGoundColor: "#ffffff8f",
        backgroundColor: "#1e1d24",
        buttonTextColor: "#13131a",
        actionBttonTextColor: "#13131a",
        inactiveColor: "#363636",
        cardColor: "#090909",
        borederColor: "#fecd35",
    },
} as const;

const useTheme = () => {
    const isXs = useMediaQuery(`(max-width:${size.xs}px)`);
    const isSm = useMediaQuery(`(max-width:${size.sm}px)`);
    const isMd = useMediaQuery(`(max-width:${size.md}px)`);
    const isLg = useMediaQuery(`(max-width:${size.lg}px)`);
    const isXl = useMediaQuery(`(max-width:${size.xl}px)`);

    // const isLight = useMediaQuery("(prefers-color-scheme: light)");
    const isLight = false;

    const theme = createTheme({
        palette: {
            mode: isLight ? "light" : "dark",
            primary: {
                main: defaultPlatte.bothLightAndDark.actionColor,
            },
            background: {
                default: isLight ? defaultPlatte.light.backgroundColor : defaultPlatte.dark.backgroundColor,
                paper: isLight ? defaultPlatte.light.cardColor : defaultPlatte.dark.cardColor,
            },
            text: {
                primary: isLight ? defaultPlatte.light.foregroundColor : defaultPlatte.dark.foregroundColor,
                secondary : isLight ? defaultPlatte.light.secondaryForeGoundColor : defaultPlatte.dark.secondaryForeGoundColor,
            },
            error: {
                main: defaultPlatte.bothLightAndDark.errorColor,
            },
            success: {
                main: defaultPlatte.bothLightAndDark.successColor,
            },
            action: {
                disabledBackground: isLight ? defaultPlatte.light.inactiveColor : defaultPlatte.dark.inactiveColor,
                disabled: isLight ? defaultPlatte.light.buttonTextColor : defaultPlatte.dark.buttonTextColor,
            },
            divider: isLight ? defaultPlatte.light.borederColor : defaultPlatte.dark.borederColor,
            grey: {
                500: "rgba(0, 0, 0, 0.5)",
                900: "rgba(0, 0, 0, 0.9)",
                100: "rgba(255, 255, 255, 0.1)",
            },
            common: {
                white: "#ffffff",
                black : "#000000",
            },
        },
        typography: {
            fontFamily: "VCROSD",
            // App Title
            h1: {
                fontSize: isXs ? "1.5rem" : isSm ? "3rem" : isMd ? "3.5rem" : isLg ? "4rem" : "4.5rem",
                fontWeight: 900,
            },

            // App extra large
            h2: {
                fontSize: isXs ? "1rem" : isSm ? "1rem" : isMd ? "1rem" : isLg ? "1.1rem" : "1.2rem",
                fontWeight: 600,
            },

            h3: {
                fontSize: isXs ? "1rem" : isSm ? "1.5rem" : isMd ? "1.75rem" : isLg ? "2rem" : "2.25rem",
                fontWeight: 700,
            },

            h4: {
                fontSize: isXs ? "1rem" : isSm ? "1.25rem" : isMd ? "1.5rem" : isLg ? "1.75rem" : "2rem",
                fontWeight: 700,
            },

            h5: {
                fontSize: isXs ? "1rem" : isSm ? "1.rem" : isMd ? "1.rem" : isLg ? "1.25rem" : "1.5rem",
                fontWeight: 700,
            },

            //App regular
            body1: {
                fontSize: isXs ? "1rem" : isSm ? "1rem" : isMd ? "1rem" : isLg ? "1rem" : "1rem",
                fontWeight: 400,
            },

            //App small
            body2: {
                fontSize: isXs ? "0.75rem" : isSm ? "1rem" : isMd ? "1.25rem" : isLg ? "1.5rem" : "1.75rem",
                fontWeight: 400,
            },
        },
        spacing: isXs ? 8 : isSm ? 16 : isMd ? 24 : isLg ? 32 : 32,
        components: {
            MuiButton: {
                styleOverrides: {
                    contained: {
                        borderRadius: isXs ? 8 : isSm ? 8 : isMd ? 8 : isLg ? 8 : 8,
                        color: isLight ? defaultPlatte.light.buttonTextColor : defaultPlatte.dark.buttonTextColor,
                    },
                },
            },
            MuiCard:{
                styleOverrides: {
                    root: {
                        borderRadius: isXs ? 8 : isSm ? 8 : isMd ? 8 : isLg ? 8 : 8,
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontFamily: "VCROSD",
                        fontSize: isXs ? "1rem" : isSm ? "1.25rem" : isMd ? "1.5rem" : isLg ? "1.75rem" : "2rem",
                        fontWeight: 700,
                    }
                }
            },
            MuiSelect: {
                styleOverrides: {
                    select:{

                    },
                    standard: {
                        fontFamily: "VCROSD",
                        fontSize: isXs ? "1rem" : isSm ? "1.25rem" : isMd ? "1.5rem" : isLg ? "1.75rem" : "2rem",
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center'
                    }

                }
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        display: 'flex',
                        gap: isXs ? 4 : isSm ? 8 : isMd ? 12 : isLg ? 16 : 16,
                        alignItems: 'center'
                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        color: isLight ? defaultPlatte.light.foregroundColor : defaultPlatte.dark.foregroundColor,
                        backgroundColor: "transparent !important", 
                        borderBottom: "1px solid rgb(255 255 255 / 40%);",
                        fontSize: isXs ? "1rem" : isSm ? "1rem" : isMd ? "1rem" : isLg ? "1rem" : "1rem",
                        fontWeight: 400,
                        
                    }
                }
            }
        }
    });

    return theme;
};

export default useTheme;



// let theme = {
//     lightOrDark: "light",
//     mainColor: "#00D092",
//     size: "md",
//     platte: defaultPlatte.light,
// };

// let platte = theme.platte;

// const MUI_theme = createTheme({
//     palette: {
//         mode: theme.lightOrDark === "light" ? "light" : "dark",
//         primary: {
//             main: theme.mainColor,
//         },
//         background: {
//             default: platte.backgroundColor,
//         },
//         text: {
//             primary: platte.foregroundColor,
//         },
//         error: {
//             main: platte.errorColor,
//         },
//         success: {
//             main: platte.successColor,
//         },
//         action: {
//             disabledBackground: platte.inactiveColor,
//             disabled: platte.buttonTextColor,
//         },
//         divider: platte.borederColor,
//         grey: {
//             500: "rgba(0, 0, 0, 0.5)",
//             900: "#ffffffc7",
//         },
//         common: {
//             white: "#ffffff",
//         },
//     },
//     typography: {
//         fontFamily: "Roboto",
//         // Widget Title
//         h1: {
//             fontSize: theme.size === "xs" ? "1.5rem" : theme.size === "sm" ? "3rem" : theme.size === "md" ? "3.5rem" : "4rem",
//             fontWeight: 900,
//         },

//         // Widget extra large
//         h2: {
//             fontSize: theme.size === "xs" ? "1.25rem" : theme.size === "sm" ? "1.5rem" : theme.size === "md" ? "1.75rem" : "2rem",
//             fontWeight: 600,
//         },

//         h3: {
//             fontSize: theme.size === "xs" ? "1rem" : theme.size === "sm" ? "1.5rem" : theme.size === "md" ? "1.75rem" : "2rem",
//             fontWeight: 700,
//         },

//         //Widget regular
//         body1: {
//             fontSize: theme.size === "xs" ? "1rem" : theme.size === "sm" ? "1.25rem" : theme.size === "md" ? "1.5rem" : "1.75rem",
//             fontWeight: 600,
//         },

//         //Widget regular extra bold
//         body2: {
//             fontSize: theme.size === "xs" ? "1rem" : theme.size === "sm" ? "1.25rem" : theme.size === "md" ? "1.5rem" : "1.75rem",
//             fontWeight: 700,
//         },

//         //Widget small
//         subtitle1: {
//             fontSize: theme.size === "xs" ? "0.75rem" : theme.size === "sm" ? "1rem" : theme.size === "md" ? "1.25rem" : "1.5rem",
//             fontWeight: 600,
//         },

//         //Widget extra small
//         subtitle2: {
//             fontSize: theme.size === "xs" ? "0.5rem" : theme.size === "sm" ? "1rem" : theme.size === "md" ? "1.25rem" : "1.5rem",
//             fontWeight: 600,
//         },

//         //Widget extra extral small
//         caption: {
//             fontSize: theme.size === "xs" ? "0.25rem" : theme.size === "sm" ? "0.5rem" : theme.size === "md" ? "0.75rem" : "1rem",
//             fontWeight: 600,
//         },
//     },
//     spacing: theme.size === "xs" ? 8 : theme.size === "sm" ? 16 : theme.size === "md" ? 20 : 24,
//     shape: {
//         borderRadius: theme.size === "xs" ? 4 : theme.size === "sm" ? 8 : theme.size === "md" ? 12 : 16,
//     },
//     components: {
//         MuiStepIcon: {
//             styleOverrides: {
//                 text: {
//                     fontSize: theme.size === "xs" ? "1rem" : theme.size === "sm" ? "1rem" : theme.size === "md" ? "1rem" : "1rem",
//                     fill: platte.buttonTextColor,
//                     fontWeight: 900,
//                 },
//                 root: {
//                     width: theme.size === "xs" ? "1.5rem" : theme.size === "sm" ? "2rem" : theme.size === "md" ? "2.5rem" : "3rem",
//                     height: theme.size === "xs" ? "1.5rem" : theme.size === "sm" ? "2rem" : theme.size === "md" ? "2.5rem" : "3rem",
//                     color: platte.inactiveColor,
//                 },
//             },
//         },
//         MuiStepLabel: {
//             styleOverrides: {
//                 label: {
//                     fontWeight: "900 !important",
//                     color: platte.foregroundColor,
//                 },
//             },
//         },
//         MuiStepConnector: {
//             styleOverrides: {
//                 line: {
//                     height: "0px",
//                     display: "none",
//                 },
//             },
//         },
//         MuiButton: {
//             styleOverrides: {
//                 contained: {
//                     textTransform: "capitalize",
//                     color: `${platte.buttonTextColor}`,
//                     fontSize: theme.size === "xs" ? "1rem" : theme.size === "sm" ? "1.25rem" : theme.size === "md" ? "1.5rem" : "1.75rem",
//                     fontWeight: "900",
//                     borderRadius: "10px",
//                     paddingInline: theme.size === "xs" ? "0.5rem" : theme.size === "sm" ? "1rem" : theme.size === "md" ? "1.5rem" : "2rem",
//                     paddingTop: "0px",
//                     paddingBottom: "0px",
//                 },
//                 root: {
//                     "&.Mui-disabled": {
//                         backgroundColor: platte.inactiveColor,
//                         color: platte.buttonTextColor,
//                     },
//                 },
//             },
//         },
//         MuiCard: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: platte.cardColor,
//                     color: platte.foregroundColor,
//                     borderRadius: "10px",
//                     boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
//                     border: `1px solid ${platte.borederColor}`,
//                     padding: theme.size === "xs" ? "0.5rem" : theme.size === "sm" ? "1rem" : theme.size === "md" ? "1.5rem" : "2rem",
//                     width:
//                         theme.size === "xs"
//                             ? "100%"
//                             : theme.size === "sm"
//                             ? "44%"
//                             : theme.size === "md"
//                             ? "30%"
//                             : theme.size === "lg"
//                             ? "30%"
//                             : "22%",
//                     "&:hover": {
//                         boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.9)",
//                         cursor: "pointer",
//                     },
//                 },
//             },
//         },
//         MuiChip: {
//             styleOverrides: {
//                 root: {
//                     backgroundColor: platte.inactiveColor,
//                     color: platte.buttonTextColor,
//                     padding: theme.size === "xs" ? "1rem" : theme.size === "sm" ? "1.25rem" : theme.size === "md" ? "1.5rem" : "1.75rem",
//                     "&:hover": {
//                         backgroundColor: platte.actionColor,
//                     },
//                 },
//                 label: {
//                     fontWeight: 700,
//                     fontSize: theme.size === "xs" ? "1rem" : theme.size === "sm" ? "1.5rem" : theme.size === "md" ? "1.75rem" : "2rem",
//                     padding: "0px",
//                 },
//             },
//         },
//     },
// });
