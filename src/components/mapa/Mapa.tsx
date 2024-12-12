import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapaProps {
  lat: string;
  lng: string;
}

const Mapa: React.FC<MapaProps> = ({ lat, lng }) => {
  const mapRef = useRef<L.Map | null>(null); // Referencia al mapa

  useEffect(() => {
    if (!mapRef.current) {
      // Crear el mapa solo si no está inicializado
      mapRef.current = L.map('map').setView([42.5078, 1.5211], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      L.marker([42.5078, 1.5211])
        .addTo(mapRef.current)
        .bindPopup('¡Aquí está Andorra!')
        .openPopup();
    }
  }, []);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 15);
            L.marker([latitude, longitude])
              .addTo(mapRef.current)
              .bindPopup('¡Estás aquí!')
              .openPopup();
          }
        },
        error => {
          console.error('Error al obtener la geolocalización:', error);
        }
      );
    } else {
      alert('La geolocalización no está soportada en este navegador.');
    }
  };

  return (
    <>
      <h1>Mapa</h1>
      <button
        style={{ margin: '10px', padding: '10px', cursor: 'pointer' }}
        onClick={handleGeolocation}
      >
        Mi ubicación
      </button>
      <div
        id='map'
        style={{
          width: '100%',
          height: '55vh',
        }}
      ></div>
    </>
  );
};

export default Mapa;
