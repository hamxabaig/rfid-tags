import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PageWrapper from '../../components/page/PageWrapper';
import superagent from 'superagent';
import NotificationSystem from 'react-notification-system';

export default class FingersPage extends Component{
    constructor(props){
        super(props);
        this.fingers = [];
    }
    state = {

    };

    componentDidMount(){

    }
    render(){
        return(

            <div className="row">
                <div className={`col-lg-12 table-responsive col-lg-offset-1`}>
                    <div>

                    </div>
                </div>
            </div>
        );

    }

    saveName = (key) => {
        superagent.put(`/api/fingers/${this.state.fingers[key]._id}`).send({name: this.fingers[key].value}).set('Authorization', localStorage.getItem('jwt')).end(() => {
            this.state.fingers[key].name = this.fingers[key].value;
            this.setState({fingers: this.state.fingers});
        });
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
