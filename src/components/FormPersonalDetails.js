import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import '../App.css';
import TextareaAutosize from 'react-autosize-textarea';

import MenuItem from 'material-ui/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from 'material-ui/Drawer';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

function PaperComponent(props) {
    return (
      <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

export class FormPersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            open: false,
            errors: '',
            opens: false
        };
        this.handleDrawerClick = this.handleDrawerClick.bind(this);
        this.handleMenuClick1 = this.handleMenuClick1.bind(this);
    }
    
    handleMenuClick1() {
        this.handleClickOpen();
        this.handleDrawerClick();
    };

    handleDrawerClick() {
        if (this.state.open === false)
          this.setState({ open: true });
        else
          this.setState({ open: false });
          window.scrollTo(0, 0);
      }

      handleClickOpen = () => {
        this.setState({opens: true});
    };

    handleClose = () => {
        this.setState({opens: false});
    };
    handleCloseContinue = () => {
        this.setState({opens: false});
        this.props.setHStep();
    };

    continue = e => {
        e.preventDefault();
        const { values } = this.props;
        console.log(values.auteur, values.histoire, values.date)
        if (!(values.auteur) || !(values.histoire) || !(values.date)) {
            console.log("error value empty")
            this.setState({absolute: '* = required'})
        } else {
            this.props.nextStep();
            this.setState({absolute: ''})
        }
    };

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    onResize(event) {
        console.log(event.type); // -> "autosize:resized"
      }

    render() {
        const { values, handleChange } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                <AppBar
                        position="fixed"
                        title={<typography className={this.state.open ? 'hidden' : 'shown'}>L'histoire du livre</typography>}
                        onLeftIconButtonClick={this.handleDrawerClick.bind()}
                    />

                    <Drawer open={this.state.open}>
                        <div className="IconAppBar">
                            <IconButton onClick={this.handleDrawerClick.bind()}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <MenuItem onClick={this.handleMenuClick1.bind()}>Toutes les Histoires</MenuItem>
                        <Divider />
                    </Drawer>
                        <Dialog
                            open={this.state.opens}
                            onClose={this.handleClose}
                            PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                            Cancel
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                Tout ce que vous avez fait jusqu'à présents ne sera pas sauvegardé. Voulez-vous continuer ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={this.handleCloseContinue} color="primary">
                                continue
                                </Button>
                            </DialogActions>
                        </Dialog>
                    <br/>
                    <br/>
                    <div className={this.state.open ? 'hidden' : 'shown'}>
                    <TextField 
                        hintText="Entrer le nom de l'auteur"
                        floatingLabelText="auteur *"
                        onChange={handleChange('auteur')}
                        defaultValue={values.auteur}
                        required
                    />
                    <br/>
                    <br/>
                    <TextField
                        id="date *"
                        label="Date de l'écriture"
                        type="date"
                        defaultValue={values.date}
                        onChange={handleChange('date')}
                        //className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        required
                    />
                    <br/>
                    <br/>
                    <br/>
                    <TextareaAutosize onChange={handleChange('histoire')} defaultValue={values.histoire} className="textarea" placeholder="Votre histoire * "/>
                    <th className="twix">{values.histoire.length}</th>
                    <br/>
                    <p className="required">{this.state.absolute}</p>
                    <RaisedButton
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
                    />
                    <RaisedButton
                        label="Continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />
                    </div>
                </React.Fragment>
            </MuiThemeProvider>
        );
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormPersonalDetails;
