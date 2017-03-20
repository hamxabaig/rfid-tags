import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import FormBuilder from 'helpful-form-builder';

export default class bootStrapForm extends React.Component{
    savePressed() {
        //Save your data...
        console.log(ArmyNumber.value);
    }

    deletePressed() {
        //Delete the object here...
    }

    render() {

        // This can come from props or wherever the developer generates this data.
        const formValues = {
            FirstName: "Doctor",
            LastName: "Who",
            ArmyNumber:"",
            FavoritePlanet: "Earth"
        };

        const formOptions = {
            FavoritePlanet: ["Earth", "Gallifrey", "Jupiter"]
        };

        return (
            <div>
                <FormBuilder
                    editAttributes={formValues}
                    selectorOptions={formOptions}
                    onSavePressed={this.savePressed.bind(this)}
                    onDeletePressed={this.deletePressed.bind(this)}/>
            </div>
        )
    }
}
