import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    imgSense: '',
  };

  handleFormSubmit = imgSense => {
    this.setState({ imgSense });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imgSense={this.state.imgSense} />
      </>
    );
  }
}
