import React, { useState, useEffect, useRef } from "react";
import { 
  Compass,
  Globe
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapNode {
  id: string;
  city: string;
  country: string;
  details: string;
  type: 'research' | 'speaking';
  lat: number;
  lng: number;
  institutionOrEvent: string;
}

export default function InteractiveMap() {
  const [filterType, setFilterType] = useState<'all' | 'research' | 'speaking'>('all');
  const [selectedPin, setSelectedPin] = useState<MapNode | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Mapped physical coordinates and metadata
  const mapNodes: MapNode[] = [
    // Research Collaborations
    { id: "collab-durban", city: "Durban", country: "South Africa", institutionOrEvent: "UKZN & DUT", details: "Prof. T.J. Afullo (FSO/EMC), Prof. I.E. Davidson (Smart Grids), Prof. O. Olugbara (AI), Prof. V.M. Srivastava (FSO)", type: "research", lat: -29.8587, lng: 31.0218 },
    { id: "collab-pretoria", city: "Pretoria", country: "South Africa", institutionOrEvent: "TUT & University of Pretoria", details: "Prof. T. Stander (mmWave & Cryogenic Microelectronics) | Assistant Dean FICT Campus", type: "research", lat: -25.7479, lng: 28.2293 },
    { id: "collab-jhb", city: "Johannesburg", country: "South Africa", institutionOrEvent: "University of Johannesburg", details: "Prof. S. Sinha (RF Engineering Systems & Education Standards)", type: "research", lat: -26.2041, lng: 28.0473 },
    { id: "collab-akure", city: "Akure", country: "Nigeria", institutionOrEvent: "Federal University of Technology Akure", details: "Prof. S.J. Ojo (Satellite Link Budgets, Radio Propagation & Links)", type: "research", lat: 7.2508, lng: 5.1950 },
    { id: "collab-cookeville", city: "Cookeville", country: "USA", institutionOrEvent: "Tennessee Tech University", details: "Prof. Joseph Olunfemi Ojo (Power Grids Automation, Hybrid Off-grid Models)", type: "research", lat: 36.1628, lng: -85.5016 },
    { id: "collab-sandiego", city: "San Diego", country: "USA", institutionOrEvent: "UC San Diego", details: "Prof. Boubacar Kanté (Metamaterials, Nano-Photonics & FSO mmWave)", type: "research", lat: 32.8801, lng: -117.2340 },
    { id: "collab-norfolk", city: "Norfolk", country: "USA", institutionOrEvent: "Norfolk State University", details: "Prof. Isaac Osunmakinde (AI and Predictive Analytics on Low-resource grids)", type: "research", lat: 36.8485, lng: -76.2622 },
    { id: "collab-stjohns", city: "St. John's", country: "Canada", institutionOrEvent: "Memorial University (MUN)", details: "Prof. Telex Ngatched (Wireless Systems, Earth-Space 5G/6G rain links)", type: "research", lat: 47.5721, lng: -52.7335 },
    { id: "collab-gaborone", city: "Gaborone", country: "Botswana", institutionOrEvent: "BIUST", details: "Thesis Examiner — Setswana Natural Language Grammar Checker (LSTM-RNNs)", type: "research", lat: -24.6282, lng: 25.9231 },
    { id: "collab-kampala", city: "Kampala", country: "Uganda", institutionOrEvent: "Makerere University", details: "Thesis Examiner & Advisory — Energy and Channel Optimization in LTE-A Networks", type: "research", lat: 0.3349, lng: 32.5684 },
    { id: "collab-chennai", city: "Chennai", country: "India", institutionOrEvent: "Anna University", details: "International PhD Examiner — Obstacle Detection Systems for Visually Impaired", type: "research", lat: 13.0138, lng: 80.2354 },

    // Speaking & Conferences
    { id: "speak-lasvegas", city: "Las Vegas", country: "USA", institutionOrEvent: "IEEE ICCE & IEEE CCWC", details: "Delivered papers on Millimeterwave rain propagation & consumer automation (2025)", type: "speaking", lat: 36.1716, lng: -115.1398 },
    { id: "speak-oslo", city: "Oslo", country: "Norway", institutionOrEvent: "CCCE 2024 Symposium", details: "Presented keynotes on Computing and Communication Engineering (2024)", type: "speaking", lat: 59.9139, lng: 10.7522 },
    { id: "speak-london", city: "London", country: "UK", institutionOrEvent: "ICICT International Congress", details: "Featured Expert Presenter in Information & Communication Systems (2020)", type: "speaking", lat: 51.5074, lng: -0.1278 },
    { id: "speak-barcelona", city: "Barcelona", country: "Spain", institutionOrEvent: "SATNAC Cruise Symposium", details: "Presented on Freedom of the Seas mobile telecommunications grids (2017)", type: "speaking", lat: 41.3851, lng: 2.1734 },
    { id: "speak-shanghai", city: "Shanghai", country: "China", institutionOrEvent: "PIERS Symposium", details: "Author & Presenter on Electromagnetics and satellite rain attenuation (2016)", type: "speaking", lat: 31.2304, lng: 121.4737 },
    { id: "speak-taipei", city: "Taipei", country: "Taiwan", institutionOrEvent: "ATIS Congress", details: "Claimed prestigious 'Best Paper Award' on Satellite Channel Propagation (2012)", type: "speaking", lat: 25.0330, lng: 121.5654 },
    { id: "speak-windhoek", city: "Windhoek", country: "Namibia", institutionOrEvent: "IEEE AFRICON", details: "Presenter on Rainfall Rate and Subtropical Link Attenuation in Southern Africa (2007)", type: "speaking", lat: -22.5609, lng: 17.0658 }
  ];

  const filteredNodes = mapNodes.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  // 1. Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Create the Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: [20, 10], // Center to show key hotspots (Americas, Africa, Europe, Asia)
      zoom: 2,
      minZoom: 1.8,
      maxZoom: 10,
      zoomControl: true,
      attributionControl: true,
    });
    
    mapRef.current = map;

    // Use CartoDB Light (Positron) tiles - very clean and professional light theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Cleanup map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // 2. Render Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new filtered markers
    filteredNodes.forEach((node) => {
      // Custom divIcon matching the site theme & animations
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center pointer-events-auto">
            <span class="absolute inline-flex h-6 w-6 rounded-full opacity-40 animate-ping ${
              node.type === 'research' ? 'bg-red-400' : 'bg-blue-400'
            }"></span>
            <div class="relative h-3.5 w-3.5 rounded-full border border-white shadow-md transition-all duration-200 hover:scale-125 ${
              node.type === 'research' ? 'bg-red-500' : 'bg-blue-500'
            }"></div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([node.lat, node.lng], { icon: customIcon });

      // Click Event to inspect node
      marker.on('click', () => {
        setSelectedPin(node);
        map.setView([node.lat, node.lng], Math.max(map.getZoom(), 4));
      });

      // Tooltip Hover info
      marker.bindTooltip(`
        <div class="font-sans text-xs select-none">
          <div class="flex items-center gap-1.5 font-bold text-slate-900">
            <span class="h-2 w-2 rounded-full ${node.type === 'research' ? 'bg-red-500' : 'bg-blue-500'}"></span>
            <span>${node.city}, ${node.country}</span>
          </div>
          <div class="text-[10px] text-blue-600 font-bold mt-0.5">${node.institutionOrEvent}</div>
        </div>
      `, {
        direction: 'top',
        offset: [0, -10],
        opacity: 0.95
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });

  }, [filteredNodes]);

  return (
    <div id="interactive-map-module" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Controls Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-sans text-lg font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Global R&D Footprint
          </h3>
          <p className="text-xs text-slate-500">Interactive map plotting Prof. Owolawi's key collaborations & presentations worldwide</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-1 text-xs border border-slate-200">
            <button
              onClick={() => setFilterType('all')}
              className={`rounded px-3 py-1.5 font-medium transition-all ${filterType === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('research')}
              className={`rounded px-3 py-1.5 font-medium transition-all flex items-center gap-1.5 ${filterType === 'research' ? 'bg-red-50 text-red-700 border border-red-200' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <span className="h-2 w-2 rounded-full bg-red-500 block"></span>
              Research ({mapNodes.filter(x => x.type === 'research').length})
            </button>
            <button
              onClick={() => setFilterType('speaking')}
              className={`rounded px-3 py-1.5 font-medium transition-all flex items-center gap-1.5 ${filterType === 'speaking' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <span className="h-2 w-2 rounded-full bg-blue-500 block"></span>
              Speaking ({mapNodes.filter(x => x.type === 'speaking').length})
            </button>
          </div>
        </div>
      </div>

      {/* Map Arena Container */}
      <div className="relative h-[300px] w-full rounded-xl border border-slate-200 overflow-hidden md:h-[450px] z-0">
        <div ref={mapContainerRef} className="h-full w-full" />
      </div>

      {/* Selected Coordinates Inspector Card */}
      <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4 min-h-[90px]">
        {selectedPin ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 border ${
                  selectedPin.type === 'research' 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {selectedPin.type === 'research' ? 'Academic Collaboration' : 'International Keynote/Event'}
                </span>
                <span className="text-xs text-slate-500 font-sans font-medium">{selectedPin.city}, {selectedPin.country}</span>
                <span className="text-[9px] text-slate-400 font-mono">({selectedPin.lat.toFixed(4)}°, {selectedPin.lng.toFixed(4)}°)</span>
              </div>
              <h4 className="mt-1 font-sans text-sm font-bold text-slate-900 uppercase">{selectedPin.institutionOrEvent}</h4>
              <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{selectedPin.details}</p>
            </div>
            <button 
              onClick={() => setSelectedPin(null)}
              className="mt-2 text-xs font-mono text-blue-600 hover:underline font-bold self-end sm:mt-0"
            >
              Clear Selection
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-2">
            <Compass className="h-6 w-6 text-slate-400 stroke-[1.5]" />
            <span className="text-xs text-slate-500 mt-1 font-sans font-medium">Click any pulsing coordinate node on the map to inspect specific partnership details</span>
          </div>
        )}
      </div>
    </div>
  );
}
