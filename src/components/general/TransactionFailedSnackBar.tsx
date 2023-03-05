import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

import {useState, useEffect} from "react";

import { useAppSelector, useAppDispatch } from "@/redux/app/hooks";
import { setStatus } from "@/redux/slices/transactionSlice";

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

interface TransactionFailedSnackbarProps {
    open: boolean;
    onClose: () => void;
}


const TransactionFailedSnackbar = ({ open, onClose }: TransactionFailedSnackbarProps) => {
    const { status } = useAppSelector((state) => state.transaction);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenSnackbar(false);
        dispatch(setStatus(null));
        onClose();
    };

    useEffect(() => {
        if (status === "error") {
            setOpenSnackbar(true);
        }
    }, [status]);



    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => {
                handleClose();
            }}
            sx={{  alignItems: "center", backgroundColor: "error.main", color: "text.primary"}}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            TransitionComponent={SlideTransition}
        >
            <Alert severity="error" sx={{
                alignItems: "center",
                typography: 'body1',
                backgroundColor: "error.main",
                color: "common.white",
                '& .MuiAlert-icon': {
                    color: "common.white",
                },
            }}
            >Transaction failed, please try again.</Alert>
        </Snackbar>
    );
};

export default TransactionFailedSnackbar;
