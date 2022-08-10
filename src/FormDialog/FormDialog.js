import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog = ({open, handleClose, handleConfirm, title, content}) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose} PaperProps={{sx:{backgroundColor: "#383838"}}}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {content()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;
