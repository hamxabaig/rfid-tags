import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PageWrapper from '../../components/page/PageWrapper';
import superagent from 'superagent';
import NotificationSystem from 'react-notification-system';

export default class displayPeronnel extends Component{
    constructor(props){
        super(props);
        this.persons=[];
    }

    componentDidMount(){
        alert("did Mount personnel");
        superagent.get('/api/persons').end(function(err,res){
            if(!err){
                this.persons=res.body;
                console.log(this.persons);
            }else{
                console.log("an error occured");
            }
        });

    }
    render(){
        return(
            <div>
                <h1>Success</h1>
                    {console.log(this.persons)}
                </div>
);

    }
    getPersons (){
        superagent.get('/api/persons').end(function(err,res){
            if(!err){
                const persons= res.body;
                return persons;
                console.log(persons);
            }else{
                console.log("an error occured");
            }
        });
    }
}
