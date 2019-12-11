
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../css/storie.css';

export class Storie extends Component {

    render() {
        const book = this.props.book;
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
    };
};
export default Storie;
