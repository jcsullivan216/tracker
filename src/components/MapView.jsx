import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getItemsWithCoordinates } from '../utils/geocoding';
import { getServiceColor, statusConfig } from '../data/config';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create custom colored markers
const createColoredIcon = (color) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
};

// Map bounds fitter component
function MapBoundsFitter({ items }) {
  const map = useMap();

  React.useEffect(() => {
    if (items.length > 0) {
      const bounds = L.latLngBounds(items.map(item => item.coordinates));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 5 });
    }
  }, [items, map]);

  return null;
}

const MapView = ({ filteredData, onItemClick, mode }) => {
  const itemsWithCoords = useMemo(() =>
    getItemsWithCoordinates(filteredData),
    [filteredData]
  );

  // Group items by location to handle overlapping markers
  const groupedByLocation = useMemo(() => {
    const groups = {};
    itemsWithCoords.forEach(item => {
      const key = `${item.coordinates[0]},${item.coordinates[1]}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    return groups;
  }, [itemsWithCoords]);

  return (
    <div style={{ flex: 1, position: 'relative', minHeight: 'calc(100vh - 200px)' }}>
      <MapContainer
        center={[30, -30]}
        zoom={2}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#1a1a2e' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapBoundsFitter items={itemsWithCoords} />

        {Object.entries(groupedByLocation).map(([key, items]) => {
          const [lat, lng] = key.split(',').map(Number);
          const firstItem = items[0];
          const svc = getServiceColor(firstItem.service);

          return (
            <Marker
              key={key}
              position={[lat, lng]}
              icon={createColoredIcon(svc.border)}
            >
              <Popup>
                <div style={{
                  maxWidth: '300px',
                  maxHeight: '400px',
                  overflow: 'auto'
                }}>
                  <div style={{
                    fontWeight: '600',
                    fontSize: '12px',
                    color: '#334155',
                    marginBottom: '8px',
                    borderBottom: '1px solid #e2e8f0',
                    paddingBottom: '8px'
                  }}>
                    {items[0].location || items[0].organization} ({items.length} {items.length === 1 ? 'item' : 'items'})
                  </div>

                  {items.map((item, idx) => {
                    const itemSvc = getServiceColor(item.service);
                    const st = statusConfig[item.status];

                    return (
                      <div
                        key={item.id}
                        onClick={() => onItemClick(item)}
                        style={{
                          padding: '8px',
                          marginBottom: idx < items.length - 1 ? '8px' : 0,
                          background: '#f8fafc',
                          borderRadius: '6px',
                          borderLeft: `3px solid ${itemSvc.border}`,
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{
                          fontWeight: '600',
                          fontSize: '11px',
                          color: '#1e293b',
                          marginBottom: '4px'
                        }}>
                          {item.name}
                        </div>
                        <div style={{
                          display: 'flex',
                          gap: '6px',
                          flexWrap: 'wrap'
                        }}>
                          <span style={{
                            fontSize: '9px',
                            background: itemSvc.badge,
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '3px'
                          }}>
                            {item.service}
                          </span>
                          <span style={{
                            fontSize: '9px',
                            background: st.border,
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '3px'
                          }}>
                            {st.label}
                          </span>
                        </div>
                        {mode === 'users' && item.componentType && (
                          <div style={{
                            fontSize: '10px',
                            color: '#64748b',
                            marginTop: '4px'
                          }}>
                            {item.componentType}
                          </div>
                        )}
                        {mode === 'buyers' && item.category && (
                          <div style={{
                            fontSize: '10px',
                            color: '#64748b',
                            marginTop: '4px'
                          }}>
                            {item.category}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(15, 23, 42, 0.95)',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #334155',
        zIndex: 1000,
        maxHeight: '300px',
        overflow: 'auto'
      }}>
        <div style={{
          fontSize: '11px',
          color: '#94a3b8',
          marginBottom: '8px',
          textTransform: 'uppercase',
          fontWeight: '600'
        }}>
          {mode === 'users' ? 'Services' : 'Agencies'}
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {[...new Set(filteredData.map(d => d.service))].sort().map(service => {
            const svc = getServiceColor(service);
            const count = filteredData.filter(d => d.service === service).length;
            return (
              <div key={service} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: svc.border
                }} />
                <span style={{
                  fontSize: '11px',
                  color: '#e2e8f0'
                }}>
                  {service} ({count})
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(15, 23, 42, 0.95)',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #334155',
        zIndex: 1000
      }}>
        <div style={{
          fontSize: '11px',
          color: '#94a3b8',
          marginBottom: '4px'
        }}>
          Showing on map
        </div>
        <div style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#f1f5f9'
        }}>
          {itemsWithCoords.length} <span style={{ fontSize: '12px', color: '#64748b' }}>
            of {filteredData.length} {mode === 'users' ? 'units' : 'programs'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
