import React from 'react';
import ListItem from './ListItem';

const List = ({listData}) => {
  const list = listData.map(data => (
    <ListItem 
      key={data.id}
      {...data}
    />
  ))
  return ( 
    <ul className="image-list">
      { list }
    </ul>
   );
}
 
export default List;