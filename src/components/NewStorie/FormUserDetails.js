import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TextField1 from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete';
import options from '../theme';
import MenuItem from 'material-ui/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from 'material-ui/Drawer';
import DialogBox from '../DialogBox';
import '../css/add.css';
import '../css/main.css';
import { ThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { cyan } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));



const theme = createMuiTheme({
    palette: {
      primary: cyan,
    },
});


export class FormUserDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            open: false,
            errors: '',
            opens: false,
            itOk: true
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
        this.setState({tags: []})
        for (let word in values) {
            this.state.tags.push(values[word].theme);
        }
        const { handleChange1 } = this.props;
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
        if (!(values.title) || !(values.description) || !(values.categorie) || !(values.categorie.split(",").length<=3)) {
            console.log("error value empty")
            this.setState({absolute: '* = required'})

        } else {
            this.setState({absolute: ''})
            this.props.nextStep();
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
                    <DialogBox 
                            handleClickOpen={this.handleClickOpen}
                            handleClose={this.handleClose}
                            handleCloseContinue={this.handleCloseContinue}
                            opens={this.state.opens}

                        />
                        <br/>
                        <br/>
                        <br/>
                        <div className={this.state.open ? 'hidden' : 'shown'}>
                        <div className="test" style={{ width: 270 }}>
                        <TextField
                            hintText="Entrer le titre du livre"
                            floatingLabelText="Title *"
                            onChange={handleChange('title')}
                            defaultValue={values.title}
                            required
                        />
                        </div>
                        <br/>
                        <br/>
                        <div className="test" style={{ width: 270 }}>
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
                        </div>
                        <th className="twix">{values.description.length}/125</th>
                        <br/>
                        <div className="test" style={{ width: 270 }}>
                        <Autocomplete
                            multiple
                            id="tags-standard"
                            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                            getOptionLabel={option => option.theme}
                            groupBy={option => option.firstLetter}
                            onChange={this.onTagsChange}
                            renderInput={params => (
                                <ThemeProvider theme={theme}>
                                <TextField1
                                    {...params}
                                    //variant="standard"
                                    label="theme de l'histoire"
                                    placeholder="Theme"
                                    margin="normal"
                                    fullWidth
                                    className={useStyles.margin}
                                    required
                                />
                                </ThemeProvider>
                            )}
                        />
                        <th className={(values.categorie.split(",").length>3) ? "red3" : "twix"}>{!(values.categorie) ? '0' : values.categorie.split(',').length}/3&nbsp;&nbsp;{(values.categorie.split(",").length>3) ? "Nombre de theme max = 3" : ""}</th>
                        </div>
                        <br/>
                        <p className="required">{this.state.absolute}</p>
                        <RaisedButton
                                disabled={(!(values.title) || !(values.description) || !(values.categorie)) || !(values.categorie.split(",").length<=3)}
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
