import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import './css/main.css';
import firebase from './config';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import AllStorie from './Storie/AllStorie';
import NewStorie from './Storie/NewStorie';
import Storie from './Storie/Storie';

export class Main extends Component {
    
    
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



    handleMenuClick = (id, pro) => {
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
                <AllStorie
                    len={len}
                    words={this.state.words}
                    handleMenuClick={this.handleMenuClick}
                />
            );
        } if (this.state.pageNumber === 3)
        {
            return (
                <Storie
                    book={this.state.book}
                />
            );
        } else
        {
            return (
                <NewStorie
                    len={len}
                    setStep={this.props.setStep}
                />
            );

        }
      };

    render() {
        return (
            <div>
                <div>
                    <MuiThemeProvider>
                        <AppBar
                            className="AppBar1"
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
            </div>
                <div className={this.state.open ? 'hidden' : 'shown'}>
                    <div className="mainDiv">
                        {this.menuControl()}
                    </div>
                </div>
            </div>
      
        );
    };
};

export default Main;
