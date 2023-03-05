import { Box, ListSubheader, ListItemIcon, MenuItem, Select, Typography } from "@mui/material";
import { SelectableAsset } from "@/types/types";


interface AssetSelectionProps {
    exchangeAsset1: SelectableAsset;
    exchangeAsset2: SelectableAsset;
    setExchangeAsset1: (asset: SelectableAsset) => void;
    setExchangeAsset2: (asset: SelectableAsset) => void;
}

const AssetSelection = (
    {
        exchangeAsset1,
        exchangeAsset2,
        setExchangeAsset1,
        setExchangeAsset2,
    }: AssetSelectionProps
) => {
    
    return (
        <Box
        sx={{
            display: "flex",

            width: "fit-content",
            alignItems: "center",
            gap: 1,
        }}
    >
        <Typography
            variant="h3"
            sx={{
                color: "text.primary",
            }}
        >
            Exchange
        </Typography>

        <Select
            variant="standard"
            disableUnderline
            value={exchangeAsset1}
            onChange={(e) => {
                if (e.target.value === exchangeAsset2)
                {
                    const tempAsset = exchangeAsset1;
                    setExchangeAsset1(exchangeAsset2);
                    setExchangeAsset2(tempAsset);
                    return;
                }
                    setExchangeAsset1(e.target.value as SelectableAsset);
            }}
            fullWidth
            sx={{
                "& .MuiSelect-select": {
                    color: "text.primary",
                    // paddingBottom: 1,
                    // paddingTop: 1.6,
                    // paddingLeft: 1,
                    typography: "h4",
                    width: "fit-content",
                },
            }}
        >
            <ListSubheader
                sx={{
                    backgroundColor: "transparent",
                    color: "text.secondary",
                    typography: "h5",
                    fontFamily: "VCROSD",
                }}
            >
                ERC20
            </ListSubheader>
            <MenuItem
                value={"WETH"}
                sx={{
                    display: exchangeAsset1 === "WETH" ? "none" : "block",
                }}
            >
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/eth.svg"} sx={{ width: 30, height: 30 }} />
                    <Typography variant="h4">WETH</Typography>
                </ListItemIcon>
            </MenuItem>

            <MenuItem
                value={"WBTC"}
                sx={{
                    display: exchangeAsset1 === "WBTC" ? "none" : "block",
                }}
            >
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/btc.svg"} sx={{ width: 30, height: 30 }} />
                    <Typography variant="h4">WBTC</Typography>
                </ListItemIcon>
            </MenuItem>

            <MenuItem
                value={"USDC"}
                sx={{
                    display: exchangeAsset1 === "USDC" ? "none" : "block",
                }}
            >
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/usdc.svg"} sx={{ width: 30, height: 30 }} />
                    <Typography variant="h4">USDC</Typography>
                </ListItemIcon>
            </MenuItem>
            <ListSubheader
                sx={{
                    backgroundColor: "transparent",
                    color: "text.secondary",
                    typography: "h5",
                    fontFamily: "VCROSD",
                }}
            >
                ERC721
            </ListSubheader>
            <MenuItem value={"CRYPTOPUNK"} disabled>
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/cryptopunk.png"} sx={{ width: 30, height: 30, borderRadius: "8px" }} />
                    <Typography variant="h4">CryptoPunk</Typography>
                </ListItemIcon>
            </MenuItem>
            <MenuItem value={"BAYC"} disabled>
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/BAYC.png"} sx={{ width: 30, height: 30, borderRadius: "8px" }} />
                    <Typography variant="h4">BAYC</Typography>
                </ListItemIcon>
            </MenuItem>
        </Select>
        <Typography
            variant="h3"
            sx={{
                color: "text.primary",
            }}
        >
            for
        </Typography>
        <Select
            variant="standard"
            value={exchangeAsset2}
            onChange={(e) => {
                if (exchangeAsset1 === e.target.value)
                {
                    const tempAsset = exchangeAsset2;
                    setExchangeAsset1(tempAsset);
                    setExchangeAsset2(exchangeAsset1);

                    return;
                } 
                setExchangeAsset2(e.target.value as SelectableAsset);
            }}
            fullWidth
            disableUnderline
            sx={{
                "& .MuiSelect-select": {
                    color: "text.primary",
                    // paddingBottom: 1,
                    // paddingTop: 1.6,
                    // paddingLeft: 1,
                    typography: "h4",
                    width: "fit-content",
                    fontFamily: "VCROSD",
                },
            }}
        >
            <ListSubheader
                sx={{
                    backgroundColor: "transparent",
                    color: "text.secondary",
                    typography: "h5",
                    fontFamily: "VCROSD",
                }}
            >
                ERC20
            </ListSubheader>
            <MenuItem
                value={"WETH"}
                sx={{
                    display: exchangeAsset2 === "WETH" ? "none" : "block",
                }}
            >
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/eth.svg"} sx={{ width: 30, height: 30 }} />
                    <Typography variant="h4">WETH</Typography>
                </ListItemIcon>
            </MenuItem>

            <MenuItem
                value={"WBTC"}
                sx={{
                    display: exchangeAsset2 === "WBTC" ? "none" : "block",
                }}
            >
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/btc.svg"} sx={{ width: 30, height: 30 }} />
                    <Typography variant="h4">WBTC</Typography>
                </ListItemIcon>
            </MenuItem>

            <MenuItem
                value={"USDC"}
                sx={{
                    display: exchangeAsset2 === "USDC" ? "none" : "block",
                }}
            >
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/usdc.svg"} sx={{ width: 30, height: 30 }} />
                    <Typography variant="h4">USDC</Typography>
                </ListItemIcon>
            </MenuItem>

            <ListSubheader
                sx={{
                    backgroundColor: "transparent",
                    color: "text.secondary",
                    typography: "h5",
                    fontFamily: "VCROSD",
                }}
            >
                ERC721
            </ListSubheader>
            <MenuItem value={"CRYPTOPUNK"} disabled>
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/cryptopunk.png"} sx={{ width: 30, height: 30, borderRadius: "8px" }} />
                    <Typography variant="h4">CryptoPunk</Typography>
                </ListItemIcon>
            </MenuItem>
            <MenuItem value={"BAYC"} disabled>
                <ListItemIcon>
                    <Box component={"img"} src={"/icons/BAYC.png"} sx={{ width: 30, height: 30, borderRadius: "8px" }} />
                    <Typography variant="h4">BAYC</Typography>
                </ListItemIcon>
            </MenuItem>
        </Select>
    </Box>
    )
}

export default AssetSelection;