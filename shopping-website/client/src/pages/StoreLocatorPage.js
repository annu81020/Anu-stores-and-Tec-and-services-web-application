import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const StoreLocatorPage = () => {
  const stores = [
    { id: 1, name: 'ShopHub Downtown', lat: 52.520008, lng: 13.404954 },
    { id: 2, name: 'ShopHub Mall', lat: 52.523, lng: 13.413 }
  ];

  const mapStyles = {
    height: '500px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 52.520008,
    lng: 13.404954
  };

  return (
    <div className="container" style={{ padding: '30px 20px' }}>
      <h1>Store Locator</h1>
      <p>Find ShopHub stores near you</p>
      
      <div style={{ marginTop: '30px' }}>
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {stores.map(store => (
              <Marker
                key={store.id}
                position={{ lat: store.lat, lng: store.lng }}
                title={store.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h2>Our Locations</h2>
        {stores.map(store => (
          <div key={store.id} className="card">
            <h3>{store.name}</h3>
            <p>Berlin, Germany</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreLocatorPage;
