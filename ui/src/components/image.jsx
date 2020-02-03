import React from "react";
// import { ImageSelector } from 'ImageSelector';
import { Selector} from "./Selector";

export const Image = ({ source, currentSelection, onImageSelection, id}) => {
    return (
        <div className="item">
            <img src={source} />
            {/*<input type="checkbox" name="vehicle1" value="Bike"></input>*/}
            <Selector
                currentSelection={ currentSelection}
                onImageSelection= {onImageSelection}
                imageId={id}
                source={ source }
            />
        </div>
    );

};