// Dependencies
import React from 'react';

// CSS
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="banner">
        <h1 className="title">Man vs. Potato</h1>
        <h2 className="quote">One man's crazy idea for an ultra-marathon.</h2>
      </div>
      <div className="race-info">
        <div className="description">
          <p>Beginning in sunny and beautiful Claremont, California, this ultra-marathon
            will certainly test your endurance. Featuring residential and city running,
            as well as trail running, your skill will be tested as you attempt to ascend
            Mt. San Antonio and return to the start. The race is 39.27 miles long, with
            over 9,000 feet of elevation gain.
          </p>
          <p>
            Registration is ongoing. No date is currently set for the race.
          </p>
        </div>
        <div className="map" alt="route map">
        </div>
      </div>
    </div>
  )
}