import React from 'react';
import imgThird from './myImages/play-svgrepo-com (6).png'
import './ThirdSec.css'
import video from './myImages/clideo_editor_ceeab6fe86cc45058c5eca7c0ba3fc83.mp4'

export default function ThirdSec() {
  function showVideo(){
    let videoo = document.getElementById('video')
    if(videoo.style.display = 'none'){
      videoo.style.display = 'block'
    }
  }

  function hideVideo(){
    let videoo = document.getElementById('video')
    if(videoo.style.display = 'block'){
      videoo.style.display = 'none'
    }
  }
  return (
    <div className="third-sec" onDoubleClick={hideVideo}>
            <div className="all" onClick={showVideo}>
            <div className="neww"><img src={imgThird}/></div>
            <div className="old"></div>
            </div>
            <video width="910" height="510" controls className='third-video' id='video'>
      <source src={video} type="video/mp4" />
      <source src={video} type='video/ogg'/>
      Your browser does not support the video tag.
    </video>
        </div>
  )
}
