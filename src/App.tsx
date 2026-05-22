import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

import bg from "./ANHBACKOUND.jpg";
import frame from "./khung.jpg";
import weddingMusic from "./weddingMusic.mp3";

// =========================================================
// SAKURA PETALS COMPONENT — Hoa anh đào rơi
// =========================================================
const PETAL_COUNT = 18;
const PETAL_COLORS = [
  "#FFB7C5",
  "#FFC0CB",
  "#FFD1DC",
  "#FFAEC0",
  "#FF91A4",
  "#FDE8F0",
];

function SakuraPetals() {
  const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
    size: 8 + Math.random() * 14,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    swingAmp: 40 + Math.random() * 60,
    rotateStart: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-40px",
            width: p.size,
            height: p.size * 0.9,
            backgroundColor: p.color,
            borderRadius: "50% 10% 50% 10%",
            opacity: 0.75,
            filter: "blur(0.3px)",
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.swingAmp, -p.swingAmp / 2, p.swingAmp / 3, 0],
            rotate: [p.rotateStart, p.rotateStart + 360 * 2],
            opacity: [0, 0.8, 0.75, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            x: {
              duration: p.duration,
              ease: "easeInOut",
              times: [0, 0.25, 0.5, 0.75, 1],
            },
          }}
        />
      ))}
    </div>
  );
}

// =========================================================
// SPARKLE PARTICLES — Hạt lấp lánh
// =========================================================
function SparkleParticles() {
  const sparks = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: 10 + Math.random() * 80,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 8,
    duration: 3 + Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            backgroundColor: "#fff",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

// =========================================================
// HEART CONFETTI — Tim bay khi submit RSVP
// =========================================================
function HeartConfetti({ active }) {
  const hearts = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: 10 + Math.random() * 80,
    delay: Math.random() * 1.5,
    size: 14 + Math.random() * 18,
  }));

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              style={{
                position: "absolute",
                left: `${h.left}%`,
                bottom: "10%",
                fontSize: h.size,
              }}
              initial={{ y: 0, opacity: 1, rotate: 0 }}
              animate={{
                y: -(400 + Math.random() * 400),
                opacity: [1, 1, 0],
                rotate: [-20, 20, -10, 15],
                x: [(Math.random() - 0.5) * 120],
              }}
              transition={{
                duration: 2.5 + Math.random(),
                delay: h.delay,
                ease: "easeOut",
              }}
            >
              💕
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

// =========================================================
// CURSOR TRAIL — Vệt sáng theo chuột (desktop)
// =========================================================
function CursorTrail() {
  const [trail, setTrail] = useState([]);
  const counter = useRef(0);

  useEffect(() => {
    const handler = (e) => {
      counter.current += 1;
      const id = counter.current;
      setTrail((prev) => [
        ...prev.slice(-12),
        { id, x: e.clientX, y: e.clientY },
      ]);
      setTimeout(() => {
        setTrail((prev) => prev.filter((p) => p.id !== id));
      }, 600);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      {trail.map((dot, idx) => (
        <motion.div
          key={dot.id}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: dot.x - 6,
            top: dot.y - 6,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: `rgba(255, 182, 193, ${0.5 - idx * 0.03})`,
            pointerEvents: "none",
          }}
        />
      ))}
    </div>
  );
}

// =========================================================
// SHIMMER CARD WRAPPER
// =========================================================
function ShimmerCard({ children, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 3,
        }}
      />
      {children}
    </div>
  );
}

// =========================================================
// FLOATING ROSES BACKGROUND SVG
// =========================================================
function FloatingRoses() {
  const roses = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: 5 + i * 16,
    y: 15 + (i % 3) * 30,
    delay: i * 1.5,
    scale: 0.6 + Math.random() * 0.6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden opacity-10">
      {roses.map((r) => (
        <motion.div
          key={r.id}
          style={{
            position: "absolute",
            left: `${r.x}%`,
            top: `${r.y}%`,
            fontSize: 32 * r.scale,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [-8, 8, -8],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5 + r.delay,
            delay: r.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

// =========================================================
// RIPPLE BUTTON — Gợn sóng khi click
// =========================================================
function RippleButton({ onClick, children, className = "" }) {
  const [ripples, setRipples] = useState([]);
  const ref = useRef(null);

  const handleClick = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const id = Date.now();
    setRipples((prev) => [
      ...prev,
      { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== id)),
      700
    );
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: r.x - 10,
            top: r.y - 10,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)",
            pointerEvents: "none",
          }}
        />
      ))}
      {children}
    </button>
  );
}

