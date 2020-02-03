import React, { useState, useEffect } from "react";
// import axios from 'axios';
import _ from 'lodash';
// import { Image} from "./image";
import axios from 'axios';
import { API_HOST} from '../constants'

import AppContext from '../context';
import { Button } from 'react-bootstrap';



export const SelectedImages = ( { alreadySavedPictures }) => {

    const saveSelection = async ({ selectedPhotos, userName }) => {
        const selectedImages = selectedPhotos.filter((image) => !_.isNil(image.imageId) );
        if( selectedImages.length !== 9) {
            console.log("more pics to select");
            return ;
        }
        axios.post(`${API_HOST}/save-images`, { selectedImages, userName  })
            .then(res => {
                console.log(res);
            });

    };
    return (
        <AppContext.Consumer>
            {
                ({ selectedPhotos, userName, alreadySavedPictures }) => {
                    console.log('alreadySavedPictures');
                    console.log("alreadySavedPictures", alreadySavedPictures );
                    console.log(userName);
                    console.log("selectedPhotos", selectedPhotos);

                    const shouldLoadAlreadySaved = !_.isEmpty(alreadySavedPictures);
                    return (
                        <div className= "selectedImages">

                            {shouldLoadAlreadySaved ? <h1>Your Saved Images</h1> : <h1> Your current selecting images..</h1>}
                            <div className="selectedContainer">
                            {
                                !shouldLoadAlreadySaved ? selectedPhotos.map((item) => {
                                    return (
                                       <div className="selectedImg">
                                        <img src={item.source} />
                                            <p>Selected as: {item.index + 1} Image</p>
                                      </div>
                                        )
                                }) : alreadySavedPictures.map((item) => {
                                    return (
                                        <div className="selectedImg">
                                            <img src={item.source} />
                                            <p>Selected as: {item.index + 1} Image</p>
                                        </div>
                                    )
                                })
                            }

                            </div>
                            <div>
                                <Button
                                    variant="info"
                                    disabled={false}
                                    onClick={ () => saveSelection({ selectedPhotos, userName })}
                                >
                                   Save Selection
                                </Button>
                            </div>
                        </div>
                    );
                }
            }

        </AppContext.Consumer>
    );

};
// const imageDivs =  _.isEmpty(images) ? 'Loading Images' :
//     images.map((info) => <Image
//         source={info.picture}
//         id={info.id}
//         currentSelection = {currentSelection}
//         onImageSelection = {onImageSelection}
//     />);