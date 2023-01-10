import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

export function AboutPage(){
  const [centerPos, setCenterPos] = useState({lat: 32.109333,lng: 34.855499})
  const places = [{txt: 'Tel Aviv', lat: 32.109333,lng: 34.855499},
                  {txt: 'Rehovot', lat: 31.894756, lng: 34.809322},
                  {txt: 'Haifa', lat: 32.794044, lng: 34.989571}]
  const renderMarkers = (map, maps) => {
    let markers = places.map(place => {
      let marker = new maps.Marker({
      position: { lat: place.lat, lng: place.lng },
      map,
      title: place.txt
      });
    })
    
    return markers;
  }

  return (
    <section className="about-page">
      <div style={{ height: '70vh' }} className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCmL2Wr3EopBGHsyPwuFyoJGahO0Dyq5sA"}}
          center={centerPos}
          defaultZoom={11}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => renderMarkers(map, maps)}
        >
        </GoogleMapReact>
      </div>
      <div className="btn-container">
      {
        places.map((place, idx) => {
          return <button key={idx} onClick={() => setCenterPos({lat: place.lat, lng: place.lng})}>{place.txt}</button>
        })
      }
      </div>
    </section>
  )
}