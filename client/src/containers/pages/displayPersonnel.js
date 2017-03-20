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
      //console.log(this.state.persons);
        return(

                // <ul>{
                //     this.state.persons.map((person)=>{
                //         console.log("Does it come here??")
                //         return(
                //         <li> <strong> {person.army_number}</strong> : {person.name} </li>)
                //     })
                // }
                // </ul>
                <table className="table">
                    <thead>
                        <tr >
                            <th>Army Number</th>
                            <th>Name</th>
                            <th>Rank</th>
                            <th>Current Unit</th>
                        </tr>
                        </thead>

                        {
                            this.state.persons.map((person)=>{
                                return(
                                    <tr key={person._id}>
                                        <th scope="row">{person.army_number}</th>
                                        <td>{person.name}</td>
                                        <td>{person.rank}</td>
                                        <td>{person.current_unit}</td>
                                        <td><button bsStyle='success' onClick={()=>this.deletePerson(person._id)}>Delete Person</button></td>
                                        <td><button bsStyle='success' onClick={()=>this.editPerson(person._id)}>Edit</button></td>
                                        <td><button bsStyle='success' onClick={()=>this.viewPerson(person._id)}>View Person</button></td>

                                    </tr>

                                )
                            })
                        }
                </table>
);

    }
    deletePerson(id){
        superagent.delete('/api/persons').send({_id:id}).end((err,res)=>{
            if(!err){
                console.log("deleted");
            }
            else{
                console.log("error occured");
            }
        });
        console.log("Clicked"+id);

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
