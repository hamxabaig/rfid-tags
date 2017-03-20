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
  state = {
    persons: []
  };

    componentDidMount(){
        alert("did Mount personnel");
        superagent.get('/api/persons').end((err,res) => {
            if(!err){
              this.setState({persons: res.body});
                console.log(res.body);
            }else{
                console.log("an error occured");
            }
        });

    }
    render(){
      console.log(this.state.persons);
        return(
            <div>
                <h1>Success</h1>
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
