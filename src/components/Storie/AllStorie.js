import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Chip from '@material-ui/core/Chip';
import ScheduleIcon from '@material-ui/icons/Schedule';
import FaceIcon from '@material-ui/icons/Face'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import '../css/storie.css';


export class AllStorie extends Component {

    
    countWords(str) {
        var matches = str.match(/[\w\d’'-]+/gi);
        var matches2 = matches ? matches.length : 0;
        matches2 = Math.floor(matches2/300)+1
        return matches2 + " min"

    }

    sok() {
        const len = this.props.len;
        if (len > 1) {
            return "s"
        }else {
            return ""
        }

    }

    render() {
        const len = this.props.len;
        const words = this.props.words;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <h1>
                        <u>
                            <b>Toutes les histoires : </b>
                        </u>
                    </h1>
                    <th className="twix">{len ? "NbHistoire"+this.sok()+" : "+len : ''}</th>
                    {len ? 
                    <p className="Pclient">
                        {words.map((word) => {   
                                return (
                                    <th className="ThClient" style={{ width: 350 }}>
                                        <List >
                                            <ListItem>
                                            <ListItemSecondaryAction>
                                            <MenuBookIcon onClick={() => this.props.handleMenuClick(word.id )} edge="end" aria-label="comments"/>
                                            </ListItemSecondaryAction>
                                                <h2 id={word.id}>{word.Title}</h2>
                                            </ListItem>
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
                                                multiple
                                                primaryText="Détails : "
                                                secondaryText={
                                                <div className="test tagss">
                                                <div className="tagss tagsss">
                                                    {word.Categorie.split(',').map((liste) => (
                                                        <th className="thTags" > 
                                                        <Chip 
                                                            color="primary" 
                                                            size="small" 
                                                            label={liste}  
                                                            icon={
                                                                <LocalOfferIcon />
                                                            } 
                                                        />
                                                        &nbsp;
                                                        </th>
                                                    ))}
                                                    <Chip 
                                                        color="primary" 
                                                        size="small" 
                                                        label={this.countWords(word.Histoire)}  
                                                        icon={
                                                            <ScheduleIcon />
                                                        } 
                                                    />
                                                    <Chip
                                                        color="primary"
                                                        label={word.Auteur} 
                                                        size="small" 
                                                        icon={
                                                            <FaceIcon />
                                                    }/>
                                                    <Chip
                                                        color="primary"
                                                        label={word.Date} 
                                                        size="small" 
                                                        icon={
                                                            <CalendarTodayIcon />
                                                    }/>
                                                </div>
                                                </div>
                                                }
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
    };
};
export default AllStorie;