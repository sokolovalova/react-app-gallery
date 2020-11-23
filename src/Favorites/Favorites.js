import React from 'react';
import styles from './Favorites.module.scss';
import { getLocalStorage, Storage_KEY, setToLocalStorage } from '../utils/storage';
import { setRandomKey } from '../utils/subsidiary';

class Favorites extends React.Component {

  constructor(props) {
    super();
    this.state = {
      photosSrc: null,
      modalWinWithLargePhotoData: {
        isOpen: false,
        activePhoto: null,
      }
    }
  };

  async onClickDeleteFromFavorites() {
    let arrSrc = getLocalStorage(Storage_KEY).split(',');
    console.log("do", arrSrc);
    await arrSrc.splice(arrSrc.indexOf(this.state.modalWinWithLargePhotoData.activePhoto), 1);
    await console.log("posle", arrSrc);
    setToLocalStorage(Storage_KEY, arrSrc);
    this.setInitialState();
    this.onClickCloseModalWindow();

  }

  onClickCloseModalWindow() {
    this.setState({
      modalWinWithLargePhotoData: {
        isOpen: false,
        activePhoto: "",
      }
    });
  }

  onClickImg(event) {
    this.setState({
      modalWinWithLargePhotoData: {
        isOpen: true,
        activePhoto: event.target.src,
      }
    });
  }

  renderFavoriteGallery() {
    return (
      <div className={styles.gallery}>
        <div className={styles.conteinerWithPhotos}>
          {this.state.photosSrc.map((el, i) => {
            return (
              <span key={setRandomKey()} className={styles.imgCard}>
                <img
                  key={setRandomKey()}
                  className={styles.imgStyle}
                  src={el} alt={`photo#${i}`}
                  onClick={this.onClickImg.bind(this)}
                ></img>
              </span>)
          })}
        </div>
      </div>
    );

  }

  setInitialState() {
    let arrPhotosSrc = getLocalStorage(Storage_KEY).split(',');
    arrPhotosSrc.splice(arrPhotosSrc.indexOf(""), 1);
    if (arrPhotosSrc.length === 0)
      arrPhotosSrc = null;
    this.setState({ photosSrc: arrPhotosSrc });
  }

  renderModalWindowWithLargePhoto() {
    return (
      <div className={styles.overflowModalWin}>
        <div className={styles.modalWin}>
          <span><p className={styles.closer} onClick={this.onClickCloseModalWindow.bind(this)}>X</p></span>
          <div className={styles.modalContent}>
            <img className={styles.showModalImage} src={this.state.modalWinWithLargePhotoData.activePhoto}></img>
            <span>
              <p className={styles.deleter} onClick={this.onClickDeleteFromFavorites.bind(this)}>Delete: <i class="far fa-trash-alt"></i></p>
              <p className={styles.helpInUse}>*You can delete this photo from favorites</p>
            </span>

          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setInitialState();
  }

  render() {
    return (
      <div >
        <div className={styles.favoritesGallary}>
          {this.state.photosSrc === null ? null : this.renderFavoriteGallery()}
          {this.state.modalWinWithLargePhotoData.isOpen === true ? this.renderModalWindowWithLargePhoto() : null}
        </div>
      </div>
    );

  }

}



export { Favorites };