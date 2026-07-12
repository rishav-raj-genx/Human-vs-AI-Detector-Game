const STORAGE_KEY = "human-vs-ai-detector-leaderboard";
const NAME_KEY = "human-vs-ai-detector-name";
const ROUND_COUNT = 10;
const ROUND_TIME = 15;

const roundsData = [
  {
    id: "img-ai",
    type: "image",
    title: "Visual puzzle",
    prompt: "This image looks polished and almost too perfect. Which creator likely made it?",
    media: {
      svg: `
        <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg">
          <rect width="520" height="360" rx="28" fill="#0f172a"></rect>
          <circle cx="250" cy="170" r="110" fill="#f8fafc" opacity="0.95"></circle>
          <circle cx="210" cy="150" r="8" fill="#0f172a"></circle>
          <circle cx="290" cy="150" r="8" fill="#0f172a"></circle>
          <path d="M190 220 Q250 270 310 220" stroke="#0f172a" stroke-width="8" fill="none" stroke-linecap="round"></path>
          <path d="M150 90 C180 40 320 38 360 92" stroke="#06b6d4" stroke-width="10" fill="none" stroke-linecap="round"></path>
          <path d="M110 250 C162 300 338 300 390 250" stroke="#7c3aed" stroke-width="12" fill="none" stroke-linecap="round"></path>
          <circle cx="170" cy="110" r="20" fill="#f43f5e" opacity="0.2"></circle>
          <circle cx="330" cy="100" r="28" fill="#34d399" opacity="0.16"></circle>
        </svg>`
    },
    answer: "AI",
    explanation: "The symmetry, glowing edges, and impossible lighting suggest algorithmic composition rather than a spontaneous human capture.",
    difficulty: "easy"
  },
  {
    id: "text-ai",
    type: "text",
    title: "Text challenge",
    prompt: "This paragraph is elegant but a little too polished. Which source is more likely?",
    media: {
      text: "The city shimmered at dawn, as if the skyline had been assembled from a dream and a spreadsheet. Every window reflected a different weather, every avenue seemed to know its own future."
    },
    answer: "AI",
    explanation: "The prose feels highly balanced and semantically smooth, which often points to AI-generated language.",
    difficulty: "easy"
  },
  {
    id: "code-ai",
    type: "code",
    title: "Code whisper",
    prompt: "This snippet is compact, clever, and slightly uncanny. Which side wrote it?",
    media: {
      code: `function renderSignal(state) {
  const pool = state.items.map((item) => item.value).sort();
  return pool.filter((value, index) => value !== pool[index - 1]);
}`
    },
    answer: "AI",
    explanation: "The logic is valid but the naming and structure are neat in a way that often reflects a model-generated solution.",
    difficulty: "medium"
  },
  {
    id: "voice-ai",
    type: "voice",
    title: "Audio sample",
    prompt: "Play the clip and judge whether it sounds human or synthetic.",
    media: {},
    answer: "AI",
    explanation: "The pacing is precise, the cadence is uniform, and the tonal shifts are almost too controlled.",
    difficulty: "medium",
    voiceProfile: "ai"
  },
  {
    id: "art-ai",
    type: "artwork",
    title: "Synthetic artwork",
    prompt: "This artwork contains an unusual blend of structure and dream logic. Who made it?",
    media: {
      svg: `
        <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg">
          <rect width="520" height="360" rx="28" fill="#111827"></rect>
          <path d="M70 260 C130 170, 220 120, 280 180 S410 260, 450 140" stroke="#06b6d4" stroke-width="12" fill="none" stroke-linecap="round"></path>
          <path d="M90 300 C180 220, 330 220, 440 300" stroke="#7c3aed" stroke-width="14" fill="none" stroke-linecap="round"></path>
          <circle cx="180" cy="138" r="34" fill="#f43f5e" opacity="0.85"></circle>
          <circle cx="320" cy="124" r="24" fill="#34d399" opacity="0.75"></circle>
          <rect x="110" y="60" width="110" height="110" rx="24" fill="#f8fafc" opacity="0.12"></rect>
          <rect x="304" y="76" width="98" height="98" rx="24" fill="#f8fafc" opacity="0.14"></rect>
        </svg>`
    },
    answer: "AI",
    explanation: "The layered geometry and dreamlike color balance are common traits of AI image generation.",
    difficulty: "hard"
  },
  {
    id: "img-human",
    type: "image",
    title: "Street scene",
    prompt: "This image has a gritty, lived-in feel. Which creator likely made it?",
    media: {
      svg: `
        <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg">
          <rect width="520" height="360" rx="28" fill="#111827"></rect>
          <rect x="80" y="100" width="160" height="180" rx="16" fill="#f59e0b"></rect>
          <rect x="250" y="80" width="180" height="200" rx="18" fill="#64748b"></rect>
          <path d="M100 280 L160 220 L220 280" stroke="#f8fafc" stroke-width="10" fill="none" stroke-linecap="round"></path>
          <path d="M270 280 L330 180 L400 280" stroke="#f8fafc" stroke-width="10" fill="none" stroke-linecap="round"></path>
          <circle cx="130" cy="140" r="16" fill="#0f172a"></circle>
          <circle cx="182" cy="140" r="16" fill="#0f172a"></circle>
          <path d="M120 184 Q156 206 192 184" stroke="#0f172a" stroke-width="6" fill="none" stroke-linecap="round"></path>
        </svg>`
    },
    answer: "Human",
    explanation: "The rough perspective, visible asymmetry, and casual imperfections suggest a human-crafted scene.",
    difficulty: "easy"
  },
  {
    id: "text-human",
    type: "text",
    title: "A human voice",
    prompt: "This paragraph feels intimate and slightly messy. Which source is more likely?",
    media: {
      text: "I kept thinking about the old train station long after I left. It smelled like wet stone and coffee, and the whole place felt older than the map said it was."
    },
    answer: "Human",
    explanation: "The sentence rhythms and small imperfections feel lived-in, personal, and less uniformly optimized.",
    difficulty: "medium"
  },
  {
    id: "code-human",
    type: "code",
    title: "Code signature",
    prompt: "This snippet feels like something a person wrote under pressure. Which side wrote it?",
    media: {
      code: `function doThing(items) {
  const out = [];
  for (const item of items) {
    if (item && item.name) {
      out.push(item.name.toUpperCase());
    }
  }
  return out;
}`
    },
    answer: "Human",
    explanation: "The straightforward, slightly verbose style and practical naming choices feel more human than polished-model output.",
    difficulty: "medium"
  },
  {
    id: "voice-human",
    type: "voice",
    title: "Natural voice",
    prompt: "Play the clip and judge whether it sounds human or synthetic.",
    media: {},
    answer: "Human",
    explanation: "The uneven pauses, tiny pitch wobble, and natural imperfections point to an organic human voice.",
    difficulty: "hard",
    voiceProfile: "human"
  },
  {
    id: "art-human",
    type: "artwork",
    title: "Handmade composition",
    prompt: "This composition has an off-center, tactile quality. Who made it?",
    media: {
      svg: `
        <svg viewBox="0 0 520 360" xmlns="http://www.w3.org/2000/svg">
          <rect width="520" height="360" rx="28" fill="#0b1120"></rect>
          <path d="M110 260 C160 150, 240 110, 290 160 S380 250, 430 180" stroke="#f59e0b" stroke-width="10" fill="none" stroke-linecap="round"></path>
          <path d="M80 300 C150 230, 250 220, 320 280 S430 330, 460 270" stroke="#38bdf8" stroke-width="10" fill="none" stroke-linecap="round"></path>
          <rect x="138" y="72" width="92" height="92" rx="22" fill="#fff7ed" opacity="0.16"></rect>
          <circle cx="270" cy="118" r="38" fill="#f43f5e" opacity="0.82"></circle>
          <rect x="300" y="84" width="70" height="70" rx="16" fill="#f8fafc" opacity="0.16"></rect>
        </svg>`
    },
    answer: "Human",
    explanation: "The composition feels slightly imperfect and tactile, with a handmade detour from perfect symmetry.",
    difficulty: "hard"
  }
];

