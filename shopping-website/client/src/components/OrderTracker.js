import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { FaTruck, FaCheck, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './OrderTracker.css';

const OrderTracker = ({ order }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [progress, setProgress] = useState(0);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '12px'
  };

  // Simulated locations
  const warehouseLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco
  const deliveryLocation = order?.shippingAddress 
    ? { lat: 37.8044, lng: -122.2712 } // Oakland (simulated)
    : { lat: 37.8044, lng: -122.2712 };

  useEffect(() => {
    // Simulate real-time tracking
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 0.5;
        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Interpolate position between warehouse and delivery
    const lat = warehouseLocation.lat + 
      (deliveryLocation.lat - warehouseLocation.lat) * (progress / 100);
    const lng = warehouseLocation.lng + 
      (deliveryLocation.lng - warehouseLocation.lng) * (progress / 100);
    
    setCurrentPosition({ lat, lng });
  }, [progress]);

  const getStatusInfo = () => {
    if (order?.isDelivered) {
      return {
        status: 'Delivered',
        icon: <FaCheck />,
        color: '#10b981',
        description: 'Your order has been delivered successfully'
      };
    } else if (order?.isPaid) {
      return {
        status: 'In Transit',
        icon: <FaTruck />,
        color: '#3b82f6',
        description: 'Your order is on its way'
      };
    } else {
      return {
        status: 'Processing',
        icon: <FaClock />,
        color: '#f59e0b',
        description: 'Your order is being prepared'
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="order-tracker">
      <div className="tracker-header">
        <div className="tracker-status" style={{ borderColor: statusInfo.color }}>
          <div className="status-icon" style={{ background: statusInfo.color }}>
            {statusInfo.icon}
          </div>
          <div className="status-info">
            <h3>{statusInfo.status}</h3>
            <p>{statusInfo.description}</p>
          </div>
        </div>
        
        <div className="tracker-progress-bar">
          <div 
            className="tracker-progress-fill" 
            style={{ 
              width: `${progress}%`,
              background: statusInfo.color 
            }}
          ></div>
        </div>
        
        <div className="tracker-milestones">
          <div className={`milestone ${progress >= 0 ? 'completed' : ''}`}>
            <div className="milestone-dot"></div>
            <span>Order Placed</span>
          </div>
          <div className={`milestone ${progress >= 33 ? 'completed' : ''}`}>
            <div className="milestone-dot"></div>
            <span>Shipped</span>
          </div>
          <div className={`milestone ${progress >= 66 ? 'completed' : ''}`}>
            <div className="milestone-dot"></div>
            <span>Out for Delivery</span>
          </div>
          <div className={`milestone ${progress >= 100 ? 'completed' : ''}`}>
            <div className="milestone-dot"></div>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      <div className="tracker-map-container">
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentPosition || warehouseLocation}
            zoom={12}
            options={{
              styles: [
                {
                  featureType: 'all',
                  elementType: 'geometry',
                  stylers: [{ color: '#242f3e' }]
                },
                {
                  featureType: 'all',
                  elementType: 'labels.text.stroke',
                  stylers: [{ color: '#242f3e' }]
                },
                {
                  featureType: 'all',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#746855' }]
                }
              ]
            }}
          >
            {/* Warehouse Marker */}
            <Marker
              position={warehouseLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#10b981" opacity="0.3"/>
                    <circle cx="20" cy="20" r="12" fill="#10b981"/>
                    <text x="20" y="26" font-size="16" text-anchor="middle" fill="white">🏭</text>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40)
              }}
              title="Warehouse"
            />

            {/* Current Position Marker (Truck) */}
            {currentPosition && (
              <Marker
                position={currentPosition}
                icon={{
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="18" fill="#3b82f6" opacity="0.3"/>
                      <circle cx="20" cy="20" r="12" fill="#3b82f6"/>
                      <text x="20" y="26" font-size="16" text-anchor="middle" fill="white">🚚</text>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
                title="Current Location"
              />
            )}

            {/* Delivery Location Marker */}
            <Marker
              position={deliveryLocation}
              icon={{
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" fill="#f59e0b" opacity="0.3"/>
                    <circle cx="20" cy="20" r="12" fill="#f59e0b"/>
                    <text x="20" y="26" font-size="16" text-anchor="middle" fill="white">🏠</text>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(40, 40)
              }}
              title="Delivery Address"
            />

            {/* Route Line */}
            <Polyline
              path={[warehouseLocation, currentPosition || warehouseLocation]}
              options={{
                strokeColor: '#3b82f6',
                strokeOpacity: 0.8,
                strokeWeight: 4
              }}
            />
            
            <Polyline
              path={[currentPosition || warehouseLocation, deliveryLocation]}
              options={{
                strokeColor: '#9ca3af',
                strokeOpacity: 0.4,
                strokeWeight: 4,
                strokeDasharray: '10 10'
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      <div className="tracker-details">
        <div className="tracker-detail-item">
          <FaMapMarkerAlt />
          <div>
            <strong>Delivery Address</strong>
            <p>{order?.shippingAddress?.street || 'Address not available'}</p>
            <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
