import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from './Confetti';
import { LeaderboardEntry, INITIAL_LEADERBOARD, getArcadeLeaderboard, submitArcadeScore, supabase } from '../../utils/supabaseClient';

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
  points: number;
  size: number;
  type: string;
}

export const BirthdayMiniGame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'game' | 'leaderboard'>('game');
  const [gameState, setGameState] = useState<'register' | 'playing' | 'gameover'>('register');
  
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem('shree_arcade_player_name') || '';
  });
  const [playerAvatar, setPlayerAvatar] = useState<string>('🐱');
  const [playerCity, setPlayerCity] = useState<string>('');

  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [combo, setCombo] = useState(1);

  // Anti-Cheat & Live Supabase sync
  useEffect(() => {
    getArcadeLeaderboard().then((data) => {
      if (data && data.length > 0) setLeaderboard(data);
    });

    if (supabase) {
      const channel = supabase
        .channel('public:arcade_leaderboard')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'arcade_leaderboard' },
          (payload) => {
            const newEntry = payload.new as LeaderboardEntry;
            setLeaderboard((prev) => [newEntry, ...prev.filter(e => e.id !== newEntry.id)].sort((a, b) => b.score - a.score).slice(0, 20));
          }
        )
        .subscribe();

      return () => {
        if (supabase) supabase.removeChannel(channel);
      };
    }
  }, []);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() => {
    const saved = localStorage.getItem('shree_arcade_leaderboard');
    return saved ? JSON.parse(saved) : INITIAL_LEADERBOARD;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const basketXRef = useRef<number>(250);
  const itemsRef = useRef<FallingItem[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const isPlayingRef = useRef<boolean>(false);

  const avatars = ['🐱', '🌸', '🪷', '💖', '👑', '🐾', '✨', '🎂'];

  const getRankInfo = (s: number) => {
    if (s >= 5000) return { rank: 'SSS 👑', title: 'Eternal Devotion Champion', desc: 'You captured all the stardust in the cosmos for Shree!' };
    if (s >= 3000) return { rank: 'SS 🪷', title: 'Master of Joy & Kindness', desc: 'A stunning performance full of grace and rhythm!' };
    if (s >= 1500) return { rank: 'S 🌸', title: 'Sweetheart Birthday Hero', desc: 'Incredible reflexes and festive high energy!' };
    return { rank: 'A 🐱', title: 'Cherished Friend', desc: 'Lovely catches! Try again to climb the leaderboard!' };
  };

  const handleStartPlaying = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    localStorage.setItem('shree_arcade_player_name', playerName.trim());
    soundEngine.playSparkle(1.5);
    setScore(0);
    setCombo(1);
    setTimeLeft(30);
    itemsRef.current = [];
    isPlayingRef.current = true;
    lastSpawnTimeRef.current = performance.now();

    const canvas = canvasRef.current;
    const w = canvas ? canvas.width : 500;
    itemsRef.current.push(
      { id: 1, x: w * 0.25, y: -20, speed: 3.5, emoji: '🎂', points: 100, size: 36, type: 'cake' },
      { id: 2, x: w * 0.5, y: -60, speed: 3.8, emoji: '🪷', points: 150, size: 36, type: 'lotus' },
      { id: 3, x: w * 0.75, y: -100, speed: 3.2, emoji: '🐱', points: 120, size: 36, type: 'cat' }
    );

    setGameState('playing');
  };

  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          isPlayingRef.current = false;
          setGameState('gameover');
          soundEngine.playTempleBell();
          triggerCustomConfetti();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'gameover' && score > 0) {
      // Anti-Cheat: Max theoretical score in 30 seconds is ~15,000. Cap unrealistic memory-injected scores.
      const validScore = Math.min(20000, Math.max(0, Math.floor(score)));
      const cleanPlayerName = (playerName.trim() || 'Anonymous Friend').slice(0, 30);
      const cleanCity = playerCity.trim() ? playerCity.trim().slice(0, 30) : undefined;
      const rankData = getRankInfo(score);
      const newEntry: LeaderboardEntry = {
        id: String(Date.now()),
        name: cleanPlayerName,
        score: validScore,
        rank: rankData.rank,
        avatar: playerAvatar,
        city: cleanCity,
        created_at: new Date().toISOString()
      };

      submitArcadeScore(newEntry).then((saved) => {
        setLeaderboard((prev) => [saved, ...prev.filter(e => e.id !== saved.id)].sort((a, b) => b.score - a.score).slice(0, 15));
      });
    }
  }, [gameState, score, playerName, playerAvatar, playerCity]);

  useEffect(() => {
    if (activeTab !== 'game') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (basketXRef.current === 250) {
        basketXRef.current = rect.width / 2;
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      const width = canvas.width;
      const height = canvas.height;

      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0E0D24');
      grad.addColorStop(0.5, '#1D1438');
      grad.addColorStop(1, '#2E1236');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 25; i++) {
        const sx = (i * 73) % width;
        const sy = (i * 41) % (height - 60);
        ctx.globalAlpha = 0.2 + (Math.sin(currentTime * 0.003 + i) + 1) * 0.2;
        ctx.fillRect(sx, sy, 2, 2);
      }
      ctx.globalAlpha = 1.0;

      if (isPlayingRef.current) {
        if (currentTime - lastSpawnTimeRef.current > 360) {
          lastSpawnTimeRef.current = currentTime;

          const itemPool = [
            { emoji: '🎂', points: 100, type: 'cake' },
            { emoji: '🪷', points: 150, type: 'lotus' },
            { emoji: '🐱', points: 120, type: 'cat' },
            { emoji: '💖', points: 80, type: 'heart' },
            { emoji: '🪔', points: 200, type: 'diya' },
            { emoji: '🎈', points: 90, type: 'balloon' }
          ];

          const picked = itemPool[Math.floor(Math.random() * itemPool.length)];

          itemsRef.current.push({
            id: currentTime + Math.random(),
            x: Math.random() * (width - 80) + 40,
            y: -30,
            speed: Math.random() * 2.2 + 3.2,
            emoji: picked.emoji,
            points: picked.points,
            size: 34,
            type: picked.type
          });
        }

        const basketX = basketXRef.current;
        const basketY = height - 55;
        const basketWidth = 95;
        const basketHeight = 40;

        for (let i = itemsRef.current.length - 1; i >= 0; i--) {
          const item = itemsRef.current[i];
          item.y += item.speed;

          ctx.save();
          ctx.font = '32px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.shadowColor = 'rgba(255, 217, 61, 0.6)';
          ctx.shadowBlur = 10;
          ctx.fillText(item.emoji, item.x, item.y);
          ctx.restore();

          if (
            item.y >= basketY - 20 &&
            item.y <= basketY + basketHeight &&
            item.x >= basketX - basketWidth / 2 &&
            item.x <= basketX + basketWidth / 2
          ) {
            soundEngine.playSparkle(1.2 + combo * 0.05);
            if (item.type === 'cat') soundEngine.playMeow();

            setScore((s) => s + item.points * combo);
            setCombo((c) => Math.min(8, c + 1));
            itemsRef.current.splice(i, 1);
            continue;
          }

          if (item.y > height + 40) {
            itemsRef.current.splice(i, 1);
            setCombo(1);
          }
        }

        ctx.save();
        ctx.translate(basketX, basketY);

        ctx.shadowColor = 'rgba(255, 77, 141, 0.8)';
        ctx.shadowBlur = 20;

        ctx.fillStyle = '#FF4D8D';
        ctx.beginPath();
        ctx.roundRect(-basketWidth / 2, 0, basketWidth, basketHeight, [0, 0, 18, 18]);
        ctx.fill();

        ctx.fillStyle = '#FFD93D';
        ctx.beginPath();
        ctx.roundRect(-basketWidth / 2 - 4, -4, basketWidth + 8, 8, 4);
        ctx.fill();

        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(playerAvatar, 0, 20);

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [combo, activeTab, playerAvatar]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    basketXRef.current = Math.max(50, Math.min(rect.width - 50, e.clientX - rect.left));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    basketXRef.current = Math.max(50, Math.min(rect.width - 50, touchX));
  };

  return (
    <section id="arcade-game" className="relative w-full max-w-5xl mx-auto px-4 py-20 select-none">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-2">
          <Trophy className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
          <span>SHREE’S BIRTHDAY ARCADE 🎮</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Stardust Catch & Leaderboard
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Compete with fans and friends to catch birthday stars and rank on the live hall of fame!
        </p>

        <div className="mt-6 inline-flex items-center gap-2 p-1.5 rounded-full bg-white shadow-sm border border-pink-200">
          <button
            onClick={() => setActiveTab('game')}
            className={'flex items-center gap-2 px-6 py-2 rounded-full text-xs font-fredoka font-bold transition-all ' + (activeTab === 'game' ? 'bg-[#FF4D8D] text-white shadow-pop' : 'text-gray-600 hover:text-gray-900')}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Play Arcade</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={'flex items-center gap-2 px-6 py-2 rounded-full text-xs font-fredoka font-bold transition-all ' + (activeTab === 'leaderboard' ? 'bg-[#D4A84B] text-[#3D2040] shadow-sm' : 'text-gray-600 hover:text-gray-900')}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Top Leaderboard ({leaderboard.length})</span>
          </button>
        </div>
      </div>

      {activeTab === 'game' && (
        <div className="relative max-w-2xl mx-auto rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-[#181530] via-[#241A42] to-[#121024] shadow-2xl border-4 border-[#FF4D8D]/40">
          <div className="flex items-center justify-between px-4 py-2.5 mb-3 bg-black/50 rounded-2xl border border-white/10 text-xs font-space font-bold text-white">
            <div className="flex items-center gap-2">
              <span className="text-[#FFD93D]">SCORE:</span>
              <span className="text-xl text-white font-space tracking-wider">{score.toLocaleString()}</span>
              {combo > 1 && (
                <span className="px-2 py-0.5 rounded-full bg-[#FF4D8D] text-white text-[10px] animate-bounce">
                  {combo}x COMBO! 🔥
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-pink-300">TIME:</span>
              <span className={'text-xl font-space tracking-wider ' + (timeLeft <= 5 ? 'text-red-400 animate-ping' : 'text-emerald-400')}>
                {timeLeft}s
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#FFD93D]">
              <span>{playerAvatar}</span>
              <span className="font-fredoka max-w-[80px] truncate">{playerName || 'Player'}</span>
            </div>
          </div>

          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="w-full h-full cursor-none touch-none"
            />

            {gameState === 'register' && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/85 backdrop-blur-md text-center text-white">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-sm w-full"
                >
                  <span className="text-5xl block mb-2 animate-bounce">🐱🎂🪷</span>
                  <h3 className="text-2xl font-fredoka font-bold text-gradient-pink">
                    Enter the Arcade
                  </h3>
                  <p className="text-xs font-quicksand text-gray-300 mb-4">
                    Register your name to record your high score on Shree’s Leaderboard!
                  </p>

                  <form onSubmit={handleStartPlaying} className="space-y-3 font-quicksand text-left">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">Your Name / Handle *</label>
                      <input
                        type="text"
                        required
                        maxLength={25}
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="e.g. Ananya V."
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-pink-400/40 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4D8D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">Your City (Optional)</label>
                      <input
                        type="text"
                        maxLength={25}
                        value={playerCity}
                        onChange={(e) => setPlayerCity(e.target.value)}
                        placeholder="e.g. Mumbai, Delhi"
                        className="w-full px-4 py-2 rounded-xl bg-white/10 border border-pink-400/40 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4D8D]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-300 mb-1">Pick Your Lucky Avatar</label>
                      <div className="flex items-center justify-between gap-1">
                        {avatars.map((av) => (
                          <button
                            key={av}
                            type="button"
                            onClick={() => setPlayerAvatar(av)}
                            className={'w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ' + (playerAvatar === av ? 'bg-[#FF4D8D] text-white scale-110 shadow-pop' : 'bg-white/10 hover:bg-white/20')}
                          >
                            {av}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-base shadow-pop hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <span>Start Playing (30s) 🚀</span>
                    </button>
                  </form>
                </motion.div>
              </div>
            )}

            {gameState === 'gameover' && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-black/85 backdrop-blur-md text-center text-white">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="max-w-sm w-full bg-white/10 p-6 rounded-3xl border border-pink-400/40 shadow-2xl backdrop-blur-lg"
                >
                  <span className="text-5xl block mb-2">🏆</span>
                  <span className="text-[10px] font-space font-bold px-3 py-1 rounded-full bg-[#FFD93D] text-[#3D2040] uppercase">
                    RANK: {getRankInfo(score).rank}
                  </span>

                  <h4 className="text-2xl font-fredoka font-bold text-white mt-2">
                    {getRankInfo(score).title}
                  </h4>
                  <p className="text-xs font-quicksand text-pink-200 mt-1">
                    {getRankInfo(score).desc}
                  </p>

                  <div className="my-4 py-3 border-y border-white/10 flex items-center justify-around font-space">
                    <div>
                      <span className="text-[10px] text-gray-400 block">YOUR SCORE</span>
                      <span className="text-xl font-bold text-[#FF4D8D]">{score.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">RECORDED AS</span>
                      <span className="text-base font-bold text-[#FFD93D]">{playerName}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={handleStartPlaying}
                        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-xs shadow-pop transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Play Again 🎮</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('leaderboard')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-[#D4A84B] hover:bg-[#B88F35] text-[#3D2040] font-fredoka font-bold text-xs shadow-md transition-all"
                      >
                        <Trophy className="w-3.5 h-3.5" />
                        <span>View Ranks 🏆</span>
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        const wishWall = document.getElementById('wish-wall');
                        if (wishWall) wishWall.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-pink-300/40 text-pink-200 hover:text-white font-fredoka font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
                      <span>Turn Your Stars into a Birthday Wish 🌸</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-pop border border-pink-100">
          <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-6">
            <div>
              <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center gap-2">
                <span>Arcade Hall of Fame 🏆</span>
              </h3>
              <p className="text-xs font-quicksand text-gray-500 mt-0.5">
                Top players who collected the most birthday stardust for Shree!
              </p>
            </div>

            <button
              onClick={() => {
                setGameState('register');
                setActiveTab('game');
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white text-xs font-fredoka font-bold shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Play & Rank</span>
            </button>
          </div>

          <div className="space-y-3">
            {leaderboard.map((player, idx) => {
              const isFirst = idx === 0;
              const isSecond = idx === 1;
              const isThird = idx === 2;

              return (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={'flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all ' + (isFirst ? 'bg-gradient-to-r from-amber-50 to-amber-100/60 border-[#D4A84B] shadow-sm' : isSecond ? 'bg-gray-50 border-gray-300' : isThird ? 'bg-amber-50/40 border-amber-200' : 'bg-white hover:bg-pink-50/40 border-pink-100')}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-7 text-center font-space font-bold text-sm">
                      {isFirst ? '🥇' : isSecond ? '🥈' : isThird ? '🥉' : '#' + (idx + 1)}
                    </div>

                    <span className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl border border-pink-100">
                      {player.avatar}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-fredoka font-bold text-gray-800 text-sm sm:text-base">
                          {player.name}
                        </h4>
                        <span className="text-[10px] font-space px-1.5 py-0.5 rounded bg-pink-100 text-[#FF4D8D] font-bold">
                          {player.rank}
                        </span>
                      </div>
                      {player.city && (
                        <span className="text-[11px] font-quicksand text-gray-400">
                          from {player.city}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-space font-bold text-base sm:text-lg text-[#FF4D8D] block">
                      {player.score.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-space text-gray-400">POINTS</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