const state = {
  rounds: [],
  roundIndex: 0,
  score: 0,
  streak: 0,
  bestStreak: 0,
  correctAnswers: 0,
  totalAnswers: 0,
  currentRound: null,
  gameOver: false,
  timer: null,
  timeLeft: ROUND_TIME,
  lastResult: null,
  playerName: localStorage.getItem(NAME_KEY) || "Player"
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  bindEvents();
  resetGame();
}

function bindEvents() {
  document.getElementById("btn-human").addEventListener("click", () => submitAnswer("Human"));
  document.getElementById("btn-ai").addEventListener("click", () => submitAnswer("AI"));
  document.getElementById("next-btn").addEventListener("click", handleNext);
  document.getElementById("start-over-btn").addEventListener("click", resetGame);
  document.getElementById("play-voice-btn").addEventListener("click", playCurrentVoiceSample);

  document.getElementById("player-name").addEventListener("input", (event) => {
    state.playerName = event.target.value.trim() || "Player";
    localStorage.setItem(NAME_KEY, state.playerName);
  });

  document.getElementById("player-name").value = state.playerName;
}

function resetGame() {
  clearInterval(state.timer);

  state.rounds = shuffle([...roundsData]).slice(0, ROUND_COUNT);
  state.roundIndex = 0;
  state.score = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.correctAnswers = 0;
  state.totalAnswers = 0;
  state.currentRound = null;
  state.gameOver = false;
  state.lastResult = null;
  state.timeLeft = ROUND_TIME;

  render();
  startRound();
}

