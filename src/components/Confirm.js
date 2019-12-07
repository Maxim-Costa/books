import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import firebase from './config';


export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        // PROCESS FORM //
        const { values: { description, title, categorie, date, histoire, auteur } } = this.props;
        var len = Object.keys( this.state.words ).length;
        // ********************* //
        //len += 1;
        console.log()
        if (!(description) || !(title) || !(categorie) || !(date) || !(histoire) || !(auteur) ) {
            console.log("error value empty")
        } else {
            firebase.database().ref('words/' + len).set({
                Description: description,
                Title: title,
                Categorie: categorie,
                Date: date, 
                Histoire: histoire,
                Auteur: auteur
            });
            this.props.nextStep();
        }

        // ********************* //
        

        // FNISH PROCESS //
        
    };
    
        // ************************************* START ** FIREBASE ***************************************************** //
 
        componentDidMount() {
            const UserRef = firebase.database().ref('words');
            UserRef.on('value', (snapshot) => {
                let words = snapshot.val();
                let newState = [];
                for (let word in words) {
                    newState.push({
                        id: word,
                        Description:words[word].Description,
                        Title:words[word].Title,
                        Categorie:words[word].Categorie,
                        Date:words[word].Date, 
                        Histoire:words[word].Histoire,
                        Auteur: words[word].Auteur
                    });
                }
                this.setState({
                    words: newState
                });
            });
        }
  
      // ************************************* FINISH ** FIREBASE ***************************************************** //
  

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    render() {
        const { values: { description, title, categorie, date, histoire, auteur } } = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar title="Confirm User Data"/>
                    <List>
                        <ListItem
                            primaryText="Title"
                            secondaryText={ title }
                        />
                        <ListItem
                            primaryText="Description"
                            secondaryText={ description }
                        />
                        <ListItem
                            primaryText="Categorie"
                            secondaryText={ categorie }
                        />
                        <ListItem
                            primaryText="Date"
                            secondaryText={ date }
                        />
                        <ListItem
                            primaryText="Histoire"
                            secondaryText={ histoire }
                        />
                        <ListItem
                            primaryText="Histoire"
                            secondaryText={ auteur }
                        />
                    </List>
                    <br/>
                    <RaisedButton
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
                    />
                    <RaisedButton
                        label="Confirm & Continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />
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

export default Confirm;
