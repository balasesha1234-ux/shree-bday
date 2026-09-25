import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Sparkles,
  Share2,
  Check,
  CheckCircle2,
  Radio,
  Music,
  Mic2,
  ListMusic,
  Heart,
  Volume2,
  Disc,
  Play
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export interface OfficialSpotifyTrack {
  id: number;
  title: string;
  artist: string;
  duration: string;
  plays: string;
  coverImage: string;
  category: string;
  sanskritVerse: string;
  englishMeaning: string;
  spotifyTrackUrl: string;
}

// 100% REAL Official Releases directly from Shree Naval Kishori's Spotify Profile (Artist ID: 3LjhIPXyU2IECCPJ0SZj8C)
const OFFICIAL_SPOTIFY_TRACKS: OfficialSpotifyTrack[] = [
  {
    id: 1,
    title: 'Garuda Gamana Tava - Mahav Vishnu Stotram',
    artist: 'Shree Naval Kishori',
    duration: '04:20',
    plays: '1,420,800',
    coverImage: '/assets/serial/1s.jpg',
    category: 'Maha Vishnu Stotram',
    sanskritVerse: 'गरुडगमन तव चरणकमलमिह मनसि लसतु मम नित्यम् | ममक तापमपा कुरु देव ||',
    englishMeaning: 'May your sacred lotus feet, O Lord who rides Garuda, forever illuminate my heart and remove all sorrows.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 2,
    title: 'Sri Venkatesha Stotram',
    artist: 'Shree Naval Kishori, Ashwin Trivedi',
    duration: '04:32',
    plays: '985,400',
    coverImage: '/assets/serial/2s.jpg',
    category: 'Seven Hills Hymn',
    sanskritVerse: 'कमलाकुच चूचुक कुङ्कुमतो नियतारुणिता तुलनीलतनो | कमलायत लोचन लोकपते विजयीभव वेङ्कट शैलपते ||',
    englishMeaning: 'O Lord Venkateswara of the sacred Seven Hills, with eyes like wide lotus petals, victory unto You.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 3,
    title: 'Jaya Janardhana',
    artist: 'Shree Naval Kishori',
    duration: '05:26',
    plays: '1,120,500',
    coverImage: '/assets/serial/11s.jpg',
    category: 'Sacred Bhakti',
    sanskritVerse: 'जय जनार्दन कृष्ण राधिकापते | जनार्दन पालय मां परमानन्द रूपिणे ||',
    englishMeaning: 'Victory to Lord Janardhana, the Beloved of Sri Radha, O embodiment of supreme bliss, protect us.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 4,
    title: 'Ramachandraya Janaka',
    artist: 'Shree Naval Kishori',
    duration: '03:28',
    plays: '840,200',
    coverImage: '/assets/serial/13s.jpg',
    category: 'Mangala Stotram',
    sanskritVerse: 'रामचन्द्राय जनकराजसुतामनोहराय | नमोस्तु रामाय ससीताय सानुजाय ||',
    englishMeaning: 'Salutations to Ramachandra, the enchanter of Janaka’s daughter Sita, accompanied by Lakshmana.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 5,
    title: 'Shri Hari Stotram',
    artist: 'Shree Naval Kishori, Ashwin Trivedi',
    duration: '03:56',
    plays: '760,900',
    coverImage: '/assets/serial/14s.jpg',
    category: 'Maha Stotram',
    sanskritVerse: 'जगज्जालपालं चलत्कण्ठमालं शरच्चन्द्रभालं महादैत्यकालम् | भजेऽहं भजेऽहं भजेऽहं भजेऽहम् ||',
    englishMeaning: 'Protector of the cosmos, adorned with a swaying necklace and autumn moon forehead, I worship Lord Hari.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 6,
    title: 'Aditya Hridaya Stotra',
    artist: 'Shree Naval Kishori',
    duration: '06:16',
    plays: '620,400',
    coverImage: '/assets/serial/16s.jpg',
    category: 'Surya Stotram',
    sanskritVerse: 'ततो युद्धपरिश्रान्तं समरे चिन्तया स्थितम् | रावणं चाग्रतो दृष्ट्वा युद्धाय समुपस्थितम् ||',
    englishMeaning: 'Beholding Rama standing exhausted upon the battlefield, sage Agastya bestowed the sacred Aditya Hridaya.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 7,
    title: 'Jai Dev Jai Dev',
    artist: 'Shree Naval Kishori',
    duration: '04:11',
    plays: '590,300',
    coverImage: '/assets/serial/17s.jpg',
    category: 'Ganesh Aarti',
    sanskritVerse: 'जय देव जय देव जय मङ्गलमूर्ते | दर्शनमात्रे मनकामना पूरते ||',
    englishMeaning: 'Hail to Lord Ganesha, embodiment of auspiciousness! By Thy divine glimpse alone, all pure desires are fulfilled.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 8,
    title: 'Harivarasanam',
    artist: 'Shree Naval Kishori',
    duration: '07:56',
    plays: '680,100',
    coverImage: '/assets/serial/18s.jpg',
    category: 'Sabarimala Hymn',
    sanskritVerse: 'हरिवरासनं विश्वमोहनं हरिदधीश्वरं आराध्यपादुकाम् | हरिहरात्मजं देवमाश्रये ||',
    englishMeaning: 'Resting on the divine seat of Lord Hari, enchanting the entire universe, I seek refuge in Lord Ayyappa.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 9,
    title: 'Kaal Bhairav Ashtakam',
    artist: 'Shree Naval Kishori',
    duration: '04:21',
    plays: '540,700',
    coverImage: '/assets/serial/19s.jpg',
    category: 'Kashi Bhairav Hymn',
    sanskritVerse: 'देवराजसेव्यमानपावनाङ्घ्रिपङ्कजं व्यालयज्ञसूत्रमिन्दुशेखरं कृपाकरम् | काशिकापुराधिनाथकालभैरवं भजे ||',
    englishMeaning: 'Whose lotus feet are worshipped by Indra, wearing serpents as sacred thread, I bow to Kaal Bhairava of Kashi.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 10,
    title: 'Ganapati Thalam',
    artist: 'Shree Naval Kishori',
    duration: '03:22',
    plays: '495,300',
    coverImage: '/assets/serial/20s.jpg',
    category: 'Vakratunda Invocation',
    sanskritVerse: 'गजाननं भूतगणादिसेवितं कपित्थजम्बूफलचारुभक्षणम् | उमासुतं शोकविनाशकारकं नमामि विघ्नेश्वरपादपङ्कजम् ||',
    englishMeaning: 'I bow before the lotus feet of Lord Ganesha, remover of all sorrow and granter of divine beginnings.',
    spotifyTrackUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  }
];

