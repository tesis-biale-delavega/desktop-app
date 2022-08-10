import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const BasicDialog = ({open, handleClose, title, content}) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose} PaperProps={{sx:{backgroundColor: "#383838"}}}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {content()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BasicDialog;
