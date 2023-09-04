import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { MapData } from "../types/types";
import { Icon } from "leaflet";

type MapLeafletProps = {
  mapData: MapData[];
  isMapDataLoading: boolean;
};

export const MapMarkerIcon = new Icon({
  iconUrl: require("../assets/images/mapMarker.png"),
  iconSize: [20, 20],
});

export default function MapLeaflet({ mapData }: MapLeafletProps) {
  return (
    <div className="p-1 mt-6 rounded-md">
      <MapContainer center={[20.5937, 78.9629]} zoom={5}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png" />

        {mapData.map((marker) => (
          <Marker position={marker.geocode} icon={MapMarkerIcon}>
            <Popup>
              <h1 className="text-center text-xl font-semibold font-inter">
                {marker.country}
              </h1>
              <p className="font-inter">
                <span className="font-semibold">Active:</span> {marker.active}
              </p>
              <p className="font-inter"><span className="font-semibold">Recoverd:</span> {marker.recovered}</p>
              <p className="font-inter"><span className="font-semibold">Deaths:</span> {marker.deaths}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