function startRound() {
  clearInterval(state.timer);
  state.currentRound = state.rounds[state.roundIndex];
  state.timeLeft = ROUND_TIME;
  state.lastResult = null;

  renderRound();
  startTimer();
}

function renderRound() {
  const round = state.currentRound;
  if (!round) return;

  document.getElementById("round-label").textContent = `Round ${state.roundIndex + 1}/${state.rounds.length}`;
  document.getElementById("difficulty-pill").textContent = `Difficulty ${round.difficulty.toUpperCase()}`;
  document.getElementById("prompt-title").textContent = round.title;
  document.getElementById("prompt-copy").textContent = round.prompt;

  document.getElementById("media-host").innerHTML = renderMedia(round);
  document.getElementById("feedback-panel").classList.add("hidden");
  document.getElementById("feedback-panel").innerHTML = "";
  document.getElementById("next-btn").classList.add("hidden");
  document.getElementById("play-voice-btn").classList.toggle("hidden", round.type !== "voice");

  const humanBtn = document.getElementById("btn-human");
  const aiBtn = document.getElementById("btn-ai");
  humanBtn.disabled = false;
  aiBtn.disabled = false;
  humanBtn.classList.remove("is-selected");
  aiBtn.classList.remove("is-selected");

  renderStats();
}

function renderMedia(round) {
  switch (round.type) {
    case "image":
    case "artwork":
      return `
        <div class="media-shell ${round.type === "image" ? "image-shell" : "art-shell"}">
          ${round.media.svg}
        </div>
      `;

    case "text":
      return `
        <div class="media-shell quote-shell">
          <blockquote>“${escapeHtml(round.media.text)}”</blockquote>
        </div>
      `;

    case "code":
      return `
        <div class="media-shell code-shell">
          <pre><code>${escapeHtml(round.media.code)}</code></pre>
        </div>
      `;

    case "voice":
      return `
        <div class="media-shell voice-shell">
          <div class="voice-icon">🎧</div>
          <div class="waveform" aria-hidden="true">
            <span style="height: 18px"></span>
            <span style="height: 44px"></span>
            <span style="height: 74px"></span>
            <span style="height: 58px"></span>
            <span style="height: 30px"></span>
            <span style="height: 66px"></span>
            <span style="height: 22px"></span>
          </div>
          <p class="muted">A short sample is ready to play.</p>
        </div>
      `;

    default:
      return "";
  }
}

function submitAnswer(choice) {
  if (!state.currentRound || state.gameOver || state.lastResult) return;

  clearInterval(state.timer);

  const round = state.currentRound;
  const isCorrect = choice === round.answer;

  state.totalAnswers += 1;

  const difficultyBonus = {
    easy: 20,
    medium: 35,
    hard: 50
  }[round.difficulty] || 25;

  const timeBonus = state.timeLeft * 2;

  if (isCorrect) {
    state.score += 100 + difficultyBonus + timeBonus;
    state.correctAnswers += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
  } else {
    state.streak = 0;
  }

  state.lastResult = {
    correct: isCorrect,
    choice,
    answer: round.answer,
    explanation: round.explanation
  };

  const humanBtn = document.getElementById("btn-human");
  const aiBtn = document.getElementById("btn-ai");
  humanBtn.disabled = true;
  aiBtn.disabled = true;

  humanBtn.classList.toggle("is-selected", choice === "Human");
  aiBtn.classList.toggle("is-selected", choice === "AI");

  showFeedback(state.lastResult);
  renderStats();

  const isLastRound = state.roundIndex >= state.rounds.length - 1;
  const nextButton = document.getElementById("next-btn");
  nextButton.textContent = isLastRound ? "View Results" : "Next Round";
  nextButton.classList.remove("hidden");
}

