import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { User, Edit2, Save, X, Activity, BarChart2, Plus, Image as ImageIcon, Trash2, Link as LinkIcon, AlertTriangle, RefreshCw, Download, Upload } from 'lucide-react';

// --- DATABASE (Default/Fallback) ---
const initialActorData = [
  {
    "id": 1,
    "name": "Sasha Grey",
    "usageRate": 96,
    "image": "https://www.mapadoceu.com.br/photo/mapa/sasha-grey.jpg?v=1402790400",
    "profileUrl": "https://www.whoreshub.com/models/sasha-grey/",
    "attributes": {
      "Personality": 10,
      "Frame": 9,
      "Face": 9.6,
      "Chest": 9.8,
      "Tummy": 8.9,
      "Bottom": 9.3
    }
  },
  {
    "id": 2,
    "name": "Gina Valentina",
    "usageRate": 90,
    "image": "https://www.famousbirthdays.com/headshots/gina-valentina-1.jpg",
    "profileUrl": "https://www.whoreshub.com/models/gina-valentina/",
    "attributes": {
      "Personality": 9.1,
      "Frame": 10,
      "Face": 8.8,
      "Chest": 8.8,
      "Tummy": 9.2,
      "Bottom": 9.9
    }
  },
  {
    "id": 3,
    "name": "Riley Reid",
    "usageRate": 100,
    "image": "https://static4.tgstat.ru/channels/_0/e3/e3bca0b713b8250ec3d386e6da0aa75a.jpg",
    "profileUrl": "https://www.whoreshub.com/models/riley-reid/",
    "attributes": {
      "Personality": 9.4,
      "Frame": 9.7,
      "Face": 9.9,
      "Chest": 8.8,
      "Tummy": 9.7,
      "Bottom": 9.2
    }
  },
  {
    "id": 4,
    "name": "Emily Willis",
    "usageRate": 91,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/4l2exbHVH5m0HwKeXi822kpiAX1.jpg",
    "profileUrl": "https://www.whoreshub.com/models/emily-willis/",
    "attributes": {
      "Personality": 9.7,
      "Frame": 8.8,
      "Face": 8.7,
      "Chest": 8.9,
      "Tummy": 9.6,
      "Bottom": 8.9
    }
  },
  {
    "id": 5,
    "name": "Uma Jolie",
    "usageRate": 85,
    "image": "https://placehold.co/150x150/a78bfa/white?text=NA",
    "profileUrl": "https://www.whoreshub.com/models/uma-jolie/",
    "attributes": {
      "Personality": 8.1,
      "Frame": 9.4,
      "Face": 8.9,
      "Chest": 9.4,
      "Tummy": 10,
      "Bottom": 9
    }
  },
  {
    "id": 6,
    "name": "Remy Lacroix",
    "usageRate": 88,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/huNa6NArLpF0ZtSMesIcEf7OFdu.jpg",
    "profileUrl": "https://www.whoreshub.com/models/remy-lacroix/",
    "attributes": {
      "Personality": 8.4,
      "Frame": 9.8,
      "Face": 8.5,
      "Chest": 8.9,
      "Tummy": 8.7,
      "Bottom": 10
    }
  },
  {
    "id": 7,
    "name": "Adria Rae",
    "usageRate": 83,
    "image": "https://vipactors.com/wp-content/uploads/2023/06/Adria-Rae.jpg",
    "profileUrl": "https://www.whoreshub.com/models/adria-rae/",
    "attributes": {
      "Personality": 9.3,
      "Frame": 8.6,
      "Face": 8.2,
      "Chest": 9.1,
      "Tummy": 9.5,
      "Bottom": 8.1
    }
  }
];

const ATTRIBUTE_KEYS = ["Personality", "Frame", "Face", "Chest", "Tummy", "Bottom"];

