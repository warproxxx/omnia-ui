import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
}

interface TransactionFailedSnackbarProps {
    open: boolean;
    onClose: () => void;
}


const TransactionFailedSnackbar = ({ open, onClose }: TransactionFailedSnackbarProps) => {

    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => {
                onClose();
            }}
            sx={{  alignItems: "center", backgroundColor: "error.main", color: "text.primary"}}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            TransitionComponent={SlideTransition}
        >
            <Alert severity="error" sx={{
                alignItems: "center",
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
