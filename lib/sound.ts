"use client";

let audioCtx: AudioContext | null = null;
let soundEnabled = false;

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return soundEnabled;
}

export function setSoundEnabled(enabled: boolean): void {
  soundEnabled = enabled;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("khalid_sound", enabled ? "1" : "0");
    } catch (e) {}
  }
}

export function initSoundPreference(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const saved = localStorage.getItem("khalid_sound");
    soundEnabled = saved === "1";
    return soundEnabled;
  } catch (e) {
    return false;
  }
}

export function playTick(frequency = 1800, duration = 0.012, gainValue = 0.03): void {
  if (!soundEnabled || typeof window === "undefined") return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }

    if (!audioCtx) return;

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // audio failure silent recovery
  }
}
