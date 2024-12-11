import React, { useEffect } from 'react';
import L from 'leaflet';

interface MapaProps {
  lat: string;
  lng: string;
}

const Mapa: React.FC<MapaProps> = ({ lat, lng }) => {
  useEffect(() => {
    // Crear el mapa
    const map = L.map('map').setView([42.5078, 1.5211], 13); // Coordenadas de Andorra, por ejemplo.

    // Agregar el tile layer (mapa base)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Agregar un marcador (opcional)
    L.marker([42.5078, 1.5211])
      .addTo(map)
      .bindPopup('¡Aquí está Andorra!')
      .openPopup();

    return () => {
      map.remove(); // Limpia el mapa al desmontar el componente
    };
  }, []);

  return (
    <>
      <h1> mapa</h1>
      <div
        id='map'
        style={{
          width: '100%',
          height: '75vh', // Ajusta el tamaño según tu diseño
        }}
      ></div>
    </>
  );
};

export default Mapa;
