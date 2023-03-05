import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";

const WrappedDatePicker = ({ value,onChange }: { value: any, onChange : (newValue: string ) => void }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                renderInput={(params) => <TextField {...params} />}
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={(newValue: string | null) => {
                    if(newValue)
                        onChange(newValue);
                }}
            />
        </LocalizationProvider>
    );
};

export default WrappedDatePicker;
