import React from 'react';

const ListItem = ({ id, image_url, nickname, profile_image_url, toggleScrap, isScrapped}) => {
  return ( 
    <li className="list-item">
      <div className="user">
        <img className="user-image" src={profile_image_url} alt={`${nickname} 프로필 이미지`} />
        <span className="user-nickname">{nickname}</span>
      </div>
      <img className="list-item-image" src={image_url} alt="인테리어 이미지" />
      <button className={`scrap ${isScrapped ? 'scrap-on' : 'scrap-off'}`} onClick={() => toggleScrap({id, isScrapped, url: image_url})}>스크랩 </button>
    </li>
  );
}
 
export default ListItem;