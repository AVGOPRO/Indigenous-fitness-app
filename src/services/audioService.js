// Nalam — Audio Service (v3 — expo-audio, SDK 55 correct API)
//
// expo-av is deprecated in SDK 55 and its setAudioModeAsync threw silently
// due to invalid INTERRUPTION_MODE constants (old API). This version uses
// expo-audio (the official replacement) with the correct imperative API.

import {
  createAudioPlayer,
  setAudioModeAsync,
} from 'expo-audio';

// ─── Static asset map — require() must be static for Metro bundler ───────────
const AUDIO_SOURCES = {
  med_001: require('../../assets/audio/anulom_vilom.mp3'),
  med_002: require('../../assets/audio/bhramari.mp3'),
  med_003: require('../../assets/audio/kapalbhati.mp3'),
  med_004: require('../../assets/audio/box_breathing.mp3'),
  med_005: require('../../assets/audio/body_scan.mp3'),
  med_006: require('../../assets/audio/gratitude_sankalpa.mp3'),
};

// ─── Config ──────────────────────────────────────────────────────────────────
const TARGET_VOLUME = 0.55;
const FADE_STEPS    = 30;      // 30 × 50ms = 1.5s fade
const FADE_MS       = 50;

// ─── State ───────────────────────────────────────────────────────────────────
let _player    = null;
let _fadeTimer = null;

// ─── Internal helpers ────────────────────────────────────────────────────────
const _clearFade = () => {
  if (_fadeTimer) { clearInterval(_fadeTimer); _fadeTimer = null; }
};

const _fadeIn = (player) => {
  _clearFade();
  let step = 0;
  _fadeTimer = setInterval(() => {
    step++;
    player.volume = Math.min(TARGET_VOLUME, (TARGET_VOLUME / FADE_STEPS) * step);
    if (step >= FADE_STEPS) _clearFade();
  }, FADE_MS);
};

const _fadeOut = (player, onDone) => {
  _clearFade();
  let step = 0;
  _fadeTimer = setInterval(() => {
    step++;
    player.volume = Math.max(0, TARGET_VOLUME - (TARGET_VOLUME / FADE_STEPS) * step);
    if (step >= FADE_STEPS) {
      _clearFade();
      onDone && onDone();
    }
  }, FADE_MS);
};

// ─── AudioService ─────────────────────────────────────────────────────────────
const AudioService = {

  async play(sessionId) {
    try {
      await this.stop();

      const source = AUDIO_SOURCES[sessionId];
      if (!source) {
        console.warn(`[AudioService] No track mapped for: ${sessionId}`);
        return;
      }

      // Set audio mode BEFORE creating player
      await setAudioModeAsync({
        playsInSilentModeIOS:      true,
        shouldPlayInBackground:    true,
        interruptionMode:          'doNotMix',
        allowsBackgroundRecording: false,
      });

      const player = createAudioPlayer(source);
      player.loop   = true;
      player.volume = 0;     // start silent, fade in below
      player.play();

      _player = player;
      _fadeIn(player);

    } catch (err) {
      console.warn('[AudioService] play error:', err?.message);
    }
  },

  pause() {
    try {
      _clearFade();
      if (_player) _player.pause();
    } catch (err) {
      console.warn('[AudioService] pause error:', err?.message);
    }
  },

  resume() {
    try {
      if (_player) _player.play();
    } catch (err) {
      console.warn('[AudioService] resume error:', err?.message);
    }
  },

  stop() {
    return new Promise((resolve) => {
      if (!_player) { _clearFade(); resolve(); return; }

      const playerToStop = _player;
      _player = null;

      _fadeOut(playerToStop, () => {
        try {
          playerToStop.pause();
          playerToStop.remove();   // releases native resources
        } catch (_) {}
        resolve();
      });
    });
  },

  setVolume(vol) {
    try {
      _clearFade();
      if (_player) _player.volume = Math.max(0, Math.min(1, vol));
    } catch (err) {
      console.warn('[AudioService] setVolume error:', err?.message);
    }
  },
};

export default AudioService;
