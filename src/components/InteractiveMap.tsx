import React, { useState } from "react";
import { 
  MapPin, 
  Filter, 
  BookOpen, 
  Presentation,
  Compass,
  Award,
  Globe,
  Settings,
  Info,
  Map as MapIcon
} from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

// Read Google Maps API Key from environment variables
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface MapNode {
  id: string;
  city: string;
  country: string;
  details: string;
  type: 'research' | 'speaking';
  lat: number;
  lng: number;
  x: number; // For SVG fallback
  y: number; // For SVG fallback
  institutionOrEvent: string;
}

export default function InteractiveMap() {
  const [filterType, setFilterType] = useState<'all' | 'research' | 'speaking'>('all');
  const [selectedPin, setSelectedPin] = useState<MapNode | null>(null);
  const [hoveredPin, setHoveredPin] = useState<MapNode | null>(null);
  const [openInfoWindowId, setOpenInfoWindowId] = useState<string | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState<boolean>(!hasValidKey);

  // Mapped physical coordinates and SVG fallback vectors
  const mapNodes: MapNode[] = [
    // Research Collaborations
    { id: "collab-durban", city: "Durban", country: "South Africa", institutionOrEvent: "UKZN & DUT", details: "Prof. T.J. Afullo (FSO/EMC), Prof. I.E. Davidson (Smart Grids), Prof. O. Olugbara (AI), Prof. V.M. Srivastava (FSO)", type: "research", lat: -29.8587, lng: 31.0218, x: 440, y: 310 },
    { id: "collab-pretoria", city: "Pretoria", country: "South Africa", institutionOrEvent: "TUT & University of Pretoria", details: "Prof. T. Stander (mmWave & Cryogenic Microelectronics) | Assistant Dean FICT Campus", type: "research", lat: -25.7479, lng: 28.2293, x: 440, y: 295 },
    { id: "collab-jhb", city: "Johannesburg", country: "South Africa", institutionOrEvent: "University of Johannesburg", details: "Prof. S. Sinha (RF Engineering Systems & Education Standards)", type: "research", lat: -26.2041, lng: 28.0473, x: 432, y: 298 },
    { id: "collab-akure", city: "Akure", country: "Nigeria", institutionOrEvent: "Federal University of Technology Akure", details: "Prof. S.J. Ojo (Satellite Link Budgets, Radio Propagation & Links)", type: "research", lat: 7.2508, lng: 5.1950, x: 395, y: 220 },
    { id: "collab-cookeville", city: "Cookeville", country: "USA", institutionOrEvent: "Tennessee Tech University", details: "Prof. Joseph Olunfemi Ojo (Power Grids Automation, Hybrid Off-grid Models)", type: "research", lat: 36.1628, lng: -85.5016, x: 198, y: 145 },
    { id: "collab-sandiego", city: "San Diego", country: "USA", institutionOrEvent: "UC San Diego", details: "Prof. Boubacar Kanté (Metamaterials, Nano-Photonics & FSO mmWave)", type: "research", lat: 32.8801, lng: -117.2340, x: 140, y: 150 },
    { id: "collab-norfolk", city: "Norfolk", country: "USA", institutionOrEvent: "Norfolk State University", details: "Prof. Isaac Osunmakinde (AI and Predictive Analytics on Low-resource grids)", type: "research", lat: 36.8485, lng: -76.2622, x: 210, y: 140 },
    { id: "collab-stjohns", city: "St. John's", country: "Canada", institutionOrEvent: "Memorial University (MUN)", details: "Prof. Telex Ngatched (Wireless Systems, Earth-Space 5G/6G rain links)", type: "research", lat: 47.5721, lng: -52.7335, x: 245, y: 105 },
    { id: "collab-gaborone", city: "Gaborone", country: "Botswana", institutionOrEvent: "BIUST", details: "Thesis Examiner — Setswana Natural Language Grammar Checker (LSTM-RNNs)", type: "research", lat: -24.6282, lng: 25.9231, x: 430, y: 285 },
    { id: "collab-kampala", city: "Kampala", country: "Uganda", institutionOrEvent: "Makerere University", details: "Thesis Examiner & Advisory — Energy and Channel Optimization in LTE-A Networks", type: "research", lat: 0.3349, lng: 32.5684, x: 443, y: 250 },
    { id: "collab-chennai", city: "Chennai", country: "India", institutionOrEvent: "Anna University", details: "International PhD Examiner — Obstacle Detection Systems for Visually Impaired", type: "research", lat: 13.0138, lng: 80.2354, x: 575, y: 205 },

    // Speaking & Conferences
    { id: "speak-lasvegas", city: "Las Vegas", country: "USA", institutionOrEvent: "IEEE ICCE & IEEE CCWC", details: "Delivered papers on Millimeterwave rain propagation & consumer automation (2025)", type: "speaking", lat: 36.1716, lng: -115.1398, x: 150, y: 140 },
    { id: "speak-oslo", city: "Oslo", country: "Norway", institutionOrEvent: "CCCE 2024 Symposium", details: "Presented keynotes on Computing and Communication Engineering (2024)", type: "speaking", lat: 59.9139, lng: 10.7522, x: 412, y: 75 },
    { id: "speak-london", city: "London", country: "UK", institutionOrEvent: "ICICT International Congress", details: "Featured Expert Presenter in Information & Communication Systems (2020)", type: "speaking", lat: 51.5074, lng: -0.1278, x: 395, y: 100 },
    { id: "speak-barcelona", city: "Barcelona", country: "Spain", institutionOrEvent: "SATNAC Cruise Symposium", details: "Presented on Freedom of the Seas mobile telecommunications grids (2017)", type: "speaking", lat: 41.3851, lng: 2.1734, x: 405, y: 115 },
    { id: "speak-shanghai", city: "Shanghai", country: "China", institutionOrEvent: "PIERS Symposium", details: "Author & Presenter on Electromagnetics and satellite rain attenuation (2016)", type: "speaking", lat: 31.2304, lng: 121.4737, x: 635, y: 153 },
    { id: "speak-taipei", city: "Taipei", country: "Taiwan", institutionOrEvent: "ATIS Congress", details: "Claimed prestigious 'Best Paper Award' on Satellite Channel Propagation (2012)", type: "speaking", lat: 25.0330, lng: 121.5654, x: 648, y: 167 },
    { id: "speak-windhoek", city: "Windhoek", country: "Namibia", institutionOrEvent: "IEEE AFRICON", details: "Presenter on Rainfall Rate and Subtropical Link Attenuation in Southern Africa (2007)", type: "speaking", lat: -22.5609, lng: 17.0658, x: 425, y: 300 }
  ];

  const filteredNodes = mapNodes.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

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

        {/* Filters and Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mock vs Live Config Info Tag if key is missing */}
          {!hasValidKey && (
            <button
              onClick={() => setShowSetupGuide(!showSetupGuide)}
              className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[11px] font-mono font-bold transition-all ${
                showSetupGuide 
                  ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              <Settings className="h-3.5 w-3.5 animate-spin-slow" />
              {showSetupGuide ? "View Demo Map" : "Enable Live Google Map"}
            </button>
          )}

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
      <div className="relative h-[300px] w-full rounded-xl border border-slate-200 overflow-hidden md:h-[450px]">
        {hasValidKey && !showSetupGuide ? (
          // REAL LIVE GOOGLE MAP
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={{ lat: 20, lng: 10 }}
              defaultZoom={2}
              minZoom={1.5}
              mapId="DEMO_MAP_ID"
              gestureHandling={'cooperative'}
              disableDefaultUI={false}
              internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              style={{ width: '100%', height: '100%' }}
            >
              {filteredNodes.map((node) => (
                <AdvancedMarker
                  key={node.id}
                  position={{ lat: node.lat, lng: node.lng }}
                  onClick={() => {
                    setSelectedPin(node);
                    setOpenInfoWindowId(node.id);
                  }}
                  title={node.city + ", " + node.country}
                >
                  <Pin 
                    background={node.type === 'research' ? '#ef4444' : '#3b82f6'} 
                    borderColor={node.type === 'research' ? '#dc2626' : '#2563eb'} 
                    glyphColor="#ffffff" 
                  />
                </AdvancedMarker>
              ))}

              {openInfoWindowId && selectedPin && (
                <InfoWindow
                  position={{ lat: selectedPin.lat, lng: selectedPin.lng }}
                  onCloseClick={() => {
                    setOpenInfoWindowId(null);
                  }}
                >
                  <div className="text-slate-950 p-1 max-w-[240px] font-sans">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={`h-2.5 w-2.5 rounded-full ${selectedPin.type === 'research' ? 'bg-red-500' : 'bg-blue-500'}`} />
                      <span className="text-xs font-bold text-slate-900">{selectedPin.city}, {selectedPin.country}</span>
                    </div>
                    <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wide leading-tight">{selectedPin.institutionOrEvent}</p>
                    <p className="text-[10px] text-slate-600 mt-1 leading-relaxed border-t border-slate-100 pt-1">{selectedPin.details}</p>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        ) : showSetupGuide ? (
          // EXCELLENT STEP-BY-STEP GOOGLE MAPS API KEY INSTRUCTIONS SPLASH SCREEN
          <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-50 overflow-y-auto">
            <div className="max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200">
                <MapIcon className="h-6 w-6 text-blue-600" />
              </div>
              
              <div className="space-y-1.5">
                <h4 className="font-sans text-base font-bold text-slate-900">Google Maps Integration Ready</h4>
                <p className="text-xs text-slate-500">The application is fully coded with the official Google Maps SDK, but is waiting for an API key to load the live map.</p>
              </div>

              <div className="border-t border-slate-100 my-2 pt-3 text-left space-y-2">
                <p className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-widest">Setup Instructions:</p>
                <ol className="text-xs text-slate-600 list-decimal pl-4 space-y-2.5">
                  <li>
                    <a 
                      href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-bold inline-flex items-center gap-0.5"
                    >
                      Get a free Google Maps API key
                    </a>
                  </li>
                  <li>
                    Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong> of AI Studio)
                  </li>
                  <li>
                    Select <strong>Secrets</strong> from the left sidebar
                  </li>
                  <li>
                    Create a secret named <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px] border border-slate-200">GOOGLE_MAPS_PLATFORM_KEY</code> and paste your key as the value.
                  </li>
                </ol>
              </div>

              <div className="pt-3 flex flex-col gap-2">
                <button
                  onClick={() => setShowSetupGuide(false)}
                  className="w-full rounded bg-blue-600 py-2 text-xs font-mono font-bold text-white hover:bg-blue-700 transition-all"
                >
                  PREVIEW WITH INTERACTIVE DEMO MAP
                </button>
                <p className="text-[9px] text-slate-400">The app builds automatically when you add the secret - no browser reload needed.</p>
              </div>
            </div>
          </div>
        ) : (
          // BEAUTIFULLY STYLED INTERACTIVE FALLBACK SVG MAP
          <div className="relative h-full w-full bg-slate-50 select-none">
            {/* Grid coordinates lines */}
            <svg viewBox="0 0 800 400" className="h-full w-full opacity-70 select-none touch-none">
              <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />

              {/* Minimalist continents outline path sketches styled elegantly */}
              {/* North America */}
              <path d="M 50 100 Q 120 70 260 80 T 250 180 T 150 200 Z" fill="#cbd5e1" opacity="0.3" />
              {/* Africa */}
              <path d="M 360 180 Q 420 180 470 220 T 450 340 T 360 210 Z" fill="#cbd5e1" opacity="0.4" />
              {/* Europe & Asia */}
              <path d="M 370 120 Q 480 60 740 70 T 730 220 T 500 150 Z" fill="#cbd5e1" opacity="0.3" />
              {/* South America */}
              <path d="M 190 220 Q 250 240 280 300 T 210 380 Z" fill="#cbd5e1" opacity="0.25" />
              {/* Australia */}
              <path d="M 640 280 Q 720 280 730 330 T 630 320 Z" fill="#cbd5e1" opacity="0.3" />
            </svg>

            {/* Coordinate Pins overlay */}
            {filteredNodes.map((node) => {
              const isSelected = selectedPin?.id === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => {
                    setSelectedPin(isSelected ? null : node);
                  }}
                  onMouseEnter={() => setHoveredPin(node)}
                  onMouseLeave={() => setHoveredPin(null)}
                  className="absolute group focus:outline-none transition-transform hover:scale-125"
                  style={{
                    left: `${(node.x / 800) * 100}%`,
                    top: `${(node.y / 400) * 100}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ping Ring Indicator */}
                    <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-40 animate-ping ${node.type === 'research' ? 'bg-red-400' : 'bg-blue-400'}`} />
                    
                    {/* Solid core pinpoint */}
                    <div className={`relative h-3 w-3 rounded-full border border-white shadow-md ${node.type === 'research' ? 'bg-red-500' : 'bg-blue-500'}`} />
                    
                    {/* Visual Ring when clicked */}
                    {isSelected && (
                      <div className="absolute -top-1.5 h-6 w-6 rounded-full border-2 border-blue-600" />
                    )}
                  </div>
                </button>
              );
            })}

            {/* Live Hover Tooltip display */}
            {hoveredPin && (
              <div 
                className="absolute z-10 hidden pointer-events-none rounded-lg border border-slate-200 bg-white p-2.5 shadow-lg text-left scale-90 sm:block"
                style={{
                  left: `${Math.min((hoveredPin.x / 800) * 100, 75)}%`,
                  top: `${Math.min((hoveredPin.y / 400) * 100, 80) + 4}%`,
                }}
              >
                <div className="flex items-center gap-1.5 font-sans">
                  <span className={`h-2 w-2 rounded-full ${hoveredPin.type === 'research' ? 'bg-red-500' : 'bg-blue-500'}`} />
                  <span className="text-xs font-bold text-slate-900">{hoveredPin.city}, {hoveredPin.country}</span>
                </div>
                <p className="text-[10px] text-blue-600 font-bold mt-0.5">{hoveredPin.institutionOrEvent}</p>
                <p className="text-[10px] text-slate-500 max-w-[200px] mt-1 leading-snug">{hoveredPin.details}</p>
              </div>
            )}
          </div>
        )}
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
