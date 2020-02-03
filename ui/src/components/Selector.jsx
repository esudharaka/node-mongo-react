import React from "react";
// import { ImageSelector } from 'ImageSelector';
import  _ from  'lodash';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Selector = ({ onImageSelection, currentSelection, imageId, source}) => {

    return (
        <div className="imageSelector">
            {/*<select>
            { currentSelection.map( (item) => {
                // const shouldDisable =  ? 'disabled' : '';
                return ( <option value="volvo" disabled={_.isNull(currentSelection.image)} > Select as {item.index} Photo</option> )
            })}*/}
            {/*</select>*/}
            <Select
                options={currentSelection}
                onChange={(val)=> {onImageSelection( {  imageId: imageId, index: val.index, source: source })}}
            />
        </div>
    );

};