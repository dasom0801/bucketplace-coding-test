import React, { Component } from 'react';
import axios from 'axios';
import List from '../components/List';

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1, 
      listData: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { page, listData } = this.state
    axios.get(`http://s3.ap-northeast-2.amazonaws.com/bucketplace-coding-test/cards/page_${page}.json`)
      .then(res => {
        this.setState({
          page: page + 1,
          listData: [...listData , ...res.data]
        });
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