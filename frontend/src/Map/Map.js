import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { retrieveTutorials } from "../actions/tutorials";
import { deleteTutorial } from "../actions/tutorials";
import { Link } from "react-router-dom";
import { Icon } from "leaflet";
import markerIconPng from './geo-icon.png'
import './Map.css' 

const Map = (props) => {
    const dispatch = useDispatch();
    const tutorials = useSelector(state => state.tutorials);
    const [deleteItem, setDeleteItem] = useState(false);
    const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 })

    useEffect(() => {
      dispatch(retrieveTutorials());
    }, []);

    const removeTutorial = (_id) => {
        dispatch(deleteTutorial(_id))
      };

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
        // url="Tiles/{z}/{x}/{y}.png"
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
                <h5>City: {city.title}</h5>
                <p>- {city.description}</p>
                <strong>{city.Latitude} {city.Longitude}</strong>
                <div style={{marginTop: '5px', display:'flex', justifyContent: 'space-between'}}>
                <Link
                    className="btnMap-edit"
                    to={"/tutorials/" + city.id}
                >
                Edit
                </Link>
                <button 
                className="btnMap-delete" 
                onClick={() => {if (window.confirm('Are you sure to delete this item?')) removeTutorial(city.id)}}
                >Delete</button>
                </div>
            </div>
        </Popup>
      </Marker>
    ))}
      
    </MapContainer>
  );
};

export default Map
