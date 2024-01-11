import React from 'react'
import Thumbnails from './Thumbnails.jsx'

export default function ThumbnailsContainer(props) {
  const { mvpName, mapName } = props

  return (
    <div style={{ display: 'flex', flexDirection: 'row', columnGap: '16px' }}>
      <div className='newMvp_thumbnail_container'>
        <Thumbnails type='mvp' mvpName={mvpName} />
      </div>
      <div className='newMvp_thumbnail_container'>
        <Thumbnails type='map' mapName={mapName} />
      </div>
    </div>
  )
}
