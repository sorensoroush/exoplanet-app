import React from 'react'

const Loading = () => {
  return (
    <div id="loading">
      <div className="textbg">
        <h1>Loading...</h1>
        <h4>Fetching the NASA exoplanet database, this will take about 5-10 seconds.</h4>
      </div>
    </div>
  )
}

export default Loading
