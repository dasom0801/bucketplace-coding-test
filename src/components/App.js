import React, { Component } from 'react';
import axios from 'axios';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isLoading: false,
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
    const { isLoading } = this.state;
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 300) {
      if(!isLoading) {
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

  toggleScrap = ({id, scrapIndex}) => {
    const { scrapList } = this.state,
          updatedList = scrapIndex > -1 ? [...scrapList.slice(0, scrapIndex), ...scrapList.slice(scrapIndex+1)] : [...scrapList, id];
    this.setState({
      scrapList: updatedList
    });
    this.updateLocaStorage(updatedList);
  }

  updateLocaStorage = (updatedList) => {
    window.localStorage.setItem('scrap', JSON.stringify(updatedList));
  }

  render() { 
    const { imageList, scrapList } = this.state,
          { toggleScrap } = this;
    return (
      <List 
        imageList={imageList}
        scrapList={scrapList}
        toggleScrap={toggleScrap}
      />
    );
  }
}
 
export default App;