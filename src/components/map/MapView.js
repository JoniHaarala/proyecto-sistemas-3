import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import img from '../../data/placeholder.png'

function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView([coords[0], coords[1]], map.getZoom());
    return null;
}

const icon = L.icon({
    iconUrl: img,
    iconSize: [28, 28],
  });

const MapView = ({ lat, lon }) => {
    
    return (
        <div>
            <MapContainer renderer={true} center={[lat, lon]} zoom={15} scrollWheelZoom={false} style={{ height: '300px', width: '500px' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} icon={icon}>
                    <Popup>
                        Ubicacion <br /> seleccionada.
                    </Popup>
                </Marker>
                <ChangeMapView coords={[lat, lon]} />
            </MapContainer>
        </div>

    )
}

export default MapView