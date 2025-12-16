import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { User, Edit2, Save, X, Activity, BarChart2, Plus, Image as ImageIcon, Trash2, Link as LinkIcon, AlertTriangle, RefreshCw, Download, Upload, Trophy, ArrowLeft, TrendingUp } from 'lucide-react';

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
      "Bottom": 9.4
    }
  },
  {
    "id": 2,
    "name": "Gina Valentina",
    "usageRate": 91,
    "image": "https://www.famousbirthdays.com/headshots/gina-valentina-1.jpg",
    "profileUrl": "https://www.whoreshub.com/models/gina-valentina/",
    "attributes": {
      "Personality": 9.2,
      "Frame": 10,
      "Face": 8.8,
      "Chest": 9,
      "Tummy": 9.3,
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
      "Personality": 9.5,
      "Frame": 9.7,
      "Face": 9.9,
      "Chest": 8.8,
      "Tummy": 9.8,
      "Bottom": 9.6
    }
  },
  {
    "id": 4,
    "name": "Emily Willis",
    "usageRate": 90,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/4l2exbHVH5m0HwKeXi822kpiAX1.jpg",
    "profileUrl": "https://www.whoreshub.com/models/emily-willis/",
    "attributes": {
      "Personality": 9.6,
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
    "image": "https://i1.sndcdn.com/avatars-000301529150-lt3lg1-t1080x1080.jpg",
    "profileUrl": "https://www.whoreshub.com/models/uma-jolie/",
    "attributes": {
      "Personality": 8.3,
      "Frame": 9.6,
      "Face": 9.1,
      "Chest": 9.5,
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
      "Frame": 9.9,
      "Face": 8.5,
      "Chest": 8.9,
      "Tummy": 8.5,
      "Bottom": 10
    }
  },
  {
    "id": 7,
    "name": "Adria Rae",
    "usageRate": 84,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY46mit9ZrMswn8Kcdh36vfv9qBNgMWVB-DQ&s",
    "profileUrl": "https://www.whoreshub.com/models/adria-rae/",
    "attributes": {
      "Personality": 9.1,
      "Frame": 8.6,
      "Face": 8.2,
      "Chest": 9.1,
      "Tummy": 9.5,
      "Bottom": 8.1
    }
  },
  {
    "id": 8,
    "name": "Avery Cristy",
    "usageRate": 82,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKT-EocA3P2-csesUsTxCOGagEKdiJo3oTrQ&s",
    "profileUrl": "https://www.whoreshub.com/models/avery-cristy/",
    "attributes": {
      "Personality": 8.6,
      "Frame": 8.9,
      "Face": 9.7,
      "Chest": 9,
      "Tummy": 9.8,
      "Bottom": 8.8
    }
  },
  {
    "id": 9,
    "name": "Molly Little",
    "usageRate": 86,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/xbawr3EPig87yctkUWH5gOh7kYW.jpg",
    "profileUrl": "https://www.whoreshub.com/search/molly-little/",
    "attributes": {
      "Personality": 9.3,
      "Frame": 9.3,
      "Face": 9.1,
      "Chest": 9,
      "Tummy": 9.7,
      "Bottom": 8.5
    }
  },
  {
    "id": 10,
    "name": "Little Caprice",
    "usageRate": 80,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKxLEvAbIym69rbnPpO4QztG6FXDR3D1A3sQ&s",
    "profileUrl": "https://www.whoreshub.com/search/Caprice/",
    "attributes": {
      "Personality": 8.3,
      "Frame": 9,
      "Face": 9.2,
      "Chest": 9.4,
      "Tummy": 9.7,
      "Bottom": 8.3
    }
  },
  {
    "id": 11,
    "name": "Anjelica",
    "usageRate": 75,
    "image": "https://www.amenpics.com/images/models/rad58CCF-2024-4-26.jpg",
    "profileUrl": "https://www.whoreshub.com/models/anjelica/",
    "attributes": {
      "Personality": 8,
      "Frame": 8.7,
      "Face": 8.6,
      "Chest": 9.2,
      "Tummy": 9.5,
      "Bottom": 8
    }
  },
  {
    "id": 12,
    "name": "Charlotte Sartre",
    "usageRate": 77,
    "image": "https://i.pinimg.com/736x/4a/bb/e9/4abbe95f8f35be535e5ae553900ba9bf.jpg",
    "profileUrl": "https://www.whoreshub.com/models/charlotte-sartre/",
    "attributes": {
      "Personality": 8.5,
      "Frame": 9.8,
      "Face": 7.6,
      "Chest": 10,
      "Tummy": 9.9,
      "Bottom": 9.2
    }
  },
  {
    "id": 13,
    "name": "Anastasia Knight",
    "usageRate": 78,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/2eSsbvKL3cXE742b5s16MZmJCIZ.jpg",
    "profileUrl": "https://www.whoreshub.com/models/anastasia-knight/",
    "attributes": {
      "Personality": 9.9,
      "Frame": 8.8,
      "Face": 8.3,
      "Chest": 8.9,
      "Tummy": 8.7,
      "Bottom": 8.9
    }
  },
  {
    "id": 14,
    "name": "Dakota Tyler",
    "usageRate": 79,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/oIvZ7a9BDYlDyDSomHMFsU3Xoyi.jpg",
    "profileUrl": "https://www.whoreshub.com/search/dakota-tyler/",
    "attributes": {
      "Personality": 8.9,
      "Frame": 9.3,
      "Face": 9.5,
      "Chest": 8,
      "Tummy": 9.7,
      "Bottom": 8.4
    }
  },
  {
    "id": 15,
    "name": "Lily Rader",
    "usageRate": 70,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSymhKTn4KrO92Vq60CxbpKJYo-m4o7DAz2fA&s",
    "profileUrl": "https://www.whoreshub.com/models/lily-rader/",
    "attributes": {
      "Personality": 8.4,
      "Frame": 9,
      "Face": 8.4,
      "Chest": 8.7,
      "Tummy": 8.8,
      "Bottom": 9.5
    }
  },
  {
    "id": 16,
    "name": "Jane Rogers",
    "usageRate": 72,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/lmZQrrEV8rYIrpFd1nQy2arXZMW.jpg",
    "profileUrl": "https://www.whoreshub.com/models/jane-rogers/",
    "attributes": {
      "Personality": 8.7,
      "Frame": 9.4,
      "Face": 8.9,
      "Chest": 9.1,
      "Tummy": 9.1,
      "Bottom": 8.3
    }
  },
  {
    "id": 17,
    "name": "Chloe Cherry",
    "usageRate": 74,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJh-2JIigmDOH9ekmc8zPvWcdFIREwSAFuYg&s",
    "profileUrl": "https://www.whoreshub.com/models/chloe-cherry/",
    "attributes": {
      "Personality": 9.8,
      "Frame": 8.8,
      "Face": 7.7,
      "Chest": 8.6,
      "Tummy": 8.9,
      "Bottom": 9.3
    }
  },
  {
    "id": 18,
    "name": "Arya Fae",
    "usageRate": 64,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/1yi30viyeTr30OtpcAgSz4GTizS.jpg",
    "profileUrl": "https://www.whoreshub.com/models/arya-fae/",
    "attributes": {
      "Personality": 8.8,
      "Frame": 8.7,
      "Face": 9,
      "Chest": 9.3,
      "Tummy": 8.3,
      "Bottom": 8.4
    }
  },
  {
    "id": 19,
    "name": "Lulu Chu",
    "usageRate": 69,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSby-kJTfFyvjuYHhxWWR51SwD42cEKIrOayA&s",
    "profileUrl": "https://www.whoreshub.com/models/lulu-chu/",
    "attributes": {
      "Personality": 8.6,
      "Frame": 8.9,
      "Face": 7.8,
      "Chest": 9,
      "Tummy": 8.7,
      "Bottom": 8.2
    }
  },
  {
    "id": 20,
    "name": "Evelyn Claire",
    "usageRate": 71,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV7GiBlMnmi6pk4FOUKg2nfxah3velv4Y2NQ&s",
    "profileUrl": "https://www.whoreshub.com/models/evelyn-claire/",
    "attributes": {
      "Personality": 8.2,
      "Frame": 8.9,
      "Face": 9.3,
      "Chest": 8.2,
      "Tummy": 8.6,
      "Bottom": 8.2
    }
  },
  {
    "id": 21,
    "name": "Alaina Dawson",
    "usageRate": 66,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/qyO81WdHHeUAwxQchuODOuvk9IE.jpg",
    "profileUrl": "https://www.whoreshub.com/models/alaina-dawson/",
    "attributes": {
      "Personality": 7.9,
      "Frame": 9.5,
      "Face": 8.3,
      "Chest": 8.3,
      "Tummy": 8.4,
      "Bottom": 9.1
    }
  },
  {
    "id": 22,
    "name": "Kristen Scott",
    "usageRate": 68,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUSfi2GI7Eu-K_HL1opLJvhQVbnQzG_HU7RQ&s",
    "profileUrl": "https://www.whoreshub.com/models/kristen-scott/",
    "attributes": {
      "Personality": 9.4,
      "Frame": 8.8,
      "Face": 8.8,
      "Chest": 8.9,
      "Tummy": 8.9,
      "Bottom": 8.8
    }
  },
  {
    "id": 23,
    "name": "Lily Larimar",
    "usageRate": 60,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/lK9K3SuqoaPc6C4eMRsUaO7zUP5.jpg",
    "profileUrl": "https://www.whoreshub.com/models/lily-larimar/",
    "attributes": {
      "Personality": 9,
      "Frame": 8.7,
      "Face": 7.9,
      "Chest": 8.7,
      "Tummy": 8.8,
      "Bottom": 8.4
    }
  },
  {
    "id": 24,
    "name": "Ivy Wolfe",
    "usageRate": 67,
    "image": "https://cdn-ksvod.kyivstar.ua/content/HLS/VOD/IMAGE3/63ee7e9f6c94b53c0f599e87/IMAGE_3_2_XL.jpg",
    "profileUrl": "https://www.whoreshub.com/models/ivy-wolfe/",
    "attributes": {
      "Personality": 10,
      "Frame": 8.8,
      "Face": 9,
      "Chest": 8.6,
      "Tummy": 8.9,
      "Bottom": 8.7
    }
  },
  {
    "id": 25,
    "name": "Riley Star",
    "usageRate": 59,
    "image": "https://image.tmdb.org/t/p/original/ssSNYzKeRGEQekjPNlipAf4sZ37.jpg",
    "profileUrl": "https://www.whoreshub.com/models/riley-star/",
    "attributes": {
      "Personality": 8.8,
      "Frame": 8.5,
      "Face": 8.7,
      "Chest": 7.5,
      "Tummy": 8,
      "Bottom": 9.1
    }
  },
  {
    "id": 26,
    "name": "Dani Lynn",
    "usageRate": 47,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvr70BmUbk7v2CC1f6cqGX7WVG4Qor5Iqoxg&s",
    "profileUrl": "https://hqporner.com/?q=dani+lynn",
    "attributes": {
      "Personality": 8.4,
      "Frame": 8.8,
      "Face": 8.9,
      "Chest": 9.2,
      "Tummy": 9.2,
      "Bottom": 8.1
    }
  },
  {
    "id": 27,
    "name": "Catalina Ossa",
    "usageRate": 49,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/2JaqG41khSU1fA8Zc2l2U3DLntp.jpg",
    "profileUrl": "https://www.whoreshub.com/models/catalina-ossa/",
    "attributes": {
      "Personality": 8.6,
      "Frame": 9.4,
      "Face": 7,
      "Chest": 8.9,
      "Tummy": 8.7,
      "Bottom": 9.2
    }
  },
  {
    "id": 28,
    "name": "Willow Ryder",
    "usageRate": 50,
    "image": "https://i.pinimg.com/474x/83/41/fc/8341fc2eccad621d49b9db6bdd63486a.jpg",
    "profileUrl": "https://www.whoreshub.com/models/willow-ryder/",
    "attributes": {
      "Personality": 9,
      "Frame": 9.5,
      "Face": 8,
      "Chest": 8.4,
      "Tummy": 7.8,
      "Bottom": 9.7
    }
  },
  {
    "id": 29,
    "name": "Jasmine Grey",
    "usageRate": 58,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/vfnaFQdCqruipzCUQIuNEDTn5Xl.jpg",
    "profileUrl": "https://www.whoreshub.com/models/jasmine-grey/",
    "attributes": {
      "Personality": 8.1,
      "Frame": 8.6,
      "Face": 8.7,
      "Chest": 8.9,
      "Tummy": 8.8,
      "Bottom": 7.8
    }
  },
  {
    "id": 30,
    "name": "Emma Bugg",
    "usageRate": 57,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLU2rEshQWOo2J3WqOdGVYgBq6KN_OU6DxCQ&s",
    "profileUrl": "https://www.whoreshub.com/search/Emma-Bugg/",
    "attributes": {
      "Personality": 8.9,
      "Frame": 9.1,
      "Face": 8.5,
      "Chest": 8.5,
      "Tummy": 9.3,
      "Bottom": 9.6
    }
  },
  {
    "id": 31,
    "name": "Val Steele",
    "usageRate": 45,
    "image": "https://media.themoviedb.org/t/p/w235_and_h235_face/96GeKvuvdLlOqXKNI7iSOWLUlRg.jpg",
    "profileUrl": "https://www.whoreshub.com/models/valerica-steele/",
    "attributes": {
      "Personality": 9.1,
      "Frame": 8.8,
      "Face": 8.3,
      "Chest": 8.6,
      "Tummy": 8.3,
      "Bottom": 9.4
    }
  },
  {
    "id": 32,
    "name": "Kimmy Granger",
    "usageRate": 35,
    "image": "https://images.bursadabugun.com/galeriler/2022/10/13/88465-film-yildizi-kimmy-granger-babam-menajerim-oldu-634800b647bc4.jpg",
    "profileUrl": "https://www.whoreshub.com/models/kimmy-granger/",
    "attributes": {
      "Personality": 9,
      "Frame": 8.6,
      "Face": 8.9,
      "Chest": 8.8,
      "Tummy": 8.6,
      "Bottom": 8.1
    }
  },
  {
    "id": 33,
    "name": "Kiara Cole",
    "usageRate": 40,
    "image": "data:image/jpeg;base64,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",
    "profileUrl": "https://www.whoreshub.com/models/kiara-cole/",
    "attributes": {
      "Personality": 8.6,
      "Frame": 8.7,
      "Face": 8.5,
      "Chest": 8.4,
      "Tummy": 8.8,
      "Bottom": 8.3
    }
  },
  {
    "id": 34,
    "name": "Xxlayna Marie",
    "usageRate": 51,
    "image": "https://cdni.pornpics.com/models/x/xxlayna_marie.jpg",
    "profileUrl": "https://www.whoreshub.com/models/xxlayna-marie/",
    "attributes": {
      "Personality": 8.8,
      "Frame": 8.6,
      "Face": 8.5,
      "Chest": 9.3,
      "Tummy": 8.4,
      "Bottom": 8.2
    }
  }
];

