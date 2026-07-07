import React from 'react';
import { Video, RefreshCw, AlertCircle, CheckCircle, Wifi, CameraOff, Play, Maximize2, Shield } from 'lucide-react';
import { CameraSession } from '../types';

interface LiveMonitoringViewProps {
  cameras: CameraSession[];
}

export const LiveMonitoringView: React.FC<LiveMonitoringViewProps> = ({ cameras }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Live Camera Ingestion Control</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-100 text-emerald-800 font-bold">
              14/16 Active
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time RTSP/WebRTC stream monitoring with OpenCV frame parsing and DeepFace face detection pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 font-mono">
            <RefreshCw className="w-4 h-4" />
            Reset Streams
          </button>
          <button className="px-4 py-2 bg-[#2563EB] text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-all">
            + Provision Camera
          </button>
        </div>
      </div>

      {/* Grid of Cameras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameras.map((cam) => {
          const isOnline = cam.status === 'Online';
          const isConnecting = cam.status === 'Connecting';
          
          return (
            <div key={cam.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
              {/* Stream Screen */}
              <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group">
                {cam.streamUrl && isOnline ? (
                  <img 
                    src={cam.streamUrl} 
                    alt={cam.room} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <CameraOff className="w-12 h-12 stroke-1 mb-2 text-slate-600" />
                    <p className="font-mono text-sm font-medium text-slate-400">
                      {isConnecting ? 'RTSP STREAM NEGOTIATING...' : 'STREAM OFFLINE / MAINTENANCE'}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">Device ID: {cam.cameraId}</p>
                  </div>
                )}

                {/* HUD Overlays */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md ${
                      isOnline ? 'bg-rose-600/90 text-white animate-pulse' :
                      isConnecting ? 'bg-amber-500/90 text-white' :
                      'bg-slate-800/90 text-slate-400'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-slate-400'}`} />
                      {isOnline ? 'LIVE FEED' : cam.status.toUpperCase()}
                    </span>
                    {isOnline && (
                      <span className="px-2 py-1 rounded text-[11px] font-mono bg-slate-900/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                        {cam.fps} FPS
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    <button className="p-1.5 rounded bg-slate-900/70 hover:bg-slate-800 text-white backdrop-blur-md transition-colors" title="Full Screen">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Bottom HUD info */}
                {isOnline && (
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                    <div className="px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                      <span>Bounding Box Pipeline: YOLOv8</span>
                      <span className="text-blue-400 font-bold">{cam.facesDetected} Faces Tracked</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Camera Details & Telemetry */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{cam.room}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">Hardware ID: {cam.cameraId}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-blue-50 text-[#2563EB] rounded-md font-mono text-xs font-semibold">
                      {cam.classCode}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Wifi className={`w-3.5 h-3.5 ${isOnline ? 'text-emerald-500' : 'text-slate-400'}`} />
                    <span>Last heartbeat: {cam.lastActive}</span>
                  </div>
                  <div className="flex items-center gap-3 font-sans">
                    <button className="text-[#2563EB] hover:underline font-medium text-xs">Configure ROI</button>
                    <button className="text-slate-600 hover:text-slate-900 font-medium text-xs">Diagnostics</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
