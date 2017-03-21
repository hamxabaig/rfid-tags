import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PageWrapper from '../../components/page/PageWrapper';
import superagent from 'superagent';
import NotificationSystem from 'react-notification-system';

export default class FingersPage extends Component{
    constructor(props){
        super(props);
    }
    state = {
        fingers: []
    };

    componentDidMount(){
        superagent.get('/api/fingers').set('Authorization', localStorage.getItem('jwt')).end((err,res) => {
            if(!err){
                this.setState({fingers: res.body});
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
            <div className="row">
                <div className={`col-lg-12 table-responsive col-lg-offset-1`}>
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
                            this.state.fingers.map((finger, key)=>{
                                return(
                                    <tr key={finger._id}>
                                        <th scope="row">{finger.finger_id}</th>
                                        <td>{finger.name}</td>
                                        <td><button className='btn btn-danger' onClick={()=>this.deleteFinger(finger.finger_id, key)}>Delete Finger</button></td>
                                    </tr>

                                )
                            })
                        }
                    </table>
                </div>
            </div>
        );

    }

    deleteFinger(id, index){
        superagent.delete(`/api/fingers/${id}`).set('Authorization', localStorage.getItem('jwt')).end((err,res)=>{
            if(!err){
                this.state.fingers.splice(index, 1);
                this.setState({fingers: this.state.fingers});
                console.log("deleted");
            }
            else{
                console.log("error occured");
            }
        });
        console.log("Clicked"+id);

    }
}
