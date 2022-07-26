import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Map, {
  FullscreenControl,
  GeolocateControl,
  ScaleControl,
  Marker,
} from "react-map-gl";

//importing style
import "mapbox-gl/dist/mapbox-gl.css";
import "../styles/mapbox.css";

//importing assets
import marker from "../Assets/Images/icons8-location-94.png";
import storeImage from "../Assets/Images/store-marker.png";

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYWhtZWQtZWxkZXNva3kiLCJhIjoiY2w1MzU4eTBtMG0yNzNkcnliZzE1bXIybSJ9.JfM6F_vQelv3i1F0lOMImg";

const ar = localStorage["ar"];
// handle map theme
function mapStyle() {
  let dark = localStorage["darkMode"];
  if (dark) return "mapbox://styles/ahmed-eldesoky/cl0l4j2jp001814p4exw3e4yw";
  else return "mapbox://styles/ahmed-eldesoky/cl0l4i4ux001o14pj3ux3c8bq";
}

function Mapbox({ offline, store }) {
  //Egypt coords
  const [lng, setLng] = useState(31.233334);
  const [lat, setLat] = useState(30.033333);
  const [zoom, setZoom] = useState(6);

  useEffect(() => {
    //Get current location of user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
        setZoom(10);
      });
    }
  });

  return (
    <Map
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: zoom,
      }}
      mapStyle={mapStyle()}
      mapboxAccessToken={ACCESS_TOKEN}
      attributionControl={false}
    >
      <FullscreenControl />

      <GeolocateControl />

      <ScaleControl />

      {/* mark user location */}
      <Marker longitude={lng} latitude={lat} anchor="bottom">
        <img
          style={{ height: 40, width: 40 }}
          src={marker}
          alt="your location"
        />
      </Marker>
      {offline &&
        offline.map((product, key) => (
          ///store-profile=87
          <Link
            to={`/store-profile=${product.store_id}`}
            key={key}
            style={{ position: "relative", zIndex: "3000" }}
          >
            <Marker
              longitude={product.store_longitude}
              latitude={product.store_latitude}
              anchor="center"
            >
              <div
                className="maker"
                // to={`/store-profile=${product.store_id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className="img-marker"
                  src={product.store_logo ? product.store_logo : storeImage}
                  alt="offline product"
                  style={{ border: "2px solid var(--secondary-color" }}
                />
                <h4
                  style={{ fontWeight: "600", color: "var(--secondary-color)" }}
                  className="ar"
                >
                  {product.store_name}
                </h4>
              </div>
            </Marker>
          </Link>
        ))}

      {store && (
        <Link to={`/store-profile=${store.store_id}`}>
          <Marker
            longitude={store.store_longitude || store.longitude}
            latitude={store.store_latitude || store.latitude}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                className="img-marker"
                src={store.store_logo || store.logo}
                alt="offline product"
                style={{ border: "2px solid var(--secondary-color)" }}
              />
              <h4 className={`${ar ? "ar" : ""}`}>
                {store.store_name || store.name}
              </h4>
            </div>
          </Marker>
        </Link>
      )}
    </Map>
  );
}
export default Mapbox;
