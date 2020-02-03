import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import { AllImages } from "./components/AllImages";
import { SelectedImages } from "./components/SelectedImages";
import AppContext from './context';


class App extends Component {

  constructor(props) {
    super(props);
    const createDefaultContext = () => {
      const selectedImages = [];
      _.times(9, (i) => {
        selectedImages.push({
          'index': i
        })
      });
      return selectedImages;
    };
    this.state = {
      selectedPhotos: createDefaultContext(),
      alreadySavedPictures: []

    };
    this.updateSelectedPictures = selection  => {
      const itemIndex = this.state.selectedPhotos.findIndex((item) => item.imageId === selection.imageId);
      if (itemIndex > -1) {
        return;
      }
      const updatedSelection = this.state.selectedPhotos.map((item) => {
        if (item.index !== selection.index) {
          return item;
        } else {
          return selection;
        }
      });
      this.setState({selectedPhotos : updatedSelection});
    };

    this.setAlreadySavedPics = savedPics => {
      console.log("saving savedPics", savedPics);


      this.setState({alreadySavedPictures : savedPics});
    }
  }


  render() {
    const  selectedPhotos = this.state.selectedPhotos;
    const  alreadySavedPictures = this.state.alreadySavedPictures;
    console.log("state : " ,selectedPhotos);
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <div className= "container">
          <AppContext.Provider value={ {selectedPhotos : selectedPhotos, userName: 'esudharaka', alreadySavedPictures: alreadySavedPictures} }>
            <SelectedImages
            alreadySavedPictures={alreadySavedPictures}
            />
            <AllImages
                onUpdateSelectedPhotoes = {this.updateSelectedPictures}
                setAlreadySavedPics = {this.setAlreadySavedPics}
            />
          </AppContext.Provider>

        </div>

      </div>
    );
  }
}

export default App;
