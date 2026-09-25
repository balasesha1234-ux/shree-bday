import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Volume2,
  Volume1,
  VolumeX,
  Heart,
  Sparkles,
  ExternalLink,
  Share2,
  Check,
  Disc,
  ListMusic,
  Radio,
  Music,
  Mic2,
  Flame,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export interface SpotifyTrack {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSeconds: number;
  audioUrl: string;
  coverImage: string;
  subtitle: string;
  plays: string;
  themeColor: string;
  glowColor: string;
  lyrics: {
    sanskrit: string;
    english: string;
  }[];
  spotifyUrl: string;
}

const SPOTIFY_DISCOGRAPHY: SpotifyTrack[] = [
  {
    id: 1,
    title: 'Garuda Gamana Tava',
    artist: 'Shree Naval Kishori',
    album: 'Sacred Invocations',
    duration: '4:20',
    durationSeconds: 260,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/1s.jpg',
    subtitle: 'Maha Vishnu Stotram • Sacred Grace',
    plays: '342,810',
    themeColor: '#1DB954',
    glowColor: 'rgba(29, 185, 84, 0.35)',
    lyrics: [
      {
        sanskrit: 'गरुडगमन तव चरणकमलमिह मनसि लसतु मम नित्यम् |',
        english: 'May your sacred lotus feet, O Lord who rides Garuda, forever illuminate my heart.'
      },
      {
        sanskrit: 'ममक तापमपा कुरु देव | गरुडगमन तव चरणकमलम् ||',
        english: 'Dispel all sorrows and burdens from my life, O Divine Protector.'
      },
      {
        sanskrit: 'जलजलोचन जनार्दन जगदीश्वर पाहि मां प्रपन्नम् |',
        english: 'Lotus-eyed Sovereign of the cosmos, protect this devoted seeker under Your refuge.'
      }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 2,
    title: 'Sri Venkatesha Stotram',
    artist: 'Shree Naval Kishori, Ashwin Trivedi',
    album: 'Divine Radiance',
    duration: '4:32',
    durationSeconds: 272,
    audioUrl: '/assets/audio/ambient.mp3',
    coverImage: '/assets/serial/2s.jpg',
    subtitle: 'Sacred Seven Hills Hymn',
    plays: '289,450',
    themeColor: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.3)',
    lyrics: [
      {
        sanskrit: 'कमलाकुच चूचुक कुङ्कुमतो नियतारुणिता तुलनीलतनो |',
        english: 'Adorned with divine sacred saffron, possessing an incomparable sapphire celestial form.'
      },
      {
        sanskrit: 'कमलायत लोचन लोकपते विजयीभव वेङ्कट शैलपते ||',
        english: 'O Lord of the worlds with wide lotus eyes, victory unto You, Sovereign of Venkata Hills.'
      }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 3,
    title: 'Jaya Janardhana',
    artist: 'Shree Naval Kishori',
    album: 'Sacred Bhakti',
    duration: '5:26',
    durationSeconds: 326,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/11s.jpg',
    subtitle: 'Bhakti • Closer to You',
    plays: '412,900',
    themeColor: '#FF4D8D',
    glowColor: 'rgba(255, 77, 141, 0.35)',
    lyrics: [
      {
        sanskrit: 'जय जनार्दन कृष्ण राधिकापते | जनार्दन पालय मां परमानन्द रूपिणे ||',
        english: 'Victory to Lord Janardhana, the Beloved of Sri Radha, O embodiment of supreme bliss.'
      },
      {
        sanskrit: 'दीन दयाल गोपाल हरे | भवसागर तारक प्रभो ||',
        english: 'Compassionate friend to all souls, ferry us across the ocean of worldly trials.'
      }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 4,
    title: 'Achyutam Keshavam',
    artist: 'Shree Naval Kishori',
    album: 'Serenity & Grace',
    duration: '5:12',
    durationSeconds: 312,
    audioUrl: '/assets/audio/background.mp3',
    coverImage: '/assets/serial/13s.jpg',
    subtitle: 'Peace • A Lighter Tomorrow',
    plays: '531,200',
    themeColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.3)',
    lyrics: [
      {
        sanskrit: 'अच्युतं केशवं रामनारायणं कृष्णदामोदरं वासुदेवं हरिम् |',
        english: 'I sing of Achyuta, Keshava, Rama, Narayana, Krishna, Damodara, Vasudeva, and Hari.'
      },
      {
        sanskrit: 'श्रीधरं माधवं गोपिकावल्लभं जानकीनायकं रामचन्द्रं भजे ||',
        english: 'I worship Sridhara, Madhava, Beloved of the Gopis, and the beloved Lord of Janaki, Ramachandra.'
      }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 5,
    title: 'Radha Rani Bhajan',
    artist: 'Soul Strings & Shree',
    album: 'Kindness • In Every Note',
    duration: '3:45',
    durationSeconds: 225,
    audioUrl: '/assets/audio/track3.mp3',
    coverImage: '/assets/serial/15s.jpg',
    subtitle: 'Warmth & Unconditional Devotion',
    plays: '268,100',
    themeColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    lyrics: [
      {
        sanskrit: 'राधे राधे जपो चले आएंगे बिहारी |',
        english: 'Chant the sweet name of Sri Radha, and Sri Krishna shall swiftly bless your life.'
      },
      {
        sanskrit: 'राधे रानी हमारी महारानी, हमारो धन राधा ||',
        english: 'Sri Radha Rani is our supreme sovereign, our eternal divine treasure.'
      }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 6,
    title: 'Peace by the Yamuna',
    artist: 'Shree Melodies & Sacred Flute',
    album: 'Alliance & Meditation',
    duration: '4:02',
    durationSeconds: 242,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/8s.jpg',
    subtitle: 'Vrindavan Flute Serenade',
    plays: '198,400',
    themeColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.3)',
    lyrics: [
      {
        sanskrit: 'यमुना तीरे वेणुनादः श्रूयते परमानन्दः |',
        english: 'On the sacred banks of Yamuna, the divine flute resonance floods creation with ecstasy.'
      },
      {
        sanskrit: 'श्रीकृष्णाङ्ग सङ्ग सुखं सर्वदा हृदि भासताम् ||',
        english: 'May the joyful presence of Sri Krishna illuminate every quiet moment.'
      }
    ],
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  }
];

export const SpotifyArtistSection: React.FC = () => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'player' | 'embed' | 'lyrics'>('player');

  // Playback State
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Social & Interactivity
  const [likedTrackIds, setLikedTrackIds] = useState<Set<number>>(new Set([1, 3, 4]));
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const [followersCount, setFollowersCount] = useState<number>(24580);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [loveSparks, setLoveSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Audio Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const currentTrack = SPOTIFY_DISCOGRAPHY[currentTrackIndex];

  // Initialize and Sync Audio
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Handle Track Change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    setProgressPercent(0);

    if (isPlaying) {
      audioRef.current.play().catch(() => {
        // Autoplay may be restricted until user interaction
        setIsPlaying(false);
      });
    }
  }, [currentTrackIndex]);

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setCurrentTime(audio.currentTime);
        setProgressPercent((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else if (repeatMode === 'all') {
        handleNextTrack();
      } else {
        // Repeat off
        if (currentTrackIndex < SPOTIFY_DISCOGRAPHY.length - 1) {
          handleNextTrack();
        } else {
          setIsPlaying(false);
          audio.currentTime = 0;
        }
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [repeatMode, currentTrackIndex, isShuffle]);

  // Play/Pause Toggle
  const togglePlay = () => {
    soundEngine.playPop();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback or retry
        setIsPlaying(true);
      });
    }
  };

  // Next Track
  const handleNextTrack = () => {
    soundEngine.playTap();
    if (isShuffle) {
      let nextIdx = Math.floor(Math.random() * SPOTIFY_DISCOGRAPHY.length);
      if (nextIdx === currentTrackIndex && SPOTIFY_DISCOGRAPHY.length > 1) {
        nextIdx = (nextIdx + 1) % SPOTIFY_DISCOGRAPHY.length;
      }
      setCurrentTrackIndex(nextIdx);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % SPOTIFY_DISCOGRAPHY.length);
    }
  };

  // Previous Track
  const handlePrevTrack = () => {
    soundEngine.playTap();
    const audio = audioRef.current;
    // If playing past 3 seconds, reset to beginning of current track like Spotify
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      setCurrentTime(0);
      setProgressPercent(0);
      return;
    }

    if (isShuffle) {
      let prevIdx = Math.floor(Math.random() * SPOTIFY_DISCOGRAPHY.length);
      setCurrentTrackIndex(prevIdx);
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + SPOTIFY_DISCOGRAPHY.length) % SPOTIFY_DISCOGRAPHY.length);
    }
  };

  // Repeat Mode Cycle: off -> all -> one -> off
  const cycleRepeatMode = () => {
    soundEngine.playTap();
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  // Shuffle Toggle
  const toggleShuffle = () => {
    soundEngine.playTap();
    setIsShuffle(!isShuffle);
  };

  // Seekbar Scrubbing
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
    const audio = audioRef.current;

    const targetTime = clickRatio * (audio?.duration || currentTrack.durationSeconds);
    if (audio) {
      audio.currentTime = targetTime;
    }
    setCurrentTime(targetTime);
    setProgressPercent(clickRatio * 100);
  };

  // Toggle Like
  const toggleLike = (id: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundEngine.playSparkle(1.5);
    setLikedTrackIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
        if (e) triggerCustomConfetti(e.clientX, e.clientY);
      }
      return updated;
    });
  };

  // Toggle Follow
  const toggleFollow = (e: React.MouseEvent) => {
    soundEngine.playSparkle(2);
    triggerCustomConfetti(e.clientX, e.clientY);
    setIsFollowing((prev) => {
      const next = !prev;
      setFollowersCount((c) => (next ? c + 1 : c - 1));
      return next;
    });
  };

  // Copy Spotify Link
  const handleCopyLink = () => {
    soundEngine.playPop();
    navigator.clipboard.writeText('https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C');
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Shower Love Effect
  const handleShowerLove = (e: React.MouseEvent) => {
    soundEngine.playSparkle(1.8);
    triggerCustomConfetti(e.clientX, e.clientY);
    const newSpark = { id: Date.now(), x: e.clientX, y: e.clientY };
    setLoveSparks((prev) => [...prev.slice(-6), newSpark]);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 py-10 select-none z-20">
      {/* Hidden Real HTML5 Audio Player */}
      <audio ref={audioRef} preload="metadata" />

      {/* Main Glassmorphic Spotify Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-[2.5rem] bg-[#121212]/95 backdrop-blur-2xl text-white border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(29,185,84,0.15)] overflow-hidden"
      >
        {/* Dynamic Track Theme Ambient Aurora Background */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[130px] pointer-events-none transition-all duration-700 opacity-30"
          style={{ background: currentTrack.themeColor }}
        />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-[140px] bg-[#1DB954]/15 pointer-events-none" />

        {/* ========================================================================= */}
        {/* 1. ARTIST TOP BANNER (Header & Verification) */}
        {/* ========================================================================= */}
        <div className="relative z-10 p-5 sm:p-7 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Spotify Brand Emblem */}
            <div className="relative group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1DB954] text-black flex items-center justify-center shadow-[0_0_25px_rgba(29,185,84,0.5)] group-hover:scale-105 transition-all">
                <svg className="w-8 h-8 fill-black" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.217.356-.677.469-1.033.252-2.828-1.728-6.388-2.119-10.58-1.162-.406.092-.812-.163-.905-.568-.092-.406.163-.812.568-.905 4.595-1.05 8.528-.609 11.698 1.35.356.217.469.677.252 1.033zm1.472-3.267c-.273.444-.856.586-1.3.313-3.238-1.99-8.175-2.566-12.004-1.403-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.381-1.33 9.813-.687 13.537 1.602.444.273.586.856.313 1.294zm.126-3.411c-3.882-2.305-10.292-2.518-14.004-1.391-.597.181-1.23-.162-1.411-.759-.181-.597.162-1.23.759-1.411 4.267-1.296 11.336-1.047 15.807 1.608.536.318.712 1.012.394 1.548-.318.536-1.012.712-1.545.405z" />
                </svg>
              </div>
              {/* Verified Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#181818] border-2 border-[#121212] flex items-center justify-center text-[#1DB954]">
                <CheckCircle2 className="w-4 h-4 fill-[#1DB954] text-black" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-fredoka text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Shree Naval Kishori
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1DB954] text-[10px] font-space font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Artist</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-quicksand text-gray-400 mt-1">
                <span className="text-[#FFD700] font-semibold flex items-center gap-1">
                  <span>🪷</span>
                  <span>{followersCount.toLocaleString()} Monthly Listeners</span>
                </span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="text-gray-300">Divine Invocations, Stotrams & Bhajans</span>
              </div>
            </div>
          </div>

          {/* Artist Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Follow Button */}
            <button
              onClick={toggleFollow}
              className={`px-4 py-2 rounded-full font-fredoka text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                isFollowing
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-[#1DB954] hover:bg-[#1ed760] text-black'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <span>+ Follow</span>
                </>
              )}
            </button>

            {/* Shower Love & Confetti Button */}
            <button
              onClick={handleShowerLove}
              className="px-3.5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border border-pink-400/40 text-pink-300 font-fredoka text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              title="Send Flowers and Love to Shree"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
              <span>Shower Love 🌸</span>
            </button>

            {/* Share Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Copy Spotify Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Open in Spotify App Direct Link */}
            <a
              href="https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-fredoka text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(29,185,84,0.4)] flex items-center gap-1.5"
            >
              <span>Open in Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MODE SWITCHER TABS (Studio Player vs Embed vs Lyrics) */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-5 sm:px-7 pt-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 text-xs font-space">
            <button
              onClick={() => {
                soundEngine.playTap();
                setActiveTab('player');
              }}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === 'player'
                  ? 'bg-gradient-to-r from-[#1DB954] to-[#1ed760] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Disc className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>Interactive Player</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playTap();
                setActiveTab('embed');
              }}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === 'embed'
                  ? 'bg-[#1DB954] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Official Spotify Embed</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playTap();
                setActiveTab('lyrics');
              }}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === 'lyrics'
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mic2 className="w-3.5 h-3.5" />
              <span>Devotional Lyrics</span>
            </button>
          </div>

          {/* Equalizer Indicator when Playing */}
          <div className="flex items-center gap-2 text-xs font-space text-gray-400">
            <span className="hidden sm:inline">NOW TUNED:</span>
            <div className="flex items-end gap-0.5 h-4 w-7">
              {[0.4, 0.9, 0.6, 1, 0.7].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: isPlaying ? [`${h * 100}%`, `${(1 - h) * 100 + 20}%`, `${h * 100}%`] : '20%'
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + i * 0.15,
                    ease: 'easeInOut'
                  }}
                  className="w-1 bg-[#1DB954] rounded-t-sm"
                />
              ))}
            </div>
            <span className="text-white font-mono text-[11px] truncate max-w-[140px] sm:max-w-none">
              {currentTrack.title}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. TAB CONTENT */}
        {/* ========================================================================= */}
        <div className="relative z-10 p-5 sm:p-7">
          {/* ----------------------------------------------------------------------- */}
          {/* TAB 1: INTERACTIVE HI-FI SPOTIFY PLAYER */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'player' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Big Album Art + Vinyl Record + Now Playing Controls */}
              <div className="lg:col-span-5 flex flex-col items-center p-6 rounded-3xl bg-black/40 border border-white/10 shadow-inner relative overflow-hidden">
                {/* Vinyl Record Visual */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-2">
                  {/* Outer Vinyl Disc */}
                  <motion.div
                    animate={{ rotate: isPlaying ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#111] via-[#1a1a1a] to-black border-4 border-neutral-700/50 shadow-2xl flex items-center justify-center"
                  >
                    {/* Vinyl Grooves */}
                    <div className="absolute inset-3 rounded-full border border-neutral-700/40 pointer-events-none" />
                    <div className="absolute inset-7 rounded-full border border-neutral-700/30 pointer-events-none" />
                    <div className="absolute inset-11 rounded-full border border-neutral-700/20 pointer-events-none" />

                    {/* Center Vinyl Hole */}
                    <div className="w-5 h-5 rounded-full bg-[#121212] border-2 border-[#1DB954] shadow-inner" />
                  </motion.div>

                  {/* Album Cover Over Vinyl */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="relative w-36 h-36 sm:w-42 sm:h-42 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.8)] border-2 border-white/20 group"
                  >
                    <img
                      src={currentTrack.coverImage}
                      alt={currentTrack.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[10px] font-space text-pink-200">
                        {currentTrack.album}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Track Metadata & Heart Button */}
                <div className="w-full mt-4 flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-fredoka text-lg sm:text-xl font-bold text-white truncate leading-tight">
                      {currentTrack.title}
                    </h3>
                    <p className="font-quicksand text-xs text-[#1DB954] font-semibold mt-0.5 truncate flex items-center gap-1.5">
                      <span>{currentTrack.artist}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-500" />
                      <span className="text-gray-400">{currentTrack.subtitle}</span>
                    </p>
                  </div>

                  <button
                    onClick={(e) => toggleLike(currentTrack.id, e)}
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer shrink-0"
                    title={likedTrackIds.has(currentTrack.id) ? 'Unlike Track' : 'Save to Your Liked Songs'}
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform active:scale-125 ${
                        likedTrackIds.has(currentTrack.id)
                          ? 'fill-[#1DB954] text-[#1DB954] scale-110 drop-shadow-[0_0_8px_rgba(29,185,84,0.6)]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Interactive Seekbar Scrubber */}
                <div className="w-full mt-4">
                  <div
                    ref={progressBarRef}
                    onClick={handleSeek}
                    className="w-full h-2 bg-white/10 hover:h-2.5 rounded-full overflow-hidden relative cursor-pointer group transition-all"
                  >
                    <div
                      style={{ width: `${progressPercent}%`, backgroundColor: currentTrack.themeColor }}
                      className="h-full rounded-full transition-all duration-100 relative"
                    >
                      {/* Scrub Handle Head */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="flex justify-between text-[11px] font-space text-gray-400 mt-1.5">
                    <span>{formatTime(currentTime)}</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>

                {/* Player Master Controls (Shuffle, Prev, Play, Next, Repeat) */}
                <div className="w-full mt-3 flex items-center justify-between px-2">
                  {/* 1. Shuffle Toggle */}
                  <button
                    onClick={toggleShuffle}
                    className={`relative p-2 rounded-full transition-all cursor-pointer ${
                      isShuffle ? 'text-[#1DB954]' : 'text-gray-400 hover:text-white'
                    }`}
                    title={isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
                  >
                    <Shuffle className="w-4 h-4" />
                    {isShuffle && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
                    )}
                  </button>

                  {/* 2. Previous Track */}
                  <button
                    onClick={handlePrevTrack}
                    className="p-2 text-gray-300 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    title="Previous Song"
                  >
                    <SkipBack className="w-5 h-5 fill-current" />
                  </button>

                  {/* 3. Central Play / Pause Button with Glow Wave */}
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-[0_0_30px_rgba(29,185,84,0.6)] cursor-pointer transition-colors"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    )}
                  </motion.button>

                  {/* 4. Next Track */}
                  <button
                    onClick={handleNextTrack}
                    className="p-2 text-gray-300 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    title="Next Song"
                  >
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>

                  {/* 5. Repeat Toggle: Off -> All -> One */}
                  <button
                    onClick={cycleRepeatMode}
                    className={`relative p-2 rounded-full transition-all cursor-pointer ${
                      repeatMode !== 'off' ? 'text-[#1DB954]' : 'text-gray-400 hover:text-white'
                    }`}
                    title={
                      repeatMode === 'off'
                        ? 'Enable Repeat All'
                        : repeatMode === 'all'
                        ? 'Enable Repeat One'
                        : 'Disable Repeat'
                    }
                  >
                    {repeatMode === 'one' ? (
                      <Repeat1 className="w-4 h-4" />
                    ) : (
                      <Repeat className="w-4 h-4" />
                    )}
                    {repeatMode !== 'off' && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
                    )}
                  </button>
                </div>

                {/* Secondary Bottom Controls: Volume & Mute */}
                <div className="w-full mt-4 pt-3 border-t border-white/5 flex items-center justify-between px-2 text-gray-400 text-xs font-space">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundEngine.playTap();
                        setIsMuted(!isMuted);
                      }}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-4 h-4 text-red-400" />
                      ) : volume < 0.5 ? (
                        <Volume1 className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setIsMuted(false);
                        setVolume(parseFloat(e.target.value));
                      }}
                      className="w-20 sm:w-24 h-1.5 accent-[#1DB954] bg-white/20 rounded-lg cursor-pointer"
                    />
                  </div>

                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Repeat: <span className="text-[#1DB954] font-bold">{repeatMode.toUpperCase()}</span>
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Playlist & Song Queue */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <ListMusic className="w-4 h-4 text-[#1DB954]" />
                      <h4 className="font-fredoka text-sm font-bold uppercase tracking-wider text-white">
                        Top Sacred Discography
                      </h4>
                    </div>
                    <span className="text-[11px] font-space text-gray-400">
                      {SPOTIFY_DISCOGRAPHY.length} Tracks
                    </span>
                  </div>

                  {/* Track List */}
                  <div className="space-y-1.5">
                    {SPOTIFY_DISCOGRAPHY.map((track, idx) => {
                      const isCurrent = currentTrackIndex === idx;
                      const isLiked = likedTrackIds.has(track.id);

                      return (
                        <motion.div
                          key={track.id}
                          whileHover={{ x: 3 }}
                          onClick={() => {
                            soundEngine.playTap();
                            setCurrentTrackIndex(idx);
                            setIsPlaying(true);
                          }}
                          className={`w-full p-2.5 sm:p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                            isCurrent
                              ? 'bg-white/10 border-[#1DB954]/50 shadow-md text-white'
                              : 'bg-white/5 hover:bg-white/10 border-transparent text-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            {/* Track Number / Playing Wave Indicator */}
                            <div className="w-6 text-center text-xs font-mono font-bold shrink-0">
                              {isCurrent && isPlaying ? (
                                <div className="flex items-end justify-center gap-0.5 h-3.5">
                                  <div className="w-0.5 h-full bg-[#1DB954] animate-pulse" />
                                  <div className="w-0.5 h-2 bg-[#1DB954] animate-bounce" />
                                  <div className="w-0.5 h-full bg-[#1DB954] animate-pulse" />
                                </div>
                              ) : (
                                <span className={isCurrent ? 'text-[#1DB954]' : 'text-gray-500'}>
                                  {idx + 1}
                                </span>
                              )}
                            </div>

                            {/* Thumbnail */}
                            <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                              <img
                                src={track.coverImage}
                                alt={track.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Title & Subtitle */}
                            <div className="min-w-0">
                              <p className={`font-fredoka text-xs sm:text-sm font-semibold truncate ${
                                isCurrent ? 'text-[#1ed760]' : 'text-white'
                              }`}>
                                {track.title}
                              </p>
                              <p className="text-[10px] font-quicksand text-gray-400 truncate">
                                {track.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0">
                            {/* Plays Count */}
                            <span className="hidden sm:inline text-[11px] font-space text-gray-500">
                              {track.plays} plays
                            </span>

                            {/* Heart Button */}
                            <button
                              onClick={(e) => toggleLike(track.id, e)}
                              className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  isLiked ? 'fill-[#1DB954] text-[#1DB954]' : ''
                                }`}
                              />
                            </button>

                            {/* Duration */}
                            <span className="text-xs font-space text-gray-400 w-9 text-right">
                              {track.duration}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Quick Feature Note */}
                <div className="mt-5 p-3 rounded-2xl bg-gradient-to-r from-[#1DB954]/10 via-white/5 to-[#1DB954]/10 border border-[#1DB954]/20 flex items-center justify-between text-xs font-quicksand">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎧</span>
                    <span className="text-gray-300">
                      Immerse in Shree's devotional vocals streamed directly in sacred audio fidelity.
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveTab('lyrics')}
                    className="font-fredoka text-[#1DB954] hover:underline shrink-0 text-xs font-bold"
                  >
                    View Lyrics ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 2: OFFICIAL SPOTIFY EMBED WITH AMBIENT STYLING */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'embed' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#181818] via-neutral-900 to-[#181818] border border-[#1DB954]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1DB954] flex items-center justify-center text-black font-bold shadow-md">
                    <Radio className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-fredoka text-sm font-bold text-white">
                      Official Spotify Artist Hub (Direct Stream)
                    </h4>
                    <p className="text-xs text-gray-400 font-quicksand">
                      Stream directly from Spotify’s servers with global discography, top charts & albums.
                    </p>
                  </div>
                </div>

                <a
                  href="https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-fredoka font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                >
                  <span>Follow Artist</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Enhanced Spotify Iframe Container */}
              <div className="w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 relative">
                <iframe
                  style={{ borderRadius: '16px' }}
                  src="https://open.spotify.com/embed/artist/3LjhIPXyU2IECCPJ0SZj8C?utm_source=generator&theme=0"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allowFullScreen={false}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Shree Naval Kishori Official Spotify Artist"
                />
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* TAB 3: DEVOTIONAL LYRICS & SACRED MEANINGS */}
          {/* ----------------------------------------------------------------------- */}
          {activeTab === 'lyrics' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-400/30 flex items-center justify-between">
                <div>
                  <h4 className="font-fredoka text-base font-bold text-white flex items-center gap-2">
                    <span>📜 Sacred Lyrics & Meanings</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-space font-semibold">
                      {currentTrack.title}
                    </span>
                  </h4>
                  <p className="text-xs text-gray-300 font-quicksand mt-0.5">
                    Devotional verses and their sacred English contemplation.
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playTap();
                    setActiveTab('player');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-fredoka font-semibold text-white transition-all"
                >
                  Back to Player 🎧
                </button>
              </div>

              {/* Verses Grid */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-2 no-scrollbar">
                {currentTrack.lyrics.map((verse, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-pink-300/40 transition-all space-y-2"
                  >
                    <div className="flex items-center gap-2 text-xs font-space text-[#FFD700]">
                      <span>VERSE {idx + 1}</span>
                      <span className="w-1 h-1 rounded-full bg-[#FFD700]" />
                      <span className="text-pink-300 font-fredoka">{currentTrack.title}</span>
                    </div>

                    <p className="font-serif text-base sm:text-lg text-white font-medium tracking-wide leading-relaxed">
                      {verse.sanskrit}
                    </p>

                    <p className="font-quicksand text-xs sm:text-sm text-gray-300 italic border-l-2 border-pink-400/60 pl-3">
                      "{verse.english}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. FOOTER STATUS BAR */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-5 sm:px-7 py-3 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between text-[11px] font-space text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#1DB954]">
              <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-ping" />
              <span>SPOTIFY CONNECTED</span>
            </span>
            <span>•</span>
            <span>HYPER-FIDELITY SYNTHESIS</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span>Spotify Artist ID:</span>
            <code className="text-[#1DB954] font-mono">3LjhIPXyU2IECCPJ0SZj8C</code>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
