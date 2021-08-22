import React from 'react'
import { Helmet } from 'react-helmet'
const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - MRK Modas`}</title>
    </Helmet>
  )
}

export default MetaData