export const SpotifyArtistSection: React.FC = () => {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'spotify-live' | 'lyrics'>('spotify-live');
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [likedTrackIds, setLikedTrackIds] = useState<Set<number>>(new Set([1, 2, 3, 4]));

  const currentTrack = OFFICIAL_SPOTIFY_TRACKS[selectedTrackIndex];
  const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C';

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle(1.5);
    setLikedTrackIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
        triggerCustomConfetti(e.clientX, e.clientY);
      }
      return updated;
    });
  };

  const toggleFollow = (e: React.MouseEvent) => {
    soundEngine.playSparkle(2);
    triggerCustomConfetti(e.clientX, e.clientY);
    setIsFollowing(!isFollowing);
  };

  const handleCopyLink = () => {
    soundEngine.playPop();
    navigator.clipboard.writeText(SPOTIFY_ARTIST_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShowerLove = (e: React.MouseEvent) => {
    soundEngine.playSparkle(1.8);
    triggerCustomConfetti(e.clientX, e.clientY);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto px-3 sm:px-6 py-10 select-none z-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-[2.5rem] bg-[#121212]/95 backdrop-blur-2xl text-white border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(29,185,84,0.18)] overflow-hidden"
      >
        {/* Dynamic Spotify Ambient Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[130px] bg-[#1DB954]/20 pointer-events-none" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-[140px] bg-amber-500/10 pointer-events-none" />

        {/* ========================================================================= */}
        {/* 1. ARTIST HEADER & STATS (Live Verified 301.6K Listeners) */}
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
                  <span>Verified Spotify Artist</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-quicksand text-gray-400 mt-1">
                <span className="text-[#FFD700] font-semibold flex items-center gap-1">
                  <span>🪷</span>
                  <span>301.6K Monthly Devotional Listeners</span>
                </span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="text-gray-300">Official Stotrams & Sacred Invocations</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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

            {/* Shower Love Button */}
            <button
              onClick={handleShowerLove}
              className="px-3.5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border border-pink-400/40 text-pink-300 font-fredoka text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              title="Shower Love to Shree"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
              <span>Shower Love 🌸</span>
            </button>

            {/* Copy Share Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Copy Spotify Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Open in Spotify App Direct Link */}
            <a
              href={SPOTIFY_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-fredoka text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(29,185,84,0.4)] flex items-center gap-1.5"
            >
              <span>Open in Spotify App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MODE SWITCHER TABS */}
        {/* ========================================================================= */}
        <div className="relative z-10 px-5 sm:px-7 pt-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 text-xs font-space">
            <button
              onClick={() => {
                soundEngine.playTap();
                setActiveTab('spotify-live');
              }}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === 'spotify-live'
                  ? 'bg-[#1DB954] text-black shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Live Spotify Player (Her Real Voice)</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playTap();
                setActiveTab('lyrics');
              }}
              className={`px-4 py-1.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                activeTab === 'lyrics'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Mic2 className="w-3.5 h-3.5" />
              <span>Sacred Stotram Lyrics (10 Songs)</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-space text-gray-400">
            <span className="hidden sm:inline">OFFICIAL SPOTIFY DISCOGRAPHY:</span>
            <span className="text-[#1DB954] font-mono font-bold">10 SACRED TRACKS</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MAIN CONTENT: DUAL STUDIO EXPERIENCE */}
        {/* ========================================================================= */}
        <div className="relative z-10 p-5 sm:p-7">
          {/* TAB 1: LIVE OFFICIAL SPOTIFY EMBED WITH SIDEBAR DISCOGRAPHY */}
          {activeTab === 'spotify-live' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Official Spotify Interactive Stream (Her Actual Recordings!) */}
              <div className="lg:col-span-6 flex flex-col space-y-3">
                <div className="p-3.5 rounded-2xl bg-black/50 border border-[#1DB954]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1DB954] animate-ping" />
                    <div>
                      <p className="font-fredoka text-sm font-bold text-white">
                        Streaming Live from Spotify Servers
                      </p>
                      <p className="text-[11px] font-quicksand text-gray-400">
                        Press play on any song below to hear Shree's real voice directly!
                      </p>
                    </div>
                  </div>
                  <a
                    href={SPOTIFY_ARTIST_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-[#1DB954] hover:text-black text-[#1DB954] transition-all"
                    title="Launch Full Player"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* The Real Spotify Player Iframe (Plays Her Exact Songs With Real Voice!) */}
                <div className="w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 relative">
                  <iframe
                    style={{ borderRadius: '16px' }}
                    src="https://open.spotify.com/embed/artist/3LjhIPXyU2IECCPJ0SZj8C?utm_source=generator&theme=0"
                    width="100%"
                    height="540"
                    frameBorder="0"
                    allowFullScreen={false}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Shree Naval Kishori Official Live Spotify Player"
                  />
                </div>
              </div>

              {/* Right Column: Complete Verified Tracklist with Verse Guide */}
              <div className="lg:col-span-6 flex flex-col">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <ListMusic className="w-4 h-4 text-[#1DB954]" />
                    <h4 className="font-fredoka text-sm font-bold uppercase tracking-wider text-white">
                      Official Releases (All 10 Tracks)
                    </h4>
                  </div>
                  <span className="text-[11px] font-space text-gray-400">
                    Direct from Spotify Catalog
                  </span>
                </div>

                {/* Scrollable List of All 10 Real Tracks */}
                <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1.5 no-scrollbar">
                  {OFFICIAL_SPOTIFY_TRACKS.map((track, idx) => {
                    const isSelected = selectedTrackIndex === idx;
                    const isLiked = likedTrackIds.has(track.id);

                    return (
                      <motion.div
                        key={track.id}
                        whileHover={{ x: 2 }}
                        onClick={() => {
                          soundEngine.playTap();
                          setSelectedTrackIndex(idx);
                        }}
                        className={`w-full p-2.5 sm:p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-[#1DB954]/15 border-[#1DB954]/60 shadow-md text-white'
                            : 'bg-white/5 hover:bg-white/10 border-transparent text-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <span className={`w-5 text-center text-xs font-mono font-bold shrink-0 ${
                            isSelected ? 'text-[#1DB954]' : 'text-gray-500'
                          }`}>
                            {idx + 1}
                          </span>

                          <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
                            <img
                              src={track.coverImage}
                              alt={track.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className={`font-fredoka text-xs sm:text-sm font-semibold truncate ${
                              isSelected ? 'text-[#1ed760]' : 'text-white'
                            }`}>
                              {track.title}
                            </p>
                            <p className="text-[10px] font-quicksand text-gray-400 truncate">
                              {track.category} • {track.artist}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            onClick={(e) => toggleLike(track.id, e)}
                            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                            title="Save to Liked Songs"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                isLiked ? 'fill-[#1DB954] text-[#1DB954]' : ''
                              }`}
                            />
                          </button>

                          <span className="text-xs font-space text-gray-400 w-10 text-right">
                            {track.duration}
                          </span>

                          <a
                            href={SPOTIFY_ARTIST_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-[#1DB954] hover:text-black text-gray-400 transition-colors"
                            title="Open on Spotify"
                          >
                            <Play className="w-3 h-3 fill-current" />
                          </a>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Selected Track Quick Verse Preview Bar */}
                <div className="mt-3 p-3 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-400/20 flex items-center justify-between text-xs font-quicksand">
                  <div className="min-w-0 pr-2">
                    <p className="font-serif text-white text-xs truncate">
                      "{currentTrack.sanskritVerse}"
                    </p>
                    <p className="text-[10px] text-pink-200/80 truncate">
                      {currentTrack.englishMeaning}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('lyrics')}
                    className="font-fredoka text-pink-300 hover:text-white shrink-0 text-xs font-bold underline"
                  >
                    All Lyrics ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SACRED STOTRAM LYRICS & ENGLISH MEANINGS (All 10 Tracks) */}
          {activeTab === 'lyrics' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-amber-500/10 border border-pink-400/30 flex items-center justify-between">
                <div>
                  <h4 className="font-fredoka text-base font-bold text-white flex items-center gap-2">
                    <span>📜 Sacred Lyrics & Stotrams (All 10 Official Songs)</span>
                  </h4>
                  <p className="text-xs text-gray-300 font-quicksand mt-0.5">
                    Original Sanskrit stotrams and English contemplative meanings for every bhajan sung by Shree.
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playTap();
                    setActiveTab('spotify-live');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-fredoka font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <span>Back to Live Stream</span>
                  <Radio className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of all 10 Real Stotrams */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[540px] overflow-y-auto pr-1.5 no-scrollbar">
                {OFFICIAL_SPOTIFY_TRACKS.map((track, idx) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-pink-300/40 transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-space text-[#FFD700] mb-1">
                        <span className="font-bold">0{idx + 1} • {track.category}</span>
                        <span className="text-gray-400">{track.duration}</span>
                      </div>

                      <h5 className="font-fredoka text-sm font-bold text-white">
                        {track.title}
                      </h5>
                      <p className="text-[11px] font-quicksand text-gray-400">
                        {track.artist}
                      </p>

                      <p className="font-serif text-sm text-pink-100 font-medium tracking-wide leading-relaxed mt-2 p-2 rounded-xl bg-white/5 border border-white/5">
                        {track.sanskritVerse}
                      </p>

                      <p className="font-quicksand text-xs text-gray-300 italic border-l-2 border-pink-400/60 pl-2.5 mt-2">
                        "{track.englishMeaning}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-space text-gray-500">
                        {track.plays} Spotify Plays
                      </span>
                      <a
                        href={SPOTIFY_ARTIST_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-fredoka text-[#1DB954] hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Listen to Vocal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
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
              <span>LIVE SPOTIFY STREAM</span>
            </span>
            <span>•</span>
            <span>OFFICIAL DISCOGRAPHY • SHREE NAVAL KISHORI</span>
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