const App = () => {
  // 1. Initialize State from Local Storage (or fallback to defaults)
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('actorAnalyticsData');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Failed to parse local storage data:", error);
        return initialActorData;
      }
    }
    return initialActorData;
  });

  const [yAxisMetric, setYAxisMetric] = useState('Average');
  const [selectedActorId, setSelectedActorId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const [editForm, setEditForm] = useState(null);
  
  // Ref for hidden file input
  const fileInputRef = useRef(null);

  // 2. Auto-Save Effect: Whenever 'data' changes, save it to Local Storage
  useEffect(() => {
    localStorage.setItem('actorAnalyticsData', JSON.stringify(data));
  }, [data]);

  const calculateAverage = (attributes) => {
    const values = Object.values(attributes);
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return parseFloat((sum / values.length).toFixed(1));
  };

  const chartData = useMemo(() => {
    return data.map(actor => {
      const yValue = yAxisMetric === 'Average' 
        ? calculateAverage(actor.attributes) 
        : actor.attributes[yAxisMetric];
        
      return {
        ...actor,
        x: actor.usageRate,
        y: yValue,
        averageScore: calculateAverage(actor.attributes)
      };
    });
  }, [data, yAxisMetric]);

  const selectedActor = useMemo(() => {
    return chartData.find(a => a.id === selectedActorId);
  }, [chartData, selectedActorId]);

  const handlePointClick = (node) => {
    if (node && node.id) {
      setSelectedActorId(node.id);
      setIsEditing(false);
      setShowDeleteConfirm(false);
    }
  };

  const addNewActor = () => {
    // Generate a unique ID even if list was filtered/deleted
    const maxId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0;
    const newId = maxId + 1;

    const newActor = {
      id: newId,
      name: "New Actor",
      usageRate: 50,
      image: "https://placehold.co/150x150/cbd5e1/white?text=New",
      profileUrl: "", // Default to empty so auto-fill triggers on first save
      attributes: {
        Personality: 5.0,
        Frame: 5.0,
        Face: 5.0,
        Chest: 5.0,
        Tummy: 5.0,
        Bottom: 5.0
      }
    };

    setData(prev => [...prev, newActor]);
    setSelectedActorId(newId);
    
    setEditForm({
      id: newActor.id,
      name: newActor.name,
      image: newActor.image,
      profileUrl: newActor.profileUrl,
      usageRate: newActor.usageRate,
      ...newActor.attributes
    });
    setIsEditing(true);
    setShowDeleteConfirm(false);
  };

  const startEditing = () => {
    if (selectedActor) {
      setEditForm({
        id: selectedActor.id,
        name: selectedActor.name,
        image: selectedActor.image,
        profileUrl: selectedActor.profileUrl,
        usageRate: selectedActor.usageRate,
        ...selectedActor.attributes
      });
      setIsEditing(true);
      setShowDeleteConfirm(false);
    }
  };

  const saveChanges = () => {
    const updatedData = data.map(actor => {
      if (actor.id === editForm.id) {
        
        // --- AUTO-URL LOGIC ---
        // If profile URL is empty or just '#', generate default from name
        let finalProfileUrl = editForm.profileUrl ? editForm.profileUrl.trim() : "";
        
        if (finalProfileUrl === "" || finalProfileUrl === "#") {
            const slug = editForm.name.trim().toLowerCase().replace(/\s+/g, '-');
            finalProfileUrl = `https://www.whoreshub.com/models/${slug}/`;
        }
        // ----------------------

        return {
          ...actor,
          name: editForm.name,
          image: editForm.image,
          profileUrl: finalProfileUrl,
          usageRate: parseFloat(editForm.usageRate),
          attributes: {
            Personality: parseFloat(editForm.Personality),
            Frame: parseFloat(editForm.Frame),
            Face: parseFloat(editForm.Face),
            Chest: parseFloat(editForm.Chest),
            Tummy: parseFloat(editForm.Tummy),
            Bottom: parseFloat(editForm.Bottom),
          }
        };
      }
      return actor;
    });
    setData(updatedData);
    setIsEditing(false);
  };

  const deleteActor = () => {
    setData(prev => prev.filter(a => a.id !== selectedActorId));
    setSelectedActorId(null);
    setIsEditing(false);
    setShowDeleteConfirm(false);
  };

  // --- EXPORT FUNCTIONALITY ---
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `actor-analytics-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // --- IMPORT FUNCTIONALITY ---
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          // Confirm before overwriting
          if (window.confirm(`Found ${importedData.length} actors in backup. This will replace your current list. Continue?`)) {
            setData(importedData);
            setSelectedActorId(null);
            setIsEditing(false);
          }
        } else {
           alert("Invalid file format. The backup must be a JSON array.");
        }
      } catch (error) {
         alert("Error parsing JSON file. Please make sure it's a valid backup.");
      }
      // Reset input value so the same file can be selected again if needed
      event.target.value = null; 
    };
  };

  // Utility to clear storage
  const resetData = () => {
    if (window.confirm("This will wipe all your saved changes and restore the default actors. Are you sure?")) {
        localStorage.removeItem('actorAnalyticsData');
        setData(initialActorData);
        setSelectedActorId(null);
    }
  };

  const handleFormChange = (key, value) => {
    setEditForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-800 border border-slate-700 p-2 rounded shadow-xl text-xs text-slate-200">
          <p className="font-bold mb-1">{data.name}</p>
          <p>Usage: {data.x}%</p>
          <p>{yAxisMetric}: {data.y}</p>
          <p className="text-slate-400 italic mt-1">Click dot for details</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      
      {/* Hidden File Input for Import */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".json" 
      />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Actor Analytics
          </h1>
          <p className="text-slate-400 text-sm mt-1">Interactive Usage vs. Attribute mapping</p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={addNewActor}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded-lg shadow-lg shadow-blue-900/20 transition-all font-medium text-sm"
          >
            <Plus size={18} />
            Add Actor
          </button>
          
          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button 
              onClick={handleExport}
              title="Export Backup"
              className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-700 rounded transition-colors"
            >
              <Download size={18} />
            </button>
            <button 
              onClick={handleImportClick}
              title="Import Backup"
              className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors"
            >
              <Upload size={18} />
            </button>
            <div className="w-px h-6 bg-slate-700 mx-1"></div>
            <button 
              onClick={resetData}
              title="Reset to Defaults"
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>

          <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-700">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2 px-2">
              <BarChart2 size={16} />
              <span className="hidden sm:inline">Y-Axis:</span>
            </label>
            <select 
              value={yAxisMetric}
              onChange={(e) => setYAxisMetric(e.target.value)}
              className="bg-slate-700 text-white border-none rounded px-3 py-1 focus:ring-2 focus:ring-purple-500 outline-none cursor-pointer hover:bg-slate-600 transition text-sm"
            >
              <option value="Average">Average Score</option>
              {ATTRIBUTE_KEYS.map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* GRAPH SECTION */}
        <div className="lg:col-span-2 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 shadow-xl backdrop-blur-sm h-[500px] flex flex-col relative">

           <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Usage Rate" 
                unit="%" 
                stroke="#94a3b8" 
                tick={{fill: '#94a3b8'}}
                label={{ value: 'Usage Rate (%)', position: 'bottom', offset: 0, fill: '#64748b' }}
                domain={['dataMin - 5', 'dataMax + 5']} 
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name={yAxisMetric} 
                stroke="#94a3b8" 
                tick={{fill: '#94a3b8'}}
                label={{ value: yAxisMetric, angle: -90, position: 'insideLeft', fill: '#64748b' }}
                domain={['auto', 'auto']} 
              />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} />
              <ZAxis range={[60, 400]} />
              <Scatter 
                name="Actors" 
                data={chartData} 
                onClick={handlePointClick}
                className="cursor-pointer"
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.id === selectedActorId ? '#f472b6' : '#8b5cf6'} 
                    stroke={entry.id === selectedActorId ? '#fff' : 'none'}
                    strokeWidth={2}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* DETAILS / EDIT PANEL */}
        <div className="lg:col-span-1">
          {selectedActor ? (
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl h-full flex flex-col transition-all duration-300">
              
              {!isEditing ? (
                // --- VIEW MODE ---
                <>
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-4 bg-slate-700">
                      <img src={selectedActor.image} alt={selectedActor.name} className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-2xl font-bold text-white text-center">{selectedActor.name}</h2>
                    <div className="mt-2 flex gap-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium">
                        Avg: {selectedActor.averageScore}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">
                        Usage: {selectedActor.usageRate}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 flex-grow">
                    <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Attributes</h3>
                    {ATTRIBUTE_KEYS.map(key => (
                      <div key={key} className="flex justify-between items-center bg-slate-700/50 p-2 rounded">
                        <span className="text-slate-300 text-sm">{key}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-400 to-purple-500" 
                              style={{ width: `${(selectedActor.attributes[key] / 10) * 100}%` }}
                            />
                          </div>
                          <span className="text-white font-mono font-bold text-sm w-8 text-right">
                            {selectedActor.attributes[key]}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-3">
                    <a 
                      href={selectedActor.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors font-medium text-sm"
                    >
                      <User size={16} /> Profile
                    </a>
                    <button 
                      onClick={startEditing}
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors font-medium text-sm"
                    >
                      <Edit2 size={16} /> Edit
                    </button>
                  </div>
                </>
              ) : (
                // --- EDIT MODE ---
                <>
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                    <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                    
                    {/* General Info Inputs */}
                    <div className="space-y-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                        <div>
                            <label className="text-xs text-slate-400 block mb-1">Name</label>
                            <input 
                                type="text" 
                                value={editForm.name}
                                onChange={(e) => handleFormChange('name', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                                <ImageIcon size={12} /> Image URL
                            </label>
                            <input 
                                type="text" 
                                value={editForm.image}
                                onChange={(e) => handleFormChange('image', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-xs font-mono text-slate-400"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                                <LinkIcon size={12} /> Profile URL
                            </label>
                            <input 
                                type="text" 
                                value={editForm.profileUrl}
                                onChange={(e) => handleFormChange('profileUrl', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-xs font-mono text-slate-400"
                                placeholder="Auto-generated if empty..."
                            />
                        </div>
                         <div>
                            <label className="text-xs text-slate-400 block mb-1">Usage Rate (%)</label>
                            <input 
                                type="number" 
                                value={editForm.usageRate}
                                onChange={(e) => handleFormChange('usageRate', e.target.value)}
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-sm"
                            />
                        </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-2">Attributes</h4>
                    {/* Attribute Sliders */}
                    {ATTRIBUTE_KEYS.map(key => (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <label className="text-xs text-slate-300">{key}</label>
                          <span className="text-xs text-purple-400 font-mono">{editForm[key]}</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="10" 
                          step="0.1"
                          value={editForm[key]} 
                          onChange={(e) => handleFormChange(key, e.target.value)}
                          className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col gap-3">
                    <button 
                      onClick={saveChanges}
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors font-bold shadow-lg shadow-green-900/20"
                    >
                      <Save size={18} /> Save Changes
                    </button>
                    
                    {/* DELETE SECTION */}
                    {showDeleteConfirm ? (
                       <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex flex-col gap-2">
                         <div className="flex items-center gap-2 text-red-200 text-sm font-medium">
                           <AlertTriangle size={16} /> Are you sure?
                         </div>
                         <div className="flex gap-2">
                           <button 
                             onClick={deleteActor}
                             className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded text-sm font-bold transition-colors"
                           >
                             Yes, Delete
                           </button>
                           <button 
                             onClick={() => setShowDeleteConfirm(false)}
                             className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-1 rounded text-sm font-medium transition-colors"
                           >
                             Cancel
                           </button>
                         </div>
                       </div>
                    ) : (
                      <button 
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/30 hover:text-red-400 text-slate-400 py-2 rounded-lg transition-colors font-medium border border-slate-700 hover:border-red-900/50"
                      >
                        <Trash2 size={16} /> Delete Actor
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          ) : (
            // --- EMPTY STATE ---
            <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-2xl h-full flex flex-col items-center justify-center text-slate-500 p-8">
              <Activity size={48} className="mb-4 opacity-50" />
              <p className="text-center">Select a node on the graph to view details.<br/>Or click <strong>Add Actor</strong> to create one.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;