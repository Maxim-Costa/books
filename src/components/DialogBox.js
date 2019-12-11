import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class DialogBox extends Component {
    
    render() {
        return (
            <Dialog
                open={this.props.opens}
                onClose={this.props.handleClose}
                PaperComponent={this.PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">Quitter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>Tout ce que vous avez fait jusqu'à présents ne sera pas sauvegardé. Voulez-vous continuer ?</div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.props.handleClose} color="secondary">Cancel</Button>
                    <Button onClick={this.props.handleCloseContinue} style={{color: 'green'}} color="primary">continue</Button>
                </DialogActions>
            </Dialog>
        );
    };
};
export default DialogBox;