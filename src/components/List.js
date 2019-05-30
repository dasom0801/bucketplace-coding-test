import React from 'react';
import ListItem from './ListItem';

const List = ({imageList, scrapList, toggleScrap}) => {
  const list = imageList.map(data => {
    const scrapIndex = scrapList.indexOf(data.id); 
    return (
    <ListItem 
      key={data.id}
      toggleScrap={toggleScrap}
      scrapIndex={scrapIndex}
      {...data}
    />
  )})
  return ( 
    <ul className="image-list">
      { list }
    </ul>
   );
}
 
export default List;