import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PageWrapper from '../../components/page/PageWrapper';
import superagent from 'superagent';
import NotificationSystem from 'react-notification-system';

export default class displayPeronnel extends Component{
    constructor(props){
        super(props);
        this.persons=[];1
    }
  state = {
    persons: [],
    currentPerson: {}
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
      const { currentPerson } = this.state;
      const isShow = !!Object.keys(currentPerson).length;

        return(

                // <ul>{
                //     this.state.persons.map((person)=>{
                //         console.log("Does it come here??")
                //         return(
                //         <li> <strong> {person.army_number}</strong> : {person.name} </li>)
                //     })
                // }
                // </ul>
                <div className="row">
                    <div className={`${isShow ? 'col-lg-8' : 'col-lg-12'} table-responsive col-lg-offset-1`}>
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
                                    this.state.persons.map((person, key)=>{
                                        return(
                                            <tr key={person._id}>
                                                <th scope="row">{person.army_number}</th>
                                                <td>{person.name}</td>
                                                <td>{person.rank}</td>
                                                <td>{person.current_unit}</td>
                                                <td><button className='btn btn-danger' onClick={()=>this.deletePerson(person._id, key)}>Delete Person</button></td>
                                                <td><button className='btn btn-info' onClick={()=>this.editPerson(person._id)}>Edit</button></td>
                                                {!isShow &&
                                                <td><button className='btn btn-success' onClick={()=>this.viewPerson(person)}>View Person</button></td>
                                                }
                                            </tr>

                                        )
                                    })
                                }
                        </table>
                    </div>
                {
                    isShow &&
                    <div className="col-lg-3">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Name:</strong> {currentPerson.name}
                            </li>
                            <li className="list-group-item">
                                <strong>Army Number:</strong> {currentPerson.army_number}
                            </li>
                            <li className="list-group-item">
                                <strong>Date of Birth:</strong> {currentPerson.dob}
                            </li>
                            <li className="list-group-item">
                                <strong>Current Unit:</strong> {currentPerson.current_unit}
                            </li>
                            <li className="list-group-item">
                                <strong>Rank:</strong> {currentPerson.rank}
                            </li>
                            <li className="list-group-item">
                                <strong>Batch No:</strong> {currentPerson.batch_no}
                            </li>
                            <li className="list-group-item">
                                <strong>Medical Category:</strong> {currentPerson.med_cat}
                            </li>
                            <li className="list-group-item">
                                <strong>Trade:</strong> {currentPerson.trade}
                            </li>
                            <li className="list-group-item">
                                <strong>Military Courses:</strong> {currentPerson.mil_courses}
                            </li>
                            <li className="list-group-item">
                                <strong>Children:</strong> {currentPerson.children}
                            </li>
                            <li className="list-group-item">
                                <strong>Parents:</strong> {currentPerson.parents}
                            </li>
                            <li className="list-group-item">
                                <button className="btn btn-danger" onClick={()=>this.closePerson()}>Close</button>
                            </li>
                        </ul>
                    </div>
                }

                </div>
);

    }
    closePerson(){
        this.setState({currentPerson:{}});
    }
    deletePerson(id, index){
        superagent.delete(`/api/persons/${id}`).end((err,res)=>{
            if(!err){
                this.state.persons.splice(index, 1);
                this.setState({persons: this.state.persons});
                console.log("deleted");
            }
            else{
                console.log("error occured");
            }
        });
        console.log("Clicked"+id);

    }

    viewPerson(person) {
        this.setState({currentPerson: person});
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
