import { useEffect, useState } from 'react';

import { fetchImages } from 'Services/Api';

import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';


export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const per_page = 12;

  useEffect(() => {
    getImages(searchQuery, page);
  }, [searchQuery, page]);

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) { return; }
        setIsLoading(true);

  
    try {
      const { hits, totalHits } = await fetchImages(searchQuery, page);
      if (hits.length === 0) {
        return alert('Notnig found')
      }

      setImages(prevImages => [...prevImages, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));

    } catch (error) {
      setError(error)
    } finally { setIsLoading(false) }
  };

  const formSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
    setLoadMore(false);
  }

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
}

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
}

  const closeModal = () => {
    setShowModal(false);
  }
  
  return (
      <>
        <SearchBar onSubmit={formSubmit} />
        {isLoading && images.length === 0 ? <Loader /> : (<ImageGallery images={images} openModal = {openModal} />)}
      { error && <p>Something went wrong</p> } 
      {!isLoading && loadMore && (
          (<Button onLoadMore={onLoadMore} page={page} />)
        )}
        {showModal && (<Modal onClose={closeModal} largeImageURL={largeImageURL}>
        </Modal >)}
      </>
    );
}

// export class App extends Component {
//   state = {
//     searchQuery: '',
//     images: [],
//     page: 1,
//     per_page: 12,
//     isLoading: false,
//     loadMore: false,
//     error: null,
//     showModal: false,
//     largeImageURL: 'largeImageURL',
//     id: null,
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuery, page } = this.state;
//     if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
//       this.getImages();
//     }
//   }

//   getImages = async () => {
//     const { searchQuery, page } = this.state;
//     this.setState({ isLoading: true });
//     if (!searchQuery) {
//       return;
//     }
//     try {
//       const { hits, totalHits } = await fetchImages(searchQuery, page);
//       this.setState(prevState => ({
//         images: [...prevState.images, ...hits],
//         loadMore: page < Math.ceil(totalHits / this.state.per_page),
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   formSubmit = searchQuery => {
//     this.setState({
//       searchQuery,
//       images: [],
//       page: 1,
//       loadMore: false,
//     });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   }

//   openModal = largeImageURL => {
//     this.setState({
//       showModal: true,
//       largeImageURL: largeImageURL, 
//   })
// }

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//     })
//   }
  
//   render() {
//     const { images, isLoading, loadMore, page, showModal, largeImageURL } =
//       this.state;
//     return (
//       <>
//         <SearchBar onSubmit={this.formSubmit} />
//         {isLoading ? <Loader /> : (<ImageGallery images={images} openModal = {this.openModal} />)}
//         {!isLoading && loadMore && (
//           (<Button onLoadMore={this.onLoadMore} page={page} />)
//         )}
//         {showModal && (<Modal onClose={this.closeModal} largeImageURL={largeImageURL}>
//         </Modal>)}
//       </>
//     );
//   }
// }
