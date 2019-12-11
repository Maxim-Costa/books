import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton} from 'material-ui';

export class NewStorie extends Component {

    render() {
        return (
            <div>
                <h1>Nouvelle histoire :</h1>
                <p>ajouter une nouvelle histoire :</p>
                <p>#NbHistoir : {this.props.len}</p>
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
    };
};
const styles = {
    button: {
        margin: 15
    },
}

export default NewStorie;
