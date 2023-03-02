import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1
};


export default function ApprovalModal() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [approveToken, setApproveToken] = React.useState("WETH");

    return (
        <Box>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography id="modal-modal-title" variant="h5">
                            {`Approve your ${approveToken}`}
                        </Typography>

                        <Typography onClick={handleClose} variant="body1" sx={{
                            typography: 'h5',
                            color: 'error.main',
                            cursor: 'pointer',
                            fontWeight: 700,

                            "&:hover": {
                                color: 'error.dark'
                            }
                        
                        }}>X</Typography>

                    </Box>

                    <Typography id="modal-modal-description" variant="body1">
                        You only have to do this once. This allows the OMNIA contract to handle your {approveToken} for you.
                    </Typography>
                    <Button onClick={handleClose} variant="contained" sx={{
                        typography: 'h5'
                    }}>Approve</Button>

                </Box>
            </Modal>
        </Box>
    );
}
