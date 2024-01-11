import React from 'react'
import { Card } from './cards/Card.jsx'
import { db } from '../database/db.js'
import { useLiveQuery } from 'dexie-react-hooks'
import ShortUniqueId from 'short-unique-id'

const CardsContainer = () => {
  const timedMvps = useLiveQuery(async () => {
    return await db.userSelection.where('timing').equals('true').toArray()
  })

  const uid = new ShortUniqueId({ length: 5 })

  return (
    <div
      style={{
        minWidth: '702px',
        // maxWidth: '702px',
        marginTop: '40px'
      }}
    >
      <h1 style={title}>MVP Timeados</h1>
      <div style={content}>
        {timedMvps
          ? timedMvps.map((data) => (
              <Card
                key={uid.rnd()}
                dataId={data.id}
                mvpName={data.mvpName}
                mapName={data.mapName}
                selectedDate={data.selectedDate}
              />
            ))
          : null}
      </div>
    </div>
  )
}

export default CardsContainer

const title = {
  color: '#DDDDDD',
  fontFamily: 'Roboto Flex',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 900,
  lineHeight: 'normal',
  marginBottom: '24px'
}

const content = {
  display: 'inline-flex',
  alignItems: 'flex-start',
  alignContent: 'flex-start',
  columnGap: '17px',
  rowGap: '27px',
  flexWrap: 'wrap'
}
