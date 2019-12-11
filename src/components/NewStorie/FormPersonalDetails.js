import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TextareaAutosize from 'react-autosize-textarea';
import MenuItem from 'material-ui/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from 'material-ui/Drawer';
import DialogBox from '../DialogBox';
import '../css/add.css';
import '../css/main.css';

export class FormPersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            open: false,
            opens: false
            
        };
        this.handleDrawerClick = this.handleDrawerClick.bind(this);
        this.handleMenuClick1 = this.handleMenuClick1.bind(this);
    }
    
    countWords(str) {
        var matches = str.match(/[\w\d'-_]+/gi);
        var matches2 = matches ? matches.length : 0;
        return matches2 + " mots"

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

      /**************************************************************/

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
    /*****************************************************************/
    continue = e => {
        e.preventDefault();
        this.getCurrentDate('-')
        const { values } = this.props;
        if (!(values.auteur) || !(values.histoire)) {
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

    getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        var FullDate = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
        this.props.handleChangeDate(FullDate)
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
                        <DialogBox 
                            handleClickOpen={this.handleClickOpen}
                            handleClose={this.handleClose}
                            handleCloseContinue={this.handleCloseContinue}
                            opens={this.state.opens}

                        />
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
                    <TextareaAutosize onChange={handleChange('histoire')} defaultValue={values.histoire} className="textarea" placeholder="Votre histoire * "/>
                    <th className="twix">"caractère : "{values.histoire.length}", mot : "{this.countWords(values.histoire)}</th>
                    <br/>
                    <p className="required">{this.state.absolute}</p>
                    <RaisedButton
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
                    /> 
                    <RaisedButton
                        disabled={!(values.auteur) || !(values.histoire)}
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
