import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { retrieveTutorials } from "../actions/tutorials";
import './Map.css' 

const Map = () => {
    const dispatch = useDispatch();
    const tutorials = useSelector(state => state.tutorials);

    useEffect(() => {
      dispatch(retrieveTutorials());
    }, []);

  return (
    <MapContainer center={[51.6683 , 39.1919]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    
    {tutorials.map((city, i) =>(
        <Marker
        key = {i}
        position={[city.Latitude, city.Longitude]}
        >
        <Popup>
          {city.title} <br /> {city.description}
        </Popup>
      </Marker>
    ))}
      
    </MapContainer>
  );
};

export default Map
