import React from 'react';
import ListItem from './ListItem';
import '../styles/List.scss';

const List = ({imageList, scrapList, toggleScrap, isFilterOn}) => {
  const list = imageList.map(data => {
    const isScrapped = scrapList.indexOf(data.id) > -1; 
    const listItem = (
      <ListItem 
        key={data.id}
        toggleScrap={toggleScrap}
        isScrapped={isScrapped}
        {...data}
      />
    );
    return isFilterOn ? (isScrapped && listItem) : listItem;
  });

  return ( 
    <ul className="image-list">
      { list }
    </ul>
   );
}
 
export default List;