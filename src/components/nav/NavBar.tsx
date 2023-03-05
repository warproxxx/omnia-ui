import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import { Web3Button } from "@web3modal/react";

import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";

import { useAppSelector } from "@/redux/app/hooks";
import { useAppDispatch } from "@/redux/app/hooks";

import { selectUser, setUser, setBalance,  } from "@/redux/slices/userSlice";

import { useAccount } from "wagmi";

const pages = ["Portfolio", "Exchange", "Vaults"];
const pageUrl = ["/portfolio", "/exchange", "/vaults"];
// const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = ({getTestTokens}:{getTestTokens: Function}) => {
    const dispatch = useAppDispatch();
    const {balance} = useAppSelector(selectUser);
    const {address} = useAccount();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const routeTo = (page: string) => {
        router.push(page);
        handleCloseNavMenu();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        onClick={() => {
                            router.push("/exchange");
                        }}
                        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                    >
                        <Box
                            component="img"
                            src="/omnia.png"
                            sx={{
                                height: "70px",
                                width: "100px",
                                mr: 0.5,
                                p: "10px",
                                display: { xs: "none", md: "flex" },
                            }}
                        />

                        <Typography
                            variant="h3"
                            noWrap
                            component="a"
                            sx={{
                                display: { xs: "none", md: "flex" },
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "primary.main",
                                textDecoration: "none",
                            }}
                        >
                            OMNIA
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page, index) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => {
                                        routeTo(pageUrl[index]);
                                    }}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: {
                                xs: 0,
                                md: 2,
                            },
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "primary.main",
                            textDecoration: "none",
                        }}
                    >
                        OMNIA
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center", gap: 0.5, alignItem:'center' }}>
                        {pages.map((page, index) => (
                            <Button
                                key={page}
                                onClick={() => {
                                    routeTo(pageUrl[index]);
                                }}
                                sx={{
                                    color: router.asPath.includes(pageUrl[index]) ? "primary.main" : "text.secondary",
                                    textTransform: "none",
                                    fontSize: (theme) => theme.typography.h2,
                                    "&:hover": {
                                        backgroundColor: "#00000000",
                                        color: "primary.main",
                                    },
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: "flex", gap: 0.5, }}>
                                <LoadingButton
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        backgroundColor: "primary.main",
                                        color: "primary.contrastText",
                                        "&:hover": {
                                            backgroundColor: "primary.dark",
                                        },
                                        typography: "body1",
                                        "&:disabled": {
                                            color: "common.white",
                                        },
                                        height: '40px',
                                    }}
                                    disabled={address ? false : true}
                                    aria-controls={open ? "demo-positioned-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    Balance
                                </LoadingButton>
                                <Menu
                                    id="demo-positioned-menu"
                                    aria-labelledby="demo-positioned-button"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    elevation={0}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                    }}
                                    PaperProps={{
                                        sx: {
                                            borderRadius: "8px"
                                        }
                                    }}
                                >
                                    <MenuItem sx={{
                                        cursor:'default'
                                    }} onClick={()=>{
                                        handleClose();
                                    }}>
                                        <Box component="img" src="/icons/eth.svg" sx={{ height: "30px", width: "30px", mr: 0.5 }} />
                                        <Typography textAlign="center" variant="body1">
                                            Balance: {balance.WETH} WETH
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem sx={{
                                        cursor:'default'
                                    }} onClick={()=>{
                                        handleClose();
                                    }}>
                                        <Box component="img" src="/icons/btc.svg" sx={{ height: "30px", width: "30px", mr: 0.5 }} />
                                        <Typography textAlign="center" variant="body1">
                                            Balance: {balance.WBTC} WBTC
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem sx={{
                                        cursor:'default'
                                    }} onClick={()=>{
                                        handleClose();
                                    }}>
                                        <Box component="img" src="/icons/usdc.svg" sx={{ height: "30px", width: "30px", mr: 0.5 }} />
                                        <Typography textAlign="center" variant="body1">
                                            Balance: {balance.USDC} USDC
                                        </Typography>
                                    </MenuItem>

                                    <MenuItem onClick={()=>{
                                        getTestTokens();
                                        handleClose();
                                    }}>
                                        <Box component="img" src="/icons/claim.svg" sx={{ height: "30px", width: "30px", mr: 0.5 }} />
                                        <Typography textAlign="center" variant="body1">
                                            Claim All Testnet Tokens
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            <Web3Button />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