const ATTRIBUTE_KEYS = ["Personality", "Frame", "Face", "Chest", "Tummy", "Bottom"];
const RANKING_OPTIONS = ["Usage Rate", "Average Score", ...ATTRIBUTE_KEYS];

const App = () => {
  // 1. Initialize State
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

  const [view, setView] = useState('dashboard'); // 'dashboard' | 'ranking'
  const [yAxisMetric, setYAxisMetric] = useState('Average');
  const [rankingMetric, setRankingMetric] = useState('Usage Rate'); 
  
  const [selectedActorId, setSelectedActorId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState(null);
  
  const fileInputRef = useRef(null);

  // 2. Auto-Save Effect
  useEffect(() => {
    localStorage.setItem('actorAnalyticsData', JSON.stringify(data));
  }, [data]);

  // Lock body scroll when overlay is open on mobile
  useEffect(() => {
    if (selectedActorId && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedActorId]);

  const calculateAverage = (attributes) => {
    const values = Object.values(attributes);
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return parseFloat((sum / values.length).toFixed(1));
  };

  // --- DASHBOARD DATA PREP ---
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

  // --- RANKING DATA PREP ---
  const sortedRankingData = useMemo(() => {
    return [...data].map(actor => ({
      ...actor,
      averageScore: calculateAverage(actor.attributes)
    })).sort((a, b) => {
      let valA, valB;
      if (rankingMetric === 'Usage Rate') {
        valA = a.usageRate;
        valB = b.usageRate;
      } else if (rankingMetric === 'Average Score') {
        valA = a.averageScore;
        valB = b.averageScore;
      } else {
        valA = a.attributes[rankingMetric] || 0;
        valB = b.attributes[rankingMetric] || 0;
      }

      if (valB !== valA) return valB - valA;
      if (b.usageRate !== a.usageRate) return b.usageRate - a.usageRate;
      return a.name.localeCompare(b.name);
    });
  }, [data, rankingMetric]);


  // --- HANDLERS ---
  const handlePointClick = (node) => {
    if (node && node.id) {
      setSelectedActorId(node.id);
      setIsEditing(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleCloseDetails = () => {
    setSelectedActorId(null);
    setIsEditing(false);
  };

  const addNewActor = () => {
    const maxId = data.length > 0 ? Math.max(...data.map(d => d.id)) : 0;
    const newId = maxId + 1;

    const newActor = {
      id: newId,
      name: "New Actor",
      usageRate: 50,
      image: "https://placehold.co/150x150/cbd5e1/white?text=New",
      profileUrl: "",
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
        let finalProfileUrl = editForm.profileUrl ? editForm.profileUrl.trim() : "";
        if (finalProfileUrl === "" || finalProfileUrl === "#") {
            const slug = editForm.name.trim().toLowerCase().replace(/\s+/g, '-');
            finalProfileUrl = `https://www.whoreshub.com/models/${slug}/`;
        }

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

  // --- IO HANDLERS ---
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
          if (window.confirm(`Found ${importedData.length} actors in backup. Replace current list?`)) {
            setData(importedData);
            setSelectedActorId(null);
            setIsEditing(false);
          }
        } else {
           alert("Invalid file format.");
        }
      } catch (error) {
         alert("Error parsing JSON file.");
      }
      event.target.value = null; 
    };
  };

  const resetData = () => {
    if (window.confirm("Wipe all changes and restore defaults?")) {
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

  // --- CUSTOMIZABLE COLORS (HEX CODES) ---
  const getRankColor = (index) => {
    if (index === 0) return "border-[#e34bab]/50 bg-gradient-to-r from-[#e34bab]/10 to-transparent shadow-[#e34bab]/10"; 
    if (index === 1) return "border-[#ad589b]/50 bg-gradient-to-r from-[#ad589b]/10 to-transparent shadow-[#ad589b]/10"; 
    if (index === 2) return "border-[#88658c]/50 bg-gradient-to-r from-[#88658c]/10 to-transparent shadow-[#88658c]/10"; 
    return "border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50";
  };

  const getRankBadge = (index) => {
    if (index === 0) return <div className="text-xl font-bold text-[#e34bab]">#1</div>;
    if (index === 1) return <div className="text-xl font-bold text-[#ad589b]">#2</div>;
    if (index === 2) return <div className="text-xl font-bold text-[#88658c]">#3</div>;
    return <div className="text-xl font-bold text-slate-500">#{index + 1}</div>;
  };

  // --- REUSABLE DETAILS PANEL RENDERER ---
  const renderDetailsPanel = () => {
    if (!selectedActor) return null; 

    return (
      // Mobile: Fixed Overlay (z-50, inset-0). Desktop: Static layout (lg:static).
      <div className="fixed inset-0 z-50 lg:static lg:z-auto w-full lg:w-[400px] shrink-0 animate-slide-in-right bg-slate-900/90 lg:bg-transparent flex justify-center items-end lg:block p-0 lg:p-0 backdrop-blur-sm lg:backdrop-blur-none">
        
        {/* Mobile: Bottom Sheet logic with max-h-[85vh]. Desktop: Fit content. */}
        <div className="bg-slate-800 w-full lg:w-auto rounded-t-2xl lg:rounded-2xl p-6 border-t lg:border border-slate-700 shadow-2xl flex flex-col lg:sticky lg:top-6 relative h-[85vh] lg:h-fit lg:max-h-[calc(100vh-3rem)] overflow-y-auto custom-scrollbar">
          {!isEditing ? (
            <>
              {/* Close Button */}
              <button 
                onClick={handleCloseDetails} 
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-full p-1"
                title="Close"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center mb-6 mt-2">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500 shadow-lg mb-4 bg-slate-700">
                  <img src={selectedActor.image} alt={selectedActor.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-white text-center">{selectedActor.name}</h2>
                <div className="mt-2 flex gap-2">
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium">Avg: {selectedActor.averageScore}</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium">Usage: {selectedActor.usageRate}%</span>
                </div>
              </div>
              <div className="space-y-3 flex-grow">
                <h3 className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-2">Attributes</h3>
                {ATTRIBUTE_KEYS.map(key => (
                  <div key={key} className="flex justify-between items-center bg-slate-700/50 p-2 rounded">
                    <span className="text-slate-300 text-sm">{key}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500" style={{ width: `${(selectedActor.attributes[key] / 10) * 100}%` }} />
                      </div>
                      <span className="text-white font-mono font-bold text-sm w-8 text-right">{selectedActor.attributes[key]}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <a href={selectedActor.profileUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-3 lg:py-2 rounded-lg transition-colors font-medium text-sm"><User size={16} /> Profile</a>
                <button onClick={startEditing} className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 lg:py-2 rounded-lg transition-colors font-medium text-sm"><Edit2 size={16} /> Edit</button>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-700">
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white"><X size={24} /></button>
              </div>
              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-grow pb-10">
                <div className="space-y-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                    <div><label className="text-xs text-slate-400 block mb-1">Name</label><input type="text" value={editForm.name} onChange={(e) => handleFormChange('name', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-sm" /></div>
                    <div><label className="text-xs text-slate-400 block mb-1 flex items-center gap-1"><ImageIcon size={12} /> Image URL</label><input type="text" value={editForm.image} onChange={(e) => handleFormChange('image', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-xs font-mono text-slate-400" /></div>
                    <div><label className="text-xs text-slate-400 block mb-1 flex items-center gap-1"><LinkIcon size={12} /> Profile URL</label><input type="text" value={editForm.profileUrl} onChange={(e) => handleFormChange('profileUrl', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-xs font-mono text-slate-400" placeholder="Auto-generated if empty..." /></div>
                    <div><label className="text-xs text-slate-400 block mb-1">Usage Rate (%)</label><input type="number" value={editForm.usageRate} onChange={(e) => handleFormChange('usageRate', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none text-sm" /></div>
                </div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-2">Attributes</h4>
                {ATTRIBUTE_KEYS.map(key => (
                  <div key={key}>
                    <div className="flex justify-between mb-1"><label className="text-xs text-slate-300">{key}</label><span className="text-xs text-purple-400 font-mono">{editForm[key]}</span></div>
                    <input type="range" min="0" max="10" step="0.1" value={editForm[key]} onChange={(e) => handleFormChange(key, e.target.value)} className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-700 flex flex-col gap-3">
                <button onClick={saveChanges} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 lg:py-2 rounded-lg transition-colors font-bold shadow-lg shadow-green-900/20"><Save size={18} /> Save Changes</button>
                {showDeleteConfirm ? (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-red-200 text-sm font-medium"><AlertTriangle size={16} /> Are you sure?</div>
                      <div className="flex gap-2">
                        <button onClick={deleteActor} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-bold transition-colors">Yes, Delete</button>
                        <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-sm font-medium transition-colors">Cancel</button>
                      </div>
                    </div>
                ) : (
                  <button onClick={() => setShowDeleteConfirm(true)} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/30 hover:text-red-400 text-slate-400 py-3 lg:py-2 rounded-lg transition-colors font-medium border border-slate-700 hover:border-red-900/50"><Trash2 size={16} /> Delete Actor</button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-in-right { animation: slideInRight 0.3s ease-out forwards; }
      `}</style>
      
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".json" />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex items-center gap-4">
          <img src="/peachh.svg" alt="Logo" className="w-12 h-12 object-contain" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              SeekWeb
            </h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">
              {view === 'dashboard' ? "Ranking and Analytics" : " Ranking and Analytics"}
          </p>
          </div>
        </div>

        {/* TOP CONTROLS */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          
          {/* Toggle Switch */}
          <div className="flex items-center bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button
              onClick={() => setView('dashboard')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'dashboard' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title="Graph View"
            >
              <BarChart2 size={16} /> 
              {view === 'dashboard' && <span>Graph</span>}
            </button>
            <button
              onClick={() => setView('ranking')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                view === 'ranking' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
              title="Rank View"
            >
              <Trophy size={16} /> 
              {view === 'ranking' && <span>Rank</span>}
            </button>
          </div>
          
          <button onClick={addNewActor} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg shadow-blue-900/20 transition-all font-medium text-sm ml-auto lg:ml-0">
            <Plus size={18} /> <span className="hidden sm:inline">Add</span>
          </button>
          
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
            <button onClick={handleExport} title="Export" className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-700 rounded transition-colors"><Download size={18} /></button>
            <button onClick={handleImportClick} title="Import" className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-700 rounded transition-colors"><Upload size={18} /></button>
            <div className="w-px h-6 bg-slate-700 mx-1"></div>
            <button onClick={resetData} title="Reset" className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"><RefreshCw size={18} /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* MAIN CONTENT AREA */}
        <div className="flex-grow min-w-0 transition-all duration-500 ease-out">
          {view === 'dashboard' ? (
            <div key="dashboard" className="flex flex-col gap-6 animate-fade-in">
              <div className="flex justify-end mb-2">
                  <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-700 w-full lg:w-auto">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-2 px-2 whitespace-nowrap">
                      <BarChart2 size={16} /> <span className="hidden sm:inline">Y-Axis:</span>
                    </label>
                    <select 
                      value={yAxisMetric} 
                      onChange={(e) => setYAxisMetric(e.target.value)} 
                      className="bg-slate-700 text-white border-none rounded px-3 py-1 outline-none cursor-pointer hover:bg-slate-600 transition text-sm w-full"
                    >
                      <option value="Average">Average Score</option>
                      {ATTRIBUTE_KEYS.map(key => <option key={key} value={key}>{key}</option>)}
                    </select>
                  </div>
              </div>

              <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 shadow-xl backdrop-blur-sm h-[350px] lg:h-[500px] flex flex-col relative transition-all duration-300">

                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis type="number" dataKey="x" name="Usage Rate" unit="%" stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} domain={['dataMin - 5', 'dataMax + 5']} />
                    <YAxis type="number" dataKey="y" name={yAxisMetric} stroke="#94a3b8" tick={{fill: '#94a3b8', fontSize: 12}} domain={['auto', 'auto']} width={30} />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} />
                    <ZAxis range={[60, 400]} />
                    <Scatter name="Actors" data={chartData} onClick={handlePointClick} className="cursor-pointer">
                      {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.id === selectedActorId ? '#f472b6' : '#8b5cf6'} stroke={entry.id === selectedActorId ? '#fff' : 'none'} strokeWidth={2} />)}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div key="ranking" className="animate-fade-in">
              {/* Rank Controls */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl gap-4 lg:gap-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><TrendingUp size={24} /></div>
                  <div>
                    <h2 className="text-lg font-bold text-white">Leaderboard</h2>
                    <p className="text-xs text-slate-400">Sorted by value, then usage, then name</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <label className="text-sm font-medium text-slate-300 whitespace-nowrap">Rank By:</label>
                  <select 
                    value={rankingMetric}
                    onChange={(e) => setRankingMetric(e.target.value)}
                    className="bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 outline-none focus:border-purple-500 cursor-pointer w-full"
                  >
                    {RANKING_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </div>

              {/* Ranking List */}
              <div className="space-y-4 pb-20 lg:pb-0">
                {sortedRankingData.map((actor, index) => {
                  let displayValue = 0;
                  if (rankingMetric === 'Usage Rate') displayValue = `${actor.usageRate}%`;
                  else if (rankingMetric === 'Average Score') displayValue = actor.averageScore;
                  else displayValue = actor.attributes[rankingMetric];

                  return (
                    <div 
                      key={actor.id} 
                      onClick={() => handlePointClick(actor)}
                      className={`flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-xl border shadow-lg transition-all duration-500 cursor-pointer hover:scale-[1.01] ${getRankColor(index)} ${selectedActorId === actor.id ? 'ring-2 ring-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' : ''}`}
                    >
                      <div className="w-12 lg:w-24 text-center shrink-0">
                        {getRankBadge(index)}
                      </div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-slate-600 shrink-0">
                        <img src={actor.image} alt={actor.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="text-base lg:text-lg font-bold text-white truncate">{actor.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1 bg-slate-800/50 px-2 py-0.5 rounded whitespace-nowrap">
                              <Activity size={12} /> <span className="hidden lg:inline">Usage:</span> {actor.usageRate}%
                            </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0 px-2 lg:px-4">
                          <div className="text-[10px] lg:text-xs text-slate-400 uppercase tracking-wider mb-1">{rankingMetric}</div>
                          <div className="text-xl lg:text-2xl font-bold text-white font-mono">{displayValue}</div>
                      </div>
                    </div>
                  );
                })}

                {sortedRankingData.length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    No actors found. Add some from the dashboard!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* DETAILS PANEL - Stable placement */}
        {renderDetailsPanel()}

      </div>
    </div>
  );
};

export default App;