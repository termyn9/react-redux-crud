import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { retrieveTutorials } from "../actions/tutorials";
import { Icon } from "leaflet";
import markerIconPng from './geo-icon.png'
import './Map.css' 

const MapUser = () => {
    const dispatch = useDispatch(); // отвечает за запрос на обновление 
    const tutorials = useSelector(state => state.tutorials);
    useEffect(() => {
      dispatch(retrieveTutorials());
    }, []);

  return (
    <MapContainer 
    center={[51.6683 , 39.1919]} 
    zoom={5} 
    scrollWheelZoom={true} 
    maxZoom={10} 
    minZoom={2}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // url='file://C:/Users/Admin/Desktop/Tiles/{z}/{x}/{y}.png'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=Wj9tYUMIKI22YhArpV0D
      />
    {tutorials.map((city, i) =>(
        <Marker
        key = {i}
        icon = {new Icon({
          iconUrl: markerIconPng,
          iconSize: [40, 41]
        })}
        position={[city.Latitude, city.Longitude]}
        >
        <Popup>
            <div>
              {console.log(city.published)}
              {console.log(city.title)}
              {city.published ? <h5 id="blink-yes">City: {city.title}</h5> : <h5 id="blink-no">City: {city.title}</h5>}
                <p>- {city.description}</p>
                <strong>{city.Latitude} {city.Longitude}</strong>
            </div>
        </Popup>
      </Marker>
    ))}
    </MapContainer>
  );
};

export default MapUser
