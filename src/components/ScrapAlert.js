import React from 'react';
import '../styles/Alert.scss';

const ScrapAlert = ({isAlertOn, url, toggleScrapAlert, isScrapCancel}) => {
  const alertMessage = isScrapCancel? '스크랩을 취소하였습니다.' : '스크랩을 추가하였습니다.';
  return isAlertOn && ( 
    <div className="scrap-alert">
      <img src={url} alt="스크랩 이미지" />
      <p className="alert-message">{alertMessage}</p>
      <button className="close" onClick={()=>toggleScrapAlert({bool:false, url: url, isScrapCancel})}> X </button>
    </div>
  );
}
 
export default ScrapAlert;