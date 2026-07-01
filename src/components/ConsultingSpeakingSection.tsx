import React, { useState } from "react";
import { 
  Briefcase, 
  Presentation, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  CheckCheck, 
  Clock, 
  MapPin, 
  Users,
  CheckCircle,
  FileText
} from "lucide-react";
import { KEYNOTE_TOPICS, SPEAKING_ENGAGEMENTS } from "../data.js";

export default function ConsultingSpeakingSection() {
  const [openTopic, setOpenTopic] = useState<string | null>("kp-ai-agriculture");
  const [selectedService, setSelectedService] = useState("Corporate AI Strategy Scoping");
  const [selectedDate, setSelectedDate] = useState("2026-06-15");
  const [selectedTime, setSelectedTime] = useState("14:00 (UTC+2)");
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", notes: "" });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const availableDates = ["2026-06-15", "2026-06-16", "2026-06-18", "2026-06-22", "2026-06-25"];
  const availableTimes = ["09:00 (UTC+2)", "11:00 (UTC+2)", "14:00 (UTC+2)", "16:00 (UTC+2)"];

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) return;
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setBookingForm({ name: "", email: "", notes: "" });
    }, 4000);
  };

  const toggleTopic = (id: string) => {
    setOpenTopic(openTopic === id ? null : id);
  };

  return (
    <div id="consulting-speaking-section" className="space-y-16 animate-in fade-in duration-300 font-sans">
      
      {/* 1. Advisory & Consulting Services Overview */}
      <div className="space-y-3">
        <span className="font-mono text-xs font-bold text-blue-600 uppercase tracking-widest block">EXECUTIVE ADVISORY & CONSULTING MATRIX</span>
        <h2 className="font-sans text-3xl font-extrabold tracking-tight text-slate-900">Advisory & Consulting Services</h2>
        <p className="font-sans text-sm text-slate-650 max-w-2xl leading-relaxed">
          Through West Wood Technologies and academic chairs, Prof. Owolawi consults directly for governments, corporate entities, universities, and development boards on 4IR transformation, agricultural drones, and complex LMS deployments.
        </p>
      </div>

      {/* Services Grid cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* S1: AI Strategy */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 relative shadow-xs hover:shadow-md transition-all group">
          <div className="rounded bg-blue-50 p-2.5 text-blue-600 w-max">
            <Briefcase className="h-5 w-5" />
          </div>
          <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">AI Strategy & Implementation</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Pioneering corporate adoption blueprints, multi-agent automated setups, custom security guidelines, and cloud resources allocation frameworks.</p>
          <ul className="text-[10px] text-slate-500 font-mono space-y-1">
            <li>• Multi-Agent Systems Integration</li>
            <li>• Secure Prompt Security Audit</li>
            <li>• GPU Cost Allocation Optimization</li>
          </ul>
        </div>

        {/* S2: Digital Transformation */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 relative shadow-xs hover:shadow-md transition-all group">
          <div className="rounded bg-blue-50 p-2.5 text-blue-600 w-max">
            <Presentation className="h-5 w-5" />
          </div>
          <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Digital Education & LMS</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Architecting national-level video-based Learning Management Systems (LMS) and Career Hub setups hosting 20,000+ active learners.</p>
          <ul className="text-[10px] text-slate-500 font-mono space-y-1">
            <li>• Cloud-Native LMS Setup (SCORM)</li>
            <li>• AI Career Advisor Copilots</li>
            <li>• STEM Video Delivery Compression</li>
          </ul>
        </div>

        {/* S3: Smart Agri */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 relative shadow-xs hover:shadow-md transition-all group">
          <div className="rounded bg-blue-50 p-2.5 text-blue-600 w-max">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-sans text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Smart Agriculture & Drones</h3>
          <p className="text-xs text-slate-600 leading-relaxed">Formulating civilian SACAA-certified drone pilot academies, crop pathology computer vision models, and smart watering IoT hubs.</p>
          <ul className="text-[10px] text-slate-500 font-mono space-y-1">
            <li>• SACAA RPL Training Portals</li>
            <li>• Multi-Spectral Pathology Scopes</li>
            <li>• UAV spray-nozzle flight models</li>
          </ul>
        </div>
      </div>

      {/* 2. Keynotes Accordion - Precise OCR titles */}
      <div id="keynotes-accordion" className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
            Signature Keynote Presentations
          </h3>
          <p className="text-xs text-slate-500">Pre-scoped, high-impact keynote packages available for booking</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          {KEYNOTE_TOPICS.map((kp) => {
            const isOpen = openTopic === kp.id;

            return (
              <div key={kp.id} className="border-b border-slate-100">
                <button
                  onClick={() => toggleTopic(kp.id)}
                  className="w-full flex items-center justify-between text-left p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[9px] text-blue-600 uppercase tracking-wider font-bold">{kp.category} KEYNOTE</span>
                    <h4 className="text-sm font-bold text-slate-900 tracking-tight">{kp.title}</h4>
                  </div>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-blue-600" /> : <ChevronDown className="h-4 w-4 text-blue-600" />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-xs space-y-3.5 leading-relaxed text-slate-700 animate-in fade-in duration-150">
                    <p className="font-medium">{kp.abstract}</p>
                    
                    <div className="grid gap-3 sm:grid-cols-2 text-[11px] font-sans">
                      <div className="rounded bg-white p-3 border border-slate-200">
                        <span className="font-mono text-[9px] text-blue-600 uppercase block font-bold mb-1">Target Audience</span>
                        <p className="text-slate-600">{kp.audience}</p>
                      </div>
                      <div className="rounded bg-white p-3 border border-slate-200">
                        <span className="font-mono text-[9px] text-blue-600 uppercase block font-bold mb-1">Duration & Formats</span>
                        <p className="text-slate-600">45-minute Keynote | 2-Hour Strategy Workshop Session</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Former Speaking Engagements Table (as requested) */}
      <div id="former-events" className="space-y-6">
        <div className="space-y-1">
          <h3 className="font-sans text-xl font-bold text-slate-900 flex items-center gap-1.5">
            <Presentation className="h-5 w-5 text-blue-600" />
            Former Speaking Engagements
          </h3>
          <p className="text-xs text-slate-500">Keynotes and active technical papers historically defended across the world</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-blue-600 font-semibold font-mono tracking-wider text-[9px] uppercase">
                <th className="p-3">EVENT / FORUM</th>
                <th className="p-3">ORGANIZATION / LOCATION</th>
                <th className="p-3">ROLE / FOCUS</th>
                <th className="p-3 text-right">YEAR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-705">
              {SPEAKING_ENGAGEMENTS.map((ev) => (
                <tr key={ev.event} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-3 font-semibold text-slate-900 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-blue-600 rounded-full" />
                    {ev.event}
                  </td>
                  <td className="p-3 font-mono">
                    <span className="text-slate-600 block">{ev.location}</span>
                  </td>
                  <td className="p-3 text-slate-600">{ev.role}</td>
                  <td className="p-3 text-right text-slate-500 font-mono">{ev.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. SIMULATED INTERACTIVE CALENDLY SCHEDULER */}
      <div id="consulting-calendar-scheduler" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-sm">
        <div className="space-y-1 text-center max-w-lg mx-auto">
          <span className="font-mono text-xs text-blue-600 tracking-widest font-bold uppercase block">SECURE AN ENGAGEMENT SLOT</span>
          <h3 className="font-sans text-xl font-bold text-slate-900">Interactive Advisory Scheduler</h3>
          <p className="text-xs text-slate-500">Choose your consultation service, date and time below to hold an initial scoping meeting directly with Prof. Owolawi's office</p>
        </div>

        {bookingConfirmed ? (
          <div className="py-12 text-center space-y-4 rounded-xl bg-slate-50 border border-emerald-500/30">
            <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500 text-emerald-600 animate-bounce">
              <CheckCheck className="h-6 w-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Advisory Scoping Reserved!</h4>
            <p className="text-xs text-slate-650 max-w-sm mx-auto leading-relaxed">
              Your video call confirmation regarding <strong>{selectedService}</strong> has been tentatively held for <strong>{selectedDate} at {selectedTime}</strong>. An automated Google Meet invite and curriculum checklist have been requested at <strong>{bookingForm.email}</strong>.
            </p>
            <span className="text-[10px] font-mono text-slate-500 block">Thank you for aligning scopes.</span>
          </div>
        ) : (
          <form onSubmit={handleBookConsultation} className="grid gap-6 md:grid-cols-12 items-start font-sans">
            
            {/* Left: Interactive Slot variables selects */}
            <div className="md:col-span-7 space-y-4">
              {/* Select Service */}
              <div className="space-y-1 text-xs">
                <label className="text-slate-600 font-semibold uppercase font-mono tracking-wider text-[10px]">1. Select Consultation Profile</label>
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full rounded border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                >
                  <option>Corporate AI Strategy Scoping (45 mins)</option>
                  <option>National Skills LMS Deployment Architecture (1 hour)</option>
                  <option>Precision Drone Agri Pilot Academy Scoping (1 hour)</option>
                  <option>Keynote / Guest Lecture Booking Form (45 mins)</option>
                  <option>Postgraduate Joint Supervision Sabbaticals (30 mins)</option>
                </select>
              </div>

              {/* Day browse */}
              <div className="space-y-2 text-xs">
                <label className="text-slate-600 font-semibold uppercase font-mono tracking-wider text-[10px] block">2. Select Date (June 2026)</label>
                <div className="flex flex-wrap gap-2">
                  {availableDates.map((dt) => {
                    const isSelected = selectedDate === dt;
                    const dateObj = new Date(dt);
                    const label = dateObj.toLocaleDateString('en-US', { day: 'numeric', weekday: 'short' });

                    return (
                      <button
                        type="button"
                        key={dt}
                        onClick={() => setSelectedDate(dt)}
                        className={`rounded-lg px-3.5 py-2 text-center font-mono text-xs font-semibold transition-all ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-50 border border-slate-200 hover:border-blue-600/50 text-slate-700'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots browse */}
              <div className="space-y-2 text-xs">
                <label className="text-slate-600 font-semibold uppercase font-mono tracking-wider text-[10px] block">3. Select Available Slot</label>
                <div className="grid grid-cols-2 gap-2 text-center">
                  {availableTimes.map((tm) => {
                    const isSelected = selectedTime === tm;

                    return (
                      <button
                        type="button"
                        key={tm}
                        onClick={() => setSelectedTime(tm)}
                        className={`rounded-lg py-2.5 font-mono text-xs transition-all ${
                          isSelected ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-emerald-600/50'
                        }`}
                      >
                        {tm}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Personal details fields */}
            <div className="md:col-span-5 rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-3 text-xs text-slate-700">
              <span className="font-mono text-[9px] text-blue-600 font-semibold tracking-wider block">4. CONTACT CONFIRMATION</span>
              
              <div className="space-y-1">
                <label className="text-slate-600">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                  placeholder="Dean Harrison"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600">Corporate Email *</label>
                <input 
                  type="email" 
                  required
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                  className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600"
                  placeholder="harrison@techuniversity.edu"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-600">Brief Agenda / Goals</label>
                <textarea 
                  rows={2}
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({...bookingForm, notes: e.target.value})}
                  className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-600 text-[11px]"
                  placeholder="Outline joint research or consulting requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded bg-blue-600 py-2.5 font-mono font-bold text-white hover:bg-blue-700 text-center flex items-center justify-center gap-1.5 mt-2 transition-colors"
              >
                <Calendar className="h-4 w-4" />
                Hold Advisory Call Slot
              </button>
            </div>

          </form>
        )}
      </div>

    </div>
  );
}
