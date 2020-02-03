import React, { useState, useEffect } from "react";
import axios from 'axios';
import { API_HOST} from '../constants'
import  { Image} from "./image";
import _ from  "lodash";

export const AllImages = ( { onUpdateSelectedPhotoes, setAlreadySavedPics }) => {

    const onImageSelection = (value) => {
        console.log(value);
        const { imageId, index, source } = value;
        const filteredArray = currentSelection.filter((item) => item.index !== index);

        setCurrentSelection(filteredArray);
        onUpdateSelectedPhotoes({ imageId, index, source});

    };

    const populateInitialImageSelection = ()=> {
        const selection = [];
        _.times(9 , (i) => {
            selection.push( {
                index: i,
                label: `Select this ${i+1}`,
                value: '',
                isDisabled : false

            })
        });
        return selection;
    };

    const [images, setImages] = useState([]);
    const [ currentSelection, setCurrentSelection ] = useState( populateInitialImageSelection() );


    useEffect(() => {

        axios.get(API_HOST + '/userImages').then( (res) => {
            const selectedImages = res.data.selectedImages;
            if (!_.isEmpty(selectedImages)) {
                console.log('updating the state',res );
                setAlreadySavedPics( selectedImages);
            } else {
                axios.get(API_HOST + '/images')
                    .then(({ data }) => {
                        setImages(data);
                    });
            }
        });
    }, []);

    const renderImages = ( {images, currentSelection }) => {
        const imageDivs =  _.isEmpty(images) ? 'Loading Images' :
         images.map((info) => <Image
             source={info.picture}
             id={info.id}
             currentSelection = {currentSelection}
             onImageSelection = {onImageSelection}
         />);
        return (
            <div className="allImageContainer">
                {imageDivs}
            </div>
        );
    };

    return (
        <div className= "allImages">
            <h1>Select Your Images</h1>
            { renderImages({ images, currentSelection })}
        </div>
    );

};