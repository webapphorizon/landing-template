"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useRef } from "react";
import { env } from "~/env";

// Тип для контейнера карты
interface MapContainerStyles {
  width: string;
  height: string;
}

// Получим координаты Москва-Сити из ссылки на Google Maps
// Изначально используем примерные координаты Москва-Сити
const center = {
  lat: 55.749539,
  lng: 37.537226,
};

const GoogleMapComponent = () => {
  // Настройки внешнего вида контейнера карты
  const containerStyle: MapContainerStyles = {
    width: "100%",
    height: "18.75rem",
  };

  // Загрузка Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // Ссылка на объект карты
  const mapRef = useRef<google.maps.Map | null>(null);

  // Обработчик загрузки карты
  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  // Обработчик выгрузки карты
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  // Пока API не загружен, показываем загрузку
  if (!isLoaded) {
    return (
      <div className="bg-muted mt-6 flex h-[18.75rem] w-full items-center justify-center overflow-hidden rounded-lg">
        Loading Map...
      </div>
    );
  }

  return (
    <div className="mt-6 h-[18.75rem] w-full overflow-hidden rounded-lg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={center} title="Our Office" />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapComponent;
