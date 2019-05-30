import React from 'react';

const ListItem = ({ id, image_url, nickname, profile_image_url, toggleScrap, isScrapped}) => {
  return ( 
    <li className="image-list-item">
      <div className="user">
        <img className="user-image" src={profile_image_url} alt={`${nickname} 프로필 이미지`} />
        <p className="user-nickname">{nickname}</p>
      </div>
      <img src={image_url} alt="인테리어 이미지" />
      <button className="scrap" onClick={() => toggleScrap({id, isScrapped})}>스크랩 {isScrapped ? 'O' : 'X'}</button>
    </li>
  );
}
 
export default ListItem;