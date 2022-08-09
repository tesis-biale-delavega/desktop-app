import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog = ({open, handleClose, handleConfirm}) => {
    return (
        <div>
            <Dialog open={open} onClose={handleClose} PaperProps={{sx:{backgroundColor: "#000"}}}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: "#fff"}}>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default FormDialog;
