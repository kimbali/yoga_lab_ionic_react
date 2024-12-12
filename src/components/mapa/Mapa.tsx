import React, { useEffect, useRef, useState } from 'react';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { IonButton, IonText } from '@ionic/react';

const Mapa: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null); // Referencia al mapa
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // Referencia al contenedor del mapa
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [routeDuration, setRouteDuration] = useState<string | null>(null); // Estado para guardar la duración de la ruta
  const yogaLabCoords: LatLngExpression = [
    41.390120361981786,
    2.146794650246499, // barcelona
    // 41.69476384112392,
    // 15.301436978105972, // italia
  ];

  useEffect(() => {
    // Inicializa el mapa si aún no existe
    if (mapRef.current || !mapContainerRef.current) {
      return;
    }

    mapRef.current = L.map(mapContainerRef.current).setView(yogaLabCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Agrega un marcador para el centro de yoga
    L.marker(yogaLabCoords)
      .addTo(mapRef.current)
      .bindPopup('¡Aquí está el centro de yoga!')
      .openPopup();

    return () => {
      // Limpia el mapa al desmontar el componente
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleGetUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserCoords([latitude, longitude]);

          if (mapRef.current) {
            // Agrega un marcador para la ubicación del usuario
            L.marker([latitude, longitude])
              .addTo(mapRef.current)
              .bindPopup('¡Tu posición!')
              .openPopup();

            // Centra el mapa en la posición del usuario
            mapRef.current.setView([latitude, longitude], 15);
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

  const handleDrawRoute = async () => {
    if (!userCoords) {
      alert('Primero debes obtener tu ubicación.');
      return;
    }

    const centerCoords = yogaLabCoords; // Coordenadas del centro de yoga
    const apiKey = '5b3ce3597851110001cf6248be1f7888e3b940edbf675ba618bbf16a';

    try {
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${userCoords[1]},${userCoords[0]}&end=${centerCoords[1]},${centerCoords[0]}`
      );

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;

        // Convierte las coordenadas a formato Leaflet [lat, lng]
        const route = coordinates.map((coord: [number, number]) => [
          coord[1],
          coord[0],
        ]);

        // Agrega la ruta al mapa
        if (mapRef.current) {
          const routeLine = L.polyline(route, { color: '#3a8b8d' }).addTo(
            mapRef.current
          );

          // Centra el mapa en la ruta
          mapRef.current.fitBounds(routeLine.getBounds());
        }

        // Calcula y guarda la duración de la ruta
        const durationInSeconds =
          data.features[0].properties.segments[0].duration; // Duración en segundos
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);

        setRouteDuration(`${hours}h ${minutes}min`);
      }
    } catch (error) {
      console.error('Error al obtener la ruta:', error);
      alert('No se pudo obtener la ruta. Inténtalo más tarde.');
    }
  };

  return (
    <>
      <div className='map-buttons'>
        <IonButton
          fill='outline'
          color='primary'
          size='large'
          onClick={handleGetUserLocation}
        >
          Mi ubicación
        </IonButton>
        <IonButton
          disabled={!userCoords}
          color='primary'
          size='large'
          onClick={handleDrawRoute}
        >
          Como llegar
        </IonButton>
      </div>

      <div className='separator' />

      <div
        ref={mapContainerRef}
        id='map'
        style={{
          width: '100%',
          height: '55vh',
        }}
      ></div>

      {routeDuration && (
        <IonText color='primary'>
          <h3>
            <strong>Duración del trayecto:</strong> {routeDuration}
          </h3>
        </IonText>
      )}
    </>
  );
};

export default Mapa;