function showFeedback(result) {
  const panel = document.getElementById("feedback-panel");
  panel.classList.remove("hidden");
  panel.innerHTML = `
    <div class="feedback-badge ${result.correct ? "correct" : "wrong"}">
      ${result.correct ? "Correct" : "Missed"}
    </div>
    <h4>${result.correct ? "Nice read" : "The reveal"}</h4>
    <p><strong>Correct answer:</strong> ${result.answer}</p>
    <p>${result.explanation}</p>
  `;
}

function handleNext() {
  if (state.gameOver) {
    resetGame();
    return;
  }

  if (state.roundIndex < state.rounds.length - 1) {
    state.roundIndex += 1;
    startRound();
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(state.timer);
  state.gameOver = true;

  const accuracy = Math.round((state.correctAnswers / state.rounds.length) * 100);
  saveLeaderboardEntry();

  const panel = document.getElementById("feedback-panel");
  panel.classList.remove("hidden");
  panel.innerHTML = `
    <div class="feedback-badge correct">Run complete</div>
    <h4>Final result</h4>
    <p>${state.correctAnswers}/${state.rounds.length} correct · ${accuracy}% accuracy · Best streak ${state.bestStreak}</p>
    <p>Your score has been saved to the local leaderboard.</p>
  `;

  document.getElementById("next-btn").textContent = "Play Again";
  document.getElementById("next-btn").classList.remove("hidden");
  document.getElementById("play-voice-btn").classList.add("hidden");
  document.getElementById("btn-human").disabled = true;
  document.getElementById("btn-ai").disabled = true;

  renderStats();
}

function startTimer() {
  const fill = document.getElementById("timer-fill");
  const timerText = document.getElementById("timer-text");

  state.timer = setInterval(() => {
    state.timeLeft -= 1;
    const progress = (state.timeLeft / ROUND_TIME) * 100;
    fill.style.width = `${progress}%`;
    timerText.textContent = `⏳ ${state.timeLeft}s`;

    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      submitAnswer(null);
    }
  }, 1000);

  fill.style.width = "100%";
  timerText.textContent = `⏳ ${state.timeLeft}s`;
}

function renderStats() {
  document.getElementById("score-value").textContent = state.score;
  document.getElementById("streak-value").textContent = state.streak;
  document.getElementById("correct-value").textContent = `${state.correctAnswers}/${state.totalAnswers || 0}`;
  document.getElementById("round-counter").textContent = `${state.roundIndex + 1}/${state.rounds.length}`;
}

function render() {
  renderStats();
  renderLeaderboard();
}

function renderLeaderboard() {
  const list = document.getElementById("leaderboard-list");
  const entries = loadLeaderboard();

  if (!entries.length) {
    list.innerHTML = `<li class="empty">No runs recorded yet.</li>`;
    return;
  }

  list.innerHTML = entries
    .slice(0, 5)
    .map((entry, index) => `
      <li>
        <span>${index + 1}. ${escapeHtml(entry.name)}</span>
        <strong>${entry.score}</strong>
      </li>
    `)
    .join("");
}

function saveLeaderboardEntry() {
  const entry = {
    name: state.playerName || "Player",
    score: state.score,
    accuracy: Math.round((state.correctAnswers / state.rounds.length) * 100),
    date: new Date().toLocaleDateString()
  };

  const entries = loadLeaderboard();
  entries.push(entry);
  entries.sort((a, b) => b.score - a.score);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, 10)));
}

function loadLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

function playCurrentVoiceSample() {
  if (!state.currentRound || state.currentRound.type !== "voice") return;
  playVoiceClip(state.currentRound);
}

function playVoiceClip(round) {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = 0.08;
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1200;
  filter.connect(master);

  const now = ctx.currentTime;
  const steps = round.voiceProfile === "ai"
    ? [220, 330, 440, 330]
    : [180, 190, 205, 188];

  let elapsed = 0;

  steps.forEach((freq, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = round.voiceProfile === "ai" ? "sawtooth" : "triangle";
    oscillator.frequency.setValueAtTime(freq, now + elapsed);

    gain.gain.setValueAtTime(0.0001, now + elapsed);
    gain.gain.exponentialRampToValueAtTime(0.05, now + elapsed + 0.01);

    oscillator.connect(gain);
    gain.connect(filter);

    const duration = index === steps.length - 1 ? 0.28 : 0.22;
    oscillator.start(now + elapsed);
    oscillator.stop(now + elapsed + duration);

    elapsed += duration;
  });

  setTimeout(() => ctx.close(), 1400);
}

function shuffle(array) {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}