import React from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView([coords[0], coords[1]], map.getZoom());
    return null;
}

const MapView = ({ lat, lon }) => {
    
    return (
        <div>
            <MapContainer renderer={true} center={[lat, lon]} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '500px' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]}>
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