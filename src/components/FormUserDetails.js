import React, {
    Component
} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TextField1 from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import options from './theme';
//import ListItemText from '@material-ui/core/ListItemText';
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

export class FormUserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            open: false,
            errors: '',
            opens: false
        };
        this.handleDrawerClick = this.handleDrawerClick.bind(this);
        this.handleMenuClick1 = this.handleMenuClick1.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
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

    onTagsChange = (event, values) => {
        this.state.tags = []
        for (let word in values) {
            this.state.tags.push(values[word].theme);
        }
        const {
            handleChange1
        } = this.props;
        const toto = this.state.tags.join()
        handleChange1(toto)
    };

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
        if (!(this.state.tags)) {
            //console.log('Error', values.categorie);
        } else {
            //console.log('ok', values.categorie);
        }
        if (!(values.title) || !(values.description) || !(values.categorie)) {
            console.log("error value empty")
            this.setState({absolute: '* = required'})

        } else {
            this.props.nextStep();
            this.setState({absolute: ''})
        }

    }

    
    render() {
        
        const { values, handleChange } = this.props;
        return (
            <form>
                <MuiThemeProvider>
                    <React.Fragment>
                    <AppBar
                        position="fixed"
                        title={<typography className={this.state.open ? 'hidden' : 'shown'}>Information sur le livre</typography>}
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
                            hintText="Entrer le titre du livre"
                            floatingLabelText="Title *"
                            onChange={handleChange('title')}
                            defaultValue={values.title}
                            required
                        />
                        <br/>
                        <TextField 
                            hintText="Entrer la description"
                            floatingLabelText="Description *"
                            onChange={handleChange('description')}
                            defaultValue={values.description}
                            maxlength={125}
                            required
                            multiline
                            rowsMax="4"
                        />
                        <th className="twix">{values.description.length}/125</th>
                        <div className="test" style={{ width: 270 }}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                            getOptionLabel={option => option.theme}
                            groupBy={option => option.firstLetter}
                            onChange={this.onTagsChange }
                            renderInput={params => (
                                <TextField1
                                    {...params}
                                    //variant="standard"
                                    label="theme de l'histoire *"
                                    placeholder="Theme"
                                    margin="normal"
                                    fullWidth
                                />
                            )}
                        />
                        </div>
                        <br/>
                        <p className="required">{this.state.absolute}</p>
                        <RaisedButton
                            label="Continue"
                            primary={true}
                            style={styles.button}
                            onClick={this.continue}
                        />
                        </div>
                    </React.Fragment>
                </MuiThemeProvider>
            </form>
        );
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormUserDetails
