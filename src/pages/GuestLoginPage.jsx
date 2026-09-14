import { useState } from "react";
import { StreambertLogo } from "../components/Icons";

const AVATARS = [
  { id: "cyber", emoji: "🕶️", label: "Cyber" },
  { id: "popcorn", emoji: "🍿", label: "Cinephile" },
  { id: "clapper", emoji: "🎬", label: "Director" },
  { id: "mask", emoji: "🎭", label: "Phantom" },
  { id: "wolf", emoji: "🐺", label: "Lone Wolf" },
  { id: "crown", emoji: "👑", label: "Redzone VIP" },
  { id: "lightning", emoji: "⚡", label: "Speedster" },
  { id: "rocket", emoji: "🚀", label: "Explorer" },
];

const PRESET_NAMES = [
  "NeonSpectre",
  "ShadowWatcher",
  "CyberRonin",
  "MidnightViewer",
  "CinephileX",
  "RetroCritic",
  "NightOwl",
  "GhostOperator",
  "RedzonePrime",
  "VoxelStreamer",
];

export default function GuestLoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0].emoji);
  const [error, setError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRandomize = () => {
    const randomName = PRESET_NAMES[Math.floor(Math.random() * PRESET_NAMES.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    setUsername(`${randomName}_${randomNum}`);
    const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
    setSelectedAvatar(randomAvatar.emoji);
    setError("");
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    const finalName = username.trim() || `Guest_${Math.floor(1000 + Math.random() * 9000)}`;
    setIsSubmitting(true);

    setTimeout(() => {
      onLogin({
        username: finalName,
        avatar: selectedAvatar,
        loginTime: Date.now(),
        isGuest: true,
      });
    }, 400);
  };

  const handleQuickGuest = (preset) => {
    setIsSubmitting(true);
    setTimeout(() => {
      onLogin({
        username: preset.label,
        avatar: preset.emoji,
        loginTime: Date.now(),
        isGuest: true,
      });
    }, 300);
  };

  return (
    <div className="login-wrapper">
      {/* Background ambient lighting and particle glow */}
      <div className="login-ambient login-ambient-1" />
      <div className="login-ambient login-ambient-2" />
      <div className="login-grid-pattern" />

      {/* Main card */}
      <div className={`login-card ${isSubmitting ? "login-card--submitting" : ""}`}>
        {/* Top brand header */}
        <div className="login-header">
          <div className="login-logo-glow">
            <StreambertLogo />
          </div>
          <div className="login-badge">REDZONE MIRROR • GUEST ACCESS</div>
          <h1 className="login-title">ENTER THE STREAM</h1>
          <p className="login-subtitle">
            Create your instant guest profile. No password or email needed.
          </p>
        </div>

        {/* Guest Input Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">
              <span>Choose Username / Callsign</span>
              <button
                type="button"
                onClick={handleRandomize}
                className="login-random-btn"
                title="Randomize username & avatar"
              >
                🎲 Randomize
              </button>
            </label>

            <div className="login-input-box">
              <span className="login-input-avatar">{selectedAvatar}</span>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. CyberViewer or Enter Guest Name"
                className="login-input"
                autoFocus
                maxLength={24}
              />
            </div>
            {error && <div className="login-error">{error}</div>}
          </div>

          {/* Avatar selector */}
          <div className="login-field">
            <label className="login-label">
              <span>Choose Avatar</span>
            </label>
            <div className="login-avatars-grid">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.emoji;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.emoji)}
                    className={`login-avatar-btn ${isSelected ? "login-avatar-btn--selected" : ""}`}
                    title={av.label}
                  >
                    <span className="login-avatar-emoji">{av.emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick presets */}
          <div className="login-presets">
            <span className="login-presets-title">Quick Guest Profiles:</span>
            <div className="login-presets-pills">
              {AVATARS.slice(0, 4).map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => handleQuickGuest(av)}
                  className="login-preset-pill"
                >
                  <span>{av.emoji}</span> {av.label}
                </button>
              ))}
            </div>
          </div>

          {/* Launch Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="login-submit-btn"
          >
            {isSubmitting ? (
              <span className="login-loading-spin">Launching Streambert…</span>
            ) : (
              <>
                <span>Enter as {username.trim() || "Guest"}</span>
                <span className="login-btn-arrow">→</span>
              </>
            )}
          </button>
        </form>

        {/* Feature badges */}
        <div className="login-features">
          <div className="login-feat-item">
            <span className="login-feat-dot" />
            <span>TMDB 4K Catalog</span>
          </div>
          <div className="login-feat-item">
            <span className="login-feat-dot" />
            <span>Ad-Free Players</span>
          </div>
          <div className="login-feat-item">
            <span className="login-feat-dot" />
            <span>PC & Mobile Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
