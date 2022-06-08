import React from  'react'
import ReactPlayer from 'react-player'

export default function Video(){
    return(
        <div className="video-container">
            <ReactPlayer className="video-display"
             url={"https://www.youtube.com/watch?v=zyWpnsJ0JIM"}
             muted={true}
             controls={false}
             playing={true}
             width={'100%'}
             height={'100%'}
            />
           
        </div>
    )
}