// =========================================================
// MAIN APP
// =========================================================
export default function App() {
  const [tab, setTab] = useState("home");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [rsvpData, setRsvpData] = useState({
    name: "",
    side: "bride",
    guests: "1",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const playlist = [
    weddingMusic,
    "https://docs.google.com/uc?export=download&id=ID_BAI_NHAC_1",
    "https://docs.google.com/uc?export=download&id=ID_BAI_NHAC_2",
  ];

  const weddingPhotos = [
    "https://i.ibb.co/yBGfDkdZ/khung.jpg",
    "https://i.ibb.co/hFK0Y64v/LA4A9176.jpg",
    "https://i.ibb.co/chvsqLC2/LA4A9002.jpg",
    "https://i.ibb.co/6R0b26YK/LA4A8953.jpg",
    "https://i.ibb.co/yBGfDkdZ/khung.jpg",
    "https://i.ibb.co/5gN3g3dg/LA4A8861.jpg",
    "https://i.ibb.co/x8H0RCdd/LA4-A8722-1.jpg",
    "https://i.ibb.co/MkrXxFkq/LA4A7775.jpg",
    "https://i.ibb.co/RG8R4CCH/LA4A7888.jpg",
    "https://i.ibb.co/dw9zQYQZ/anh-cuoi-full-quality.jpg",
  ];

  // --- Audio ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
      document.removeEventListener("click", handleFirstInteraction);
    };
    document.addEventListener("click", handleFirstInteraction);
    return () => document.removeEventListener("click", handleFirstInteraction);
  }, [isPlaying]);

  const handleTrackEnded = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setTimeout(() => {
      if (audioRef.current)
        audioRef.current.play().then(() => setIsPlaying(true));
    }, 200);
  };

  const togglePlayMusic = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // --- Countdown ---
  useEffect(() => {
    const target = new Date("2026-06-04T08:30:00").getTime();
    const interval = setInterval(() => {
      const diff = target - Date.now();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Navigation ---
  const sectionRefs = {
    home: useRef(null),
    story: useRef(null),
    gallery: useRef(null),
    info: useRef(null),
    rsvp: useRef(null),
  };

  const handleTabChange = (t) => {
    setTab(t);
    sectionRefs[t]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // --- RSVP Submit ---
  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpData.name.trim()) return alert("Vui lòng nhập tên của bạn ạ! ❤️");
    const emailTo = "hoangvo027@gmail.com";
    const subject = encodeURIComponent(
      `[RSVP Đám Cưới] Khách mời: ${rsvpData.name}`
    );
    const body = encodeURIComponent(
      `Họ tên: ${rsvpData.name}\n` +
        `Khách bên: ${rsvpData.side === "bride" ? "Nhà Gái" : "Nhà Trai"}\n` +
        `Số lượng tham dự: ${rsvpData.guests} người\n` +
        `Lời chúc: ${rsvpData.message}`
    );
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white font-sans selection:bg-pink-400 selection:text-white overflow-x-hidden scroll-smooth pb-24"
      style={{ backgroundImage: `url(${bg})`, backgroundAttachment: "fixed" }}
    >
      <audio
        ref={audioRef}
        src={playlist[currentTrackIndex]}
        onEnded={handleTrackEnded}
        preload="auto"
      />

      {/* Lớp nền */}
      <div className="fixed inset-0 bg-neutral-900/45 backdrop-blur-[2px] pointer-events-none z-0" />

      {/* Hiệu ứng nền */}
      <FloatingRoses />
      <SparkleParticles />
      <SakuraPetals />
      <CursorTrail />
      <HeartConfetti active={showConfetti} />

      {/* Nút nhạc */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 drop-shadow-md">
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] md:text-xs bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-pink-200 font-medium tracking-wide"
        >
          {isPlaying ? "🎵 Đang phát nhạc đám cưới..." : "🔇 Nhạc đang tắt"}
        </motion.span>
        <motion.button
          onClick={togglePlayMusic}
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={
            isPlaying
              ? { repeat: Infinity, duration: 5, ease: "linear" }
              : { duration: 0.5 }
          }
          className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/95 text-neutral-800 shadow-xl flex items-center justify-center border-2 border-pink-400 cursor-pointer text-xl select-none relative z-50"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? "💿" : "🎵"}
        </motion.button>
      </div>

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section
          ref={sectionRefs.home}
          className="h-screen flex flex-col items-center justify-center relative px-4"
        >
          {/* Vòng hào quang xoay sau frame */}
          <motion.div
            className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full z-5 pointer-events-none"
            style={{
              background:
                "conic-gradient(from 0deg, #ffb7c5, #ff91a4, #ffd1dc, #ffb7c5)",
              filter: "blur(40px)",
              opacity: 0.25,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />

          <motion.img
            src={frame}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute h-[65%] md:h-[75%] object-contain z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] pointer-events-none"
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="relative z-20 text-center tracking-wide"
          >
            <motion.span
              className="text-xs uppercase tracking-[0.3em] text-pink-200 block mb-3 font-semibold"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Save The Date
            </motion.span>

            <h1 className="text-4xl md:text-6xl font-serif mb-6 drop-shadow-md px-4">
              Hoàng{" "}
              <motion.span
                className="text-pink-300 font-sans"
                animate={{ scale: [1, 1.2, 1], rotate: [-5, 5, -5] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ display: "inline-block" }}
              >
                &
              </motion.span>{" "}
              Thảo
            </h1>

            <p className="text-sm md:text-base text-white/90 italic max-w-xs mx-auto mb-8 border-y border-white/20 py-2">
              Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi
            </p>

            {/* Countdown VIP */}
            <div className="flex gap-2 justify-center text-neutral-900 select-none">
              {[
                { label: "Ngày", val: timeLeft.days },
                { label: "Giờ", val: timeLeft.hours },
                { label: "Phút", val: timeLeft.minutes },
                { label: "Giây", val: timeLeft.seconds },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="bg-white/95 backdrop-blur rounded-xl px-3 py-2 min-w-[60px] md:min-w-[65px] shadow-lg border border-pink-200/30"
                >
                  <motion.div
                    key={item.val}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-xl md:text-2xl font-bold text-pink-600 font-mono leading-none"
                  >
                    {String(item.val).padStart(2, "0")}
                  </motion.div>
                  <div className="text-[9px] uppercase tracking-wider text-neutral-500 mt-1 font-medium">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-8 flex flex-col items-center gap-1 text-white/40 text-xs"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-[1px] h-6 bg-white/20 mx-auto" />
              <span>Cuộn xuống</span>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== OUR STORY ===== */}
        <section
          ref={sectionRefs.story}
          className="py-24 px-4 max-w-4xl mx-auto space-y-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-center max-w-2xl mx-auto"
          >
            <motion.div
              className="text-pink-300 text-3xl mb-3"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <h2 className="text-3xl font-serif mb-6 tracking-wide text-pink-200">
              Our Story
            </h2>
            <div className="w-12 h-[1px] bg-white/30 mx-auto mb-6" />
            <ShimmerCard className="bg-black/20 p-6 rounded-2xl border border-white/5 shadow-xl">
              <p className="leading-relaxed text-white/90 text-sm md:text-base px-2">
                "Chúng ta đã cùng nhau đi qua nhiều thăng trầm để nhận ra rằng
                được ở bên nhau là điều quý giá nhất. Hôm nay, trước sự chứng
                kiến của mọi người từ khoảnh khắc này chúng ta sẽ nhẹ nhàng gọi
                nhau bằng hai tiếng Vợ - Chồng."
              </p>
            </ShimmerCard>
          </motion.div>

          {/* Thông tin hai họ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {[
              {
                side: "Nhà Gái",
                photo: "https://i.ibb.co/JRJKJ0cF/thao.jpg",
                alt: "Cô dâu Nguyễn Thị Thảo",
                father: "Nguyễn Văn Lợi",
                mother: "Lê Thị Thanh",
                address: "Trung Thanh, Phong Dinh, TP.Huế",
                rank: "Trưởng nữ",
                name: "Nguyễn Thị Thảo",
                delay: 0,
              },
              {
                side: "Nhà Nam",
                photo: "https://i.ibb.co/tpQ9WjrM/hoang.jpg",
                alt: "Chú rể Võ Văn Hoàng",
                father: "Võ Văn Tính",
                mother: "Trần Thị Hoa",
                address: "120 Tân Lập, Kado, Lâm Đồng",
                rank: "Thứ nam",
                name: "Võ Văn Hoàng",
                delay: 0.2,
              },
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: person.delay }}
                whileHover={{ y: -6, scale: 1.01 }}
              >
                <ShimmerCard className="bg-black/30 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-2xl h-full">
                  <div className="w-32 h-44 shrink-0 rounded-xl overflow-hidden border-2 border-pink-300/50 shadow-md">
                    <img
                      src={person.photo}
                      alt={person.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <span className="text-xs font-semibold tracking-widest text-pink-300 uppercase block">
                      ーー {person.side} ーー
                    </span>
                    <div className="text-sm text-white/80 space-y-0.5 font-medium">
                      <p>
                        <b>Ông:</b> {person.father}
                      </p>
                      <p>
                        <b>Bà:</b> {person.mother}
                      </p>
                      <p className="text-xs text-white/60 italic font-normal">
                        {person.address}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-xs text-pink-200 block">
                        {person.rank}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white tracking-wide mt-0.5">
                        {person.name}
                      </h3>
                    </div>
                  </div>
                </ShimmerCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section
          ref={sectionRefs.gallery}
          className="py-12 max-w-5xl mx-auto px-4"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif text-center mb-2 text-pink-200"
          >
            Wedding Album
          </motion.h2>
          <p className="text-xs text-center text-white/60 mb-8 italic">
            Bấm vào từng bức ảnh để ngắm nhìn khoảnh khắc của chúng mình
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {weddingPhotos.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                onClick={() => setSelectedPhoto(url)}
                whileHover={{
                  scale: 1.04,
                  y: -5,
                  rotate: i % 2 === 0 ? 0.8 : -0.8,
                }}
                whileTap={{ scale: 0.97 }}
                className="relative aspect-[3/4] bg-neutral-800/40 rounded-xl overflow-hidden shadow-lg border border-white/10 group cursor-pointer"
              >
                <img
                  src={url}
                  alt={`Wedding Photo ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode.innerHTML = `<div class="w-full h-full flex items-center justify-center text-xs text-white/30 italic px-2 text-center">Đang tải ảnh cưới...</div>`;
                  }}
                />
                {/* Overlay gradient khi hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {/* Icon phóng to */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-lg">
                    🔍
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ===== WEDDING INFO ===== */}
        <section
          ref={sectionRefs.info}
          className="py-20 px-4 text-center max-w-xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ShimmerCard className="bg-neutral-900/60 backdrop-blur-md border border-pink-500/20 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink-300/30 m-4 rounded-tl" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink-300/30 m-4 rounded-br" />
              {/* Rose decorations */}
              <motion.div
                className="absolute top-3 right-14 text-xl opacity-30"
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                🌹
              </motion.div>
              <motion.div
                className="absolute bottom-3 left-14 text-xl opacity-30"
                animate={{ rotate: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                🌸
              </motion.div>

              <h2 className="text-3xl font-serif mb-6 text-pink-200 tracking-wide">
                Wedding Time
              </h2>

              <div className="space-y-4 text-sm md:text-base text-white/90">
                <motion.div
                  className="text-2xl font-semibold text-pink-300 tracking-widest font-mono"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  04 . 06 . 2026
                </motion.div>
                <div className="flex justify-center items-center gap-2 text-white/80">
                  <span>🕣</span>
                  <span>Vào lúc 08 giờ 30 phút</span>
                </div>
                <div className="w-6 h-[1px] bg-white/20 mx-auto my-2" />
                <div className="font-medium text-white">
                  📍 Nhà hàng Tiệc cưới Tín Quang
                </div>

                <motion.button
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/8jqSRKNQb8SHRA5f9",
                      "_blank"
                    )
                  }
                  className="mt-4 text-xs bg-white/10 hover:bg-white/20 text-pink-200 px-6 py-2 rounded-full transition-all border border-white/10 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🗺️ Xem bản đồ chỉ đường
                </motion.button>
              </div>
            </ShimmerCard>
          </motion.div>
        </section>

        {/* ===== RSVP ===== */}
        <section
          ref={sectionRefs.rsvp}
          className="py-16 px-4 max-w-md mx-auto text-center pb-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif mb-2 text-pink-200"
          >
            Xác Nhận Tham Dự
          </motion.h2>
          <p className="text-xs text-white/60 mb-8 italic">
            Để ngày vui được trọn vẹn, xin vui lòng phản hồi trước ngày lễ nhé!
            ❤️
          </p>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleRsvpSubmit}
            className="space-y-5 bg-neutral-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-left shadow-2xl"
          >
            <div>
              <label className="text-xs font-semibold text-pink-200 block mb-1.5 uppercase tracking-wide">
                Họ và Tên của Bạn
              </label>
              <input
                type="text"
                placeholder="Ví dụ: Anh Tuấn, Chị Lan..."
                value={rsvpData.name}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, name: e.target.value })
                }
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 transition"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-pink-200 block mb-2 uppercase tracking-wide">
                Bạn là khách của ai?
              </label>
              <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 rounded-xl border border-white/10 relative">
                {["bride", "groom"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRsvpData({ ...rsvpData, side: s })}
                    className={`py-2 text-xs font-medium rounded-lg relative z-10 transition-colors ${
                      rsvpData.side === s
                        ? "text-neutral-900 font-bold"
                        : "text-white/60"
                    }`}
                  >
                    {rsvpData.side === s && (
                      <motion.div
                        layoutId="activeSide"
                        className="absolute inset-0 bg-pink-300 rounded-lg -z-10"
                      />
                    )}
                    {s === "bride" ? "Nhà Gái (Cô dâu)" : "Nhà Trai (Chú rể)"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-pink-200 block mb-1.5 uppercase tracking-wide">
                Số lượng người tham dự
              </label>
              <select
                value={rsvpData.guests}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, guests: e.target.value })
                }
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 transition"
              >
                <option value="1" className="bg-neutral-900 text-white">
                  Đi 1 mình (Phần mình bạn)
                </option>
                <option value="2" className="bg-neutral-900 text-white">
                  Đi 2 người (Cùng người thương)
                </option>
                <option value="3" className="bg-neutral-900 text-white">
                  Cả gia đình nhỏ (3-4 người)
                </option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-pink-200 block mb-1.5 uppercase tracking-wide">
                Lời chúc gửi tới cô dâu & chú rể
              </label>
              <textarea
                rows="3"
                placeholder="Nhắn nhủ điều yêu thương ngọt ngào tại đây..."
                value={rsvpData.message}
                onChange={(e) =>
                  setRsvpData({ ...rsvpData, message: e.target.value })
                }
                className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-pink-400 transition resize-none"
              />
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(255,145,164,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold py-3.5 rounded-xl text-sm shadow-xl cursor-pointer relative overflow-hidden"
            >
              {/* Shimmer trên nút submit */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                }}
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              {isSubmitted
                ? "🎉 Đã Gửi Xác Nhận Đăng Ký!"
                : "✉️ Gửi Xác Nhận Ngay"}
            </motion.button>
          </motion.form>
        </section>
      </div>

      {/* ===== TAB BAR ===== */}
      <div className="fixed bottom-0 inset-x-0 bg-neutral-900/80 backdrop-blur-xl border-t border-white/10 z-50 py-2.5 px-4 flex justify-around max-w-md mx-auto md:rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {[
          { id: "home", label: "🏠 Home" },
          { id: "story", label: "📖 Story" },
          { id: "gallery", label: "🖼️ Album" },
          { id: "info", label: "📍 Lễ Cưới" },
          { id: "rsvp", label: "💌 RSVP" },
        ].map((item) => (
          <RippleButton
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`text-[11px] md:text-xs font-medium px-3 py-1.5 rounded-xl transition relative cursor-pointer ${
              tab === item.id ? "text-pink-300 font-bold" : "text-white/60"
            }`}
          >
            {tab === item.id && (
              <motion.div
                layoutId="navIndicator"
                className="absolute inset-0 bg-white/5 rounded-xl -z-10"
              />
            )}
            {item.label}
          </RippleButton>
        ))}
      </div>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 bg-black/92 z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Sakura rơi trong lightbox */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: "fixed",
                  left: `${10 + i * 12}%`,
                  top: "-20px",
                  fontSize: 16,
                  pointerEvents: "none",
                }}
                animate={{ y: "110vh", rotate: 360, opacity: [0, 0.8, 0] }}
                transition={{
                  duration: 3 + i * 0.5,
                  delay: i * 0.3,
                  ease: "easeIn",
                }}
              >
                🌸
              </motion.div>
            ))}
            <motion.img
              initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 250 }}
              src={selectedPhoto}
              alt="Phóng to ảnh cưới"
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute top-4 text-xs tracking-wider text-white/50 select-none">
              Chạm vào vùng trống bất kỳ để đóng lại
            </div>
            <motion.button
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white/70 hover:bg-white/20 transition"
              onClick={() => setSelectedPhoto(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
