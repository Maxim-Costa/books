import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { RaisedButton} from 'material-ui';
import '../App.css';
import firebase from './config';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CommentIcon from '@material-ui/icons/Comment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
//import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';



export class Success extends Component {
    
    
    constructor() {
        super();
        this.state = {
          name: 'book',
          open: false,
          pageNumber: 1,
          words: [],
          idBook: 0,
          book: []
        };
        this.handleDrawerClick = this.handleDrawerClick.bind(this);
        this.handleMenuClick1 = this.handleMenuClick1.bind(this);
        this.handleMenuClick2 = this.handleMenuClick2.bind(this);
      }

    // ************************************* START ** FIREBASE ***************************************************** //
 
      componentDidMount() {
          const UserRef = firebase.database().ref('words');
          UserRef.on('value', (snapshot) => {
              let words = snapshot.val();
              let newState = [];
              for (let word in words) {
                  newState.push({
                      id: word,
                      Auteur: words[word].Auteur,
                      Categorie: words[word].Categorie,
                      Date: words[word].Date,
                      Description: words[word].Description,
                      Histoire: words[word].Histoire,
                      Title: words[word].Title,
                      
                  });
              }
              this.setState({
                words: newState
              });
          });
      }

    // ************************************* FINISH ** FIREBASE ***************************************************** //


    handleMenuClick1() {
        this.setState({ pageNumber: 1 });
        this.handleDrawerClick();
    };

    handleMenuClick2() {
        this.setState({ pageNumber: 2 });
        this.handleDrawerClick();
    };

    handleDrawerClick() {
        if (this.state.open === false)
          this.setState({ open: true });
        else
          this.setState({ open: false });
          window.scrollTo(0, 0);
      }

    MenuName() {
        if (this.state.pageNumber === 1) {
            return "Touts les histoires"
        }else if (this.state.pageNumber === 3){
            const Auteur = this.state.book.Auteur;  
            return "Une petite histoire de : " + Auteur
        }else {
            return "Vous avez ajouter une nouvelle histoire"
        }
    }

    handleMenuClick(id, pro) {
        window.scrollTo(0, 0);
        const Temp1 = this.state.words
        this.setState({ pageNumber: 3 });
        this.setState({ idBook: id });
        this.setState({ book: Temp1[id] });
        if (pro) {
            this.handleDrawerClick();
        }
    }

    menuControl() {
        const len = Object.keys( this.state.words ).length;
        if (this.state.pageNumber === 1) {
          return (
                <MuiThemeProvider>
                    <React.Fragment>
                        <h1>
                            <u>
                                <b>Toutes les histoires : {len ? len : ''}</b>
                            </u>
                        </h1>
                        {len ? 
                        <p className="Pclient">
                            {this.state.words.map((word) => {   
                                    return (
                                        <th className="ThClient" style={{ width: 350 }}>
                                            <List >
                                                <ListItem>
                                                <ListItemSecondaryAction>
                                                <MenuBookIcon onClick={() => this.handleMenuClick(word.id)} edge="end" aria-label="comments">
                                                    <CommentIcon />
                                                </MenuBookIcon>
                                                </ListItemSecondaryAction>
                                                    <h2 id={word.id}>{word.Title}</h2>
                                                </ListItem>
                                                <ListItem
                                                    primaryText="Titre :"
                                                    secondaryText={ word.Title }
                                                />
                                                <ListItem
                                                    multiple
                                                    primaryText="Description :"
                                                    secondaryText={
                                                        <Typography type="body2" className="sec">
                                                          { word.Description }
                                                        </Typography>
                                                   }
                                                />
                                                <ListItem
                                                    primaryText="Categorie : "
                                                    secondaryText={ word.Categorie }
                                                />
                                                <ListItem
                                                    primaryText="Auteur : "
                                                    secondaryText={ word.Auteur }
                                                />
                                                <ListItem
                                                    primaryText="Date d'ajout"
                                                    secondaryText={ word.Date }
                                                />
                                            </List>
                                        </th>   
                                    );
                                })
                            }
                        </p>
                           : <div className="circular"><CircularProgress /></div> }
                    </React.Fragment>
                </MuiThemeProvider>
            );
        } if (this.state.pageNumber === 3)
        {
            const book = this.state.book;
            return (
                <MuiThemeProvider>
                    <React.Fragment>
                        <h1 className="h1Title"  >{book.Title}</h1>
                        <br/>
                        <div className="HistoireDiv">
                            <p className="pHistoire" >{book.Histoire}</p>
                        </div>
                        <br/>
                        <p>Date : {book.Date}, &nbsp;&nbsp;&nbsp;Auteur : {book.Auteur}</p>
                        <br/>
                        <br/>
                    </React.Fragment>
                </MuiThemeProvider>
            );
        } else
        {
            return (
                <div>
                    <h1>Nouvelle histoire :</h1>
                    <p>ajouter une nouvelle histoire :</p>
                    <p>#NbHistoir : {len}</p>
                    <MuiThemeProvider>
                        <React.Fragment>
                            <RaisedButton
                                label="Continuer"
                                primary={true}
                                style={styles.button}
                                onClick={this.props.setStep}
                            />
                        </React.Fragment>
                    </MuiThemeProvider>
                </div>
            );
        }
      };

    render() {
        return (
            <div>
        <MuiThemeProvider>
          <AppBar
            position="fixed"
            title={<typography className={this.state.open ? 'hidden' : 'shown'}>{this.MenuName()}</typography>}
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
            <MenuItem onClick={this.handleMenuClick2.bind()}>Nouvelle Histoire</MenuItem>
            <Divider />
            <ListItemText className="AppBarHistoire">Histoires : </ListItemText>
            {this.state.words.map((word) => (
                <MenuItem onClick={() => this.handleMenuClick(word.id, true)}>{word.Title}</MenuItem>
            ))
            }
          </Drawer>
        </MuiThemeProvider>
        <div className={this.state.open ? 'hidden' : 'shown'}>
            {this.menuControl()}
        </div>
      </div>
        );
    }
}

const styles = {
    button: {
        margin: 15
    },
}

export default Success;
