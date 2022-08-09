import FormDialog from "../../FormDialog/FormDialog";


const ThresholdCreatorDialog = ({isOpen, handleClose}) => {
    const handleThresholdSend = () => {

    }

    return <FormDialog open={isOpen} handleClose={handleClose} handleConfirm={handleThresholdSend}/>
}

export default ThresholdCreatorDialog;