import React, { Component } from 'react';
import FormUserDetails from './NewStorie/FormUserDetails';
import FormPersonalDetails from './NewStorie/FormPersonalDetails';
import Confirm from './Confirm';
import Main from './Main';

export class UserForm extends Component {
    
    state = {
        step: 4,
        description: '',
        title: '',
        categorie: '',
        date: '',
        histoire: '',
        auteur: '',

    }

    // next step
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    }

    setStep = () => {
        
        this.setState({
            step: 1,
            description: '',
            title: '',
            categorie: '',
            date: '',
            histoire: '',
            auteur: ''
        });
    }
    setHStep = () => {
        
        this.setState({
            step: 4,
            description: '',
            title: '',
            categorie: '',
            date: '',
            histoire: '',
            auteur: ''
        });
    }

     // go back prev step
     prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        });
    }
    
    //Handle fields change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }

    handleChange1 = toto => {
        this.setState({categorie: toto})
    }

    handleChangeDate = date => {
        this.setState({date: date})
    }


    render() {
        const { step } = this.state;
        const { description, title, categorie, date, histoire, auteur } = this.state;
        const values = { description, title, categorie, date, histoire, auteur }
        switch(step) {
            case 1:
                return (
                    <FormUserDetails 
                        nextStep={this.nextStep}
                        setHStep={this.setHStep}
                        handleChange={this.handleChange}
                        handleChange1={this.handleChange1}
                        values={values}
                    />
                );
            case 2:
                return (
                    <FormPersonalDetails 
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        setHStep={this.setHStep}
                        handleChange={this.handleChange}
                        values={values}
                        handleChangeDate={this.handleChangeDate}
                    />
                );
            case 3:
                    return (
                        <Confirm 
                            nextStep={this.nextStep}
                            prevStep={this.prevStep}
                            values={values}
                        />
                    );
            case 4:
                return (
                    <Main
                        setStep={this.setStep}
                    />
                );
            default:
                return (
                    <Main 
                            setStep={this.setStep}
                    />
                );
        };
    };
};

export default UserForm;
