import React, { Component } from 'react';
import axios from 'axios';
import List from '../components/List';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isLoading: false,
      listData: []
    }
  }

  componentDidMount() {
    this.fetchData();
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  fetchData = () => {
    const { page, listData } = this.state
    axios.get(`http://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_${page}.json`)
      .then(res => {
        this.setState({
          page: page + 1,
          listData: [...listData , ...res.data]
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
  render() { 
    const { listData } = this.state
    return (
      <List listData={listData}/>
    );
  }
}
 
export default ListContainer;