
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function AboutPage(){
    const places = [{txt: 'Tel Aviv', lat: 59.955413,lng: 30.337844},
     {txt: 'Rehovot', lat: 50, lng: 31},
     {txt: 'bbbbb', lat: 57, lng: 31}]
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '90vh', width: '90%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCmL2Wr3EopBGHsyPwuFyoJGahO0Dyq5sA"}}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* {places.map(place => {
        return <AnyReactComponent
          lat={place.lat}
          lng={place.lng}
          text={place.txt}
        />
        })} */}
        
      </GoogleMapReact>
    </div>
  );
}