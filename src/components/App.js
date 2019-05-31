import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import '../styles/App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isLoading: false,
      isFilterOn: false,
      imageList: [],
      scrapList: []
    }
  }

  componentDidMount() {
    this.fetchData();
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
    this.setState({
      scrapList: JSON.parse(window.localStorage.getItem('scrap'))
    })
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  fetchData = () => {
    const { page, imageList } = this.state
    axios.get(`http://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_${page}.json`)
      .then(res => {
        this.setState({
          page: page + 1,
          imageList: [...imageList , ...res.data]
        });
        this.changeLoadingStatus(false);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleScroll = () => {
    const { isLoading, isFilterOn } = this.state;
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      if(!isLoading && !isFilterOn) {
        this.fetchData();
        this.changeLoadingStatus(true);
      } else {
        return false;
      }
    };
  }

  changeLoadingStatus = (bool) => {
    this.setState({
      isLoading: bool
    });
  }

  toggleScrap = ({id, isScrapped}) => {
    const { scrapList } = this.state,
          updatedList = isScrapped ? [...scrapList.filter(scrapId => scrapId !== id )] : [...scrapList, id];
    this.setState({
      scrapList: updatedList
    });
    this.updateLocalStorage(updatedList);
  }

  updateLocalStorage = (updatedList) => {
    window.localStorage.setItem('scrap', JSON.stringify(updatedList));
  }

  toggleFilter = () => {
    this.setState({
      isFilterOn: !this.state.isFilterOn 
    })
  }

  render() { 
    const { imageList, scrapList, isFilterOn } = this.state,
          { toggleScrap, toggleFilter } = this;
    return (
      <div className="App">
        <button className={`filter ${isFilterOn ? 'filter-on' : 'filter-off' }`} onClick={toggleFilter}>스크랩한 것만 보기</button>
        <List 
          imageList={imageList}
          scrapList={scrapList}
          toggleScrap={toggleScrap}
          isFilterOn={isFilterOn}
        />
      </div>
    );
  }
}
 
export default App;