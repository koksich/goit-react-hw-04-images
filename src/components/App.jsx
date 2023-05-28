import { Component } from 'react';

import { fetchImages } from 'Services/Api';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    per_page: 12,
    isLoading: false,
    loadMore: false,
    error: null,
    showModal: false,
    largeImageURL: 'largeImageURL',
    id: null,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true });
    if (!searchQuery) {
      return;
    }
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loadMore: page < Math.ceil(totalHits / this.state.per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  formSubmit = searchQuery => {
    this.setState({
      searchQuery,
      images: [],
      page: 1,
      loadMore: false,
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  }

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL, 
  })
}

  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }
  
  render() {
    const { images, isLoading, loadMore, page, showModal, largeImageURL } =
      this.state;
    return (
      <>
        <SearchBar onSubmit={this.formSubmit} />
        {isLoading ? <Loader /> : (<ImageGallery images={images} openModal = {this.openModal} />)}
        {!isLoading && loadMore && (
          (<Button onLoadMore={this.onLoadMore} page={page} />)
        )}
        {showModal && (<Modal onClose={this.closeModal} largeImageURL={largeImageURL}>
        </Modal>)}
      </>
    );
  }
}
