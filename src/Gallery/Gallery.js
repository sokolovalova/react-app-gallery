import React from 'react';
import styles from './Gallery.module.scss';
import { getLocalStorage, Storage_KEY, setToLocalStorage } from '../utils/storage';
import {setRandomKey} from '../utils/subsidiary';
class Gallery extends React.Component {

  constructor(props) {
    super();
    this.state = {
      view: 1,
      styleView: styles.imgCard1,
      numberShownPhotos: 10,
      arrPhotos: null,
      modalWinWithLargePhotoData: {
        isOpen: false,
        activePhoto: null,
      }
    };
  }

  onChangeSelect(event) {
    this.setState({ numberShownPhotos: event.target.value });
    this.setState({ arrPhotos: null });
    this.uploadUrlPhotosToState();
  }

  onClickChangeStyleView(event) {
    this.setState({ view: event.target.id });
    switch (Number(event.target.id)) {
      case 1: {
        this.setState({ styleView: styles.imgCard1 });
        break;
      }
      case 2: {
        this.setState({ styleView: styles.imgCard2 });
        break;
      }
      case 3: {
        this.setState({ styleView: styles.imgCard3 });
        break;
      }
    }
  }

  onClickImg(event) {
    this.setState({
      modalWinWithLargePhotoData: {
        isOpen: true,
        activePhoto: event.target.src,
      }
    });

  }

  onClickCloseModalWindow() {
    this.setState({
      modalWinWithLargePhotoData: {
        isOpen: false,
        activePhoto: "",
      }
    });
  }

  onClickAddToFavorites(event) {
    let src = this.state.modalWinWithLargePhotoData.activePhoto;
    let arr = [];

    if (getLocalStorage(Storage_KEY) !== null)
      arr = getLocalStorage(Storage_KEY).split(',');

    if (arr.indexOf(src) === -1) {
      arr.push(src);
      setToLocalStorage(Storage_KEY, arr);
    }
  }

  async fetchPhotos() {
    let arrPhotosURL = [];
    for (let i = 0; i < this.state.numberShownPhotos; i++)
      arrPhotosURL.push(await fetch("https://picsum.photos/800").then(resp => resp.url));
    return await arrPhotosURL;

  }
  async uploadUrlPhotosToState() {
    let buferUrls = await this.fetchPhotos();
    await this.setState({ arrPhotos: buferUrls });
  }

  renderGallery = () => {
    return (
      <div key={setRandomKey()} className={styles.gallery}>
        <div key={setRandomKey()} className={styles.conteinerWithPhotos}>
          {this.state.arrPhotos.map((el, i) => {
            // console.log(document.getElementById("33"));
            return (
              <span key={setRandomKey()} className={this.state.styleView}>
                <img
                  key={setRandomKey()}
                  className={styles.imgStyle}
                  src={el} alt={`photo#${i}`}
                  onClick={this.onClickImg.bind(this)}></img>
              </span>)
          })}
        </div>
      </div>
    );
  }

  renderLoader = () => {
    return (<div key={setRandomKey()} className={styles.loader}></div>)
  }

  renderUpperSettingPanel = () => {
    return (
      <div className={styles.head}>
        <div className={styles.flexConteiner}>
          <span>
            <p>Show </p>
            <select key={17} className={styles.selectConteiner} onChange={this.onChangeSelect.bind(this)}>
              <option key={10}>10</option>
              <option key={20}>20</option>
              <option key={50}>50</option>
              <option key={100}>100</option>
            </select>
            <p>photos </p>
          </span>
          <div>
            <button
              onClick={this.onClickChangeStyleView.bind(this)}
              key={setRandomKey()} id={1}
              className={styles.viewBtn}>1</button>
            <button
              onClick={this.onClickChangeStyleView.bind(this)}
              key={setRandomKey()} id={2}
              className={styles.viewBtn}>2</button>
            <button
              onClick={this.onClickChangeStyleView.bind(this)}
              key={setRandomKey()} id={3}
              className={styles.viewBtn}>3</button>
          </div>
        </div>
      </div>
    )
  }

  renderModalWindowWithLargePhoto() {
    return (
      <div className={styles.overflowModalWin}>
        <div className={styles.modalWin}>
          <span><p className={styles.closer} onClick={this.onClickCloseModalWindow.bind(this)}>X</p></span>
          <div className={styles.modalContent}>
            <img className={styles.showModalImage} src={this.state.modalWinWithLargePhotoData.activePhoto}></img>
            <span>
              <p className={styles.liker} onClick={this.onClickAddToFavorites.bind(this)}>Like: <i class="fas fa-heart"></i></p>
              <p className={styles.helpInUse}>*You can add this photo in favorites</p>
            </span>

          </div>
        </div>
      </div>
    );
  } 

  componentDidMount() {
    this.uploadUrlPhotosToState();
  }

  render() {
    return (
      <div>
        {this.renderUpperSettingPanel()}
        { this.state.arrPhotos === null ? this.renderLoader() : this.renderGallery()}
        {this.state.modalWinWithLargePhotoData.isOpen === true ? this.renderModalWindowWithLargePhoto() : null}
      </div>
    );
  }
}
export { Gallery };