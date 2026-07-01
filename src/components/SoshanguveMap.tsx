import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function SoshanguveMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Coords: 25.5398° S, 28.0931° E
    const position: [number, number] = [-25.5398, 28.0931];

    const map = L.map(mapContainerRef.current, {
      center: position,
      zoom: 14,
      minZoom: 10,
      maxZoom: 18,
      zoomControl: true,
      attributionControl: true,
    });

    mapRef.current = map;

    // Use CartoDB Light (Positron) - clean executive grayscale tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom blue pulsing marker matching the corporate advisor blue styling
    const customIcon = L.divIcon({
      className: 'custom-soshanguve-marker',
      html: `
        <div class="relative flex items-center justify-center pointer-events-auto">
          <span class="absolute inline-flex h-8 w-8 rounded-full opacity-40 animate-ping bg-blue-400"></span>
          <div class="relative h-4 w-4 rounded-full border border-white shadow-md bg-blue-600"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    const marker = L.marker(position, { icon: customIcon }).addTo(map);

    marker.bindTooltip(`
      <div class="font-sans text-xs p-0.5 select-none">
        <span class="block font-bold text-slate-900">Soshanguve Campus Grid</span>
        <span class="block text-[10px] text-blue-600 font-semibold mt-0.5">TUT Faculty of ICT</span>
      </div>
    `, {
      direction: 'top',
      offset: [0, -10],
      opacity: 0.95
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="h-full w-full z-0" />;
}
