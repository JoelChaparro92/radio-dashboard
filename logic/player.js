// logic/player.js

// ─── CONFIGURACIÓN CENTRAL ───────────────────────────────────────────────────
const API_BASE = 'https://radio.vyroreialfallo.com';

const STATIONS = {
  A: {
    id: 'radio_vyrorei',
    stream: `${API_BASE}/listen/radio_vyrorei/radio.mp3`,
    name: 'ROCK, METAL, HIPHOP',
    req: `${API_BASE}/public/radio_vyrorei/embed-requests`
  },
  B: {
    id: 'stream_vyrorei',
    stream: `${API_BASE}/listen/stream_vyrorei/radio.mp3`,
    name: 'RETRO, REGGAETON, ELECTRO',
    req: `${API_BASE}/public/stream_vyrorei/embed-requests`
  }
};

const DEFAULT_COVER = 'img/logo_radio.jpg';
let currentStation = 'A';
let elapsed = 0, duration = 0;

// ─── INICIALIZACIÓN ───────────────────────────────────────────────────────────
export function iniciarPlayer() {
  const audio = document.getElementById('radio-audio');
  if (!audio) return;

  // 🐾 MEJORA ANTI-CORTES: 
  // Le decimos al navegador que cargue un poco más de música antes de empezar
  audio.preload = "auto"; 
  audio.src = STATIONS[currentStation].stream;
  audio.volume = 0.8;

  audio.addEventListener('play', () => {
    document.getElementById('visualizer')?.classList.remove('paused');
    
    // Si venimos de una pausa, refrescamos para sincronizar
    if (audio.readyState > 0 && audio.paused === false) {
        const currentVol = audio.volume;
        audio.src = STATIONS[currentStation].stream; 
        audio.volume = currentVol;
        
        // 🐾 TRUCO DE INFRAESTRUCTURA:
        // Esperamos a que el buffer tenga al menos 2-3 segundos de música
        // para evitar que los microcortes de red interrumpan el inicio.
        setTimeout(() => {
            audio.play().catch(() => {});
        }, 150); // Un pequeño delay técnico de 150ms ayuda a estabilizar el flujo
    }
  });

  audio.onpause = () => document.getElementById('visualizer')?.classList.add('paused');
  
  // 🐾 SOLUCIÓN AL BUG DEL ARTISTA ATRASADO:
  // Actualizamos la metadata cada 10 segundos en lugar de 15.
  updateMetadata();
  setInterval(updateMetadata, 10000); 
  setInterval(updateProgressBar, 1000);

  // Intento de reproducción inicial
  audio.play().catch(() => {
     console.log("🐾 El michi espera un clic para sonar...");
  });
}

// ─── CONTROL DE VOLUMEN Y MUTE ────────────────────────────────────────────────
let lastVolume = 0.8;

export function initVolumen() {
  const slider = document.getElementById('volume-control');
  const volDisplay = document.getElementById('vol-display');
  const volIcon = document.querySelector('.vol-icon');
  const audio = document.getElementById('radio-audio');

  if (!slider || !audio) return;

  slider.addEventListener('input', () => {
    const val = slider.value / 100;
    audio.volume = val;
    if (volDisplay) volDisplay.innerText = slider.value;
    if (val > 0) lastVolume = val;
    if (volIcon) volIcon.innerText = val === 0 ? '🔇' : '🔈';
  });

  if (volIcon) {
    volIcon.style.cursor = 'pointer';
    volIcon.addEventListener('click', () => {
      setTimeout(() => {
        if (audio.volume > 0) {
          lastVolume = audio.volume;
          audio.volume = 0;
          slider.value = 0;
          if (volDisplay) volDisplay.innerText = '0';
          volIcon.innerText = '🔇';
        } else {
          audio.volume = lastVolume;
          slider.value = lastVolume * 100;
          if (volDisplay) volDisplay.innerText = Math.round(lastVolume * 100);
          volIcon.innerText = '🔈';
        }
      }, 100);
    });
  }
}

export function initBotonesEstacion() {
  document.getElementById('btn-station-a')?.addEventListener('click', () => switchStation('A'));
  document.getElementById('btn-station-b')?.addEventListener('click', () => switchStation('B'));
  document.getElementById('request-btn')?.addEventListener('click', openRequests);
  document.getElementById('close-request-btn')?.addEventListener('click', closeRequests);
}

// 🐾 FUNCIÓN DE CAMBIO DE ESTACIÓN (NUEVA / REPARADA)
export function switchStation(id) {
    if (currentStation === id) return;
    
    currentStation = id;
    const audio = document.getElementById('radio-audio');
    if (!audio) return;

    audio.src = STATIONS[id].stream;
    audio.play().catch(err => console.warn("Error al cambiar:", err));

    // Actualizar botones visualmente
    document.getElementById('btn-station-a')?.classList.toggle('active', id === 'A');
    document.getElementById('btn-station-b')?.classList.toggle('active', id === 'B');

    // Actualizar textos inmediatamente
    const label = document.getElementById('station-label');
    if (label) label.innerText = STATIONS[id].name;

    updateMetadata();
    console.log(`🐾 Cambiado a: ${STATIONS[id].name}`);
}

// ─── UTILIDADES ───────────────────────────────────────────────────────────────
function formatTime(s) {
  const min = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function setCover(imgEl, artUrl) {
  const url = artUrl && !artUrl.includes('default') ? artUrl : DEFAULT_COVER;
  if (!imgEl) return;
  imgEl.src = url;
  imgEl.onerror = () => { imgEl.src = DEFAULT_COVER; imgEl.onerror = null; };
  imgEl.style.display = 'block';
}

// ─── BARRA DE PROGRESO ────────────────────────────────────────────────────────
function updateProgressBar() {
  if (duration > 0) {
    elapsed = Math.min(elapsed + 1, duration);
    const percent = (elapsed / duration) * 100;
    const fill = document.getElementById('progress-fill');
    if (fill) fill.style.width = percent + '%';
    const ct = document.getElementById('current-time');
    if (ct) ct.innerText = formatTime(elapsed);
  }
}

// ─── SOLICITUDES ─────────────────────────────────────────────────────────────
function openRequests() {
  const frame = document.getElementById('request-frame');
  if (frame) frame.src = STATIONS[currentStation].req;
  const modal = document.getElementById('request-modal');
  if (modal) modal.style.display = 'flex';
}

function closeRequests() {
  const modal = document.getElementById('request-modal');
  if (modal) modal.style.display = 'none';
  const frame = document.getElementById('request-frame');
  if (frame) frame.src = '';
}

// ─── METADATA PRINCIPAL ───────────────────────────────────────────────────────
async function updateMetadata() {
  const indicator = document.getElementById('on-air-indicator');
  const indicatorText = indicator?.querySelector('.on-air-text');

  try {
    const stationId = STATIONS[currentStation].id;
    const res = await fetch(`${API_BASE}/api/nowplaying/${stationId}?t=${Date.now()}`);
    if (!res.ok) throw new Error('Offline');
    const data = await res.json();

    const np   = data.now_playing;
    const song = np.song;

    if (indicator) {
      indicator.classList.remove('offline');
      indicator.classList.add('online');
      if (indicatorText) indicatorText.innerText = 'ON - AIR';
    }

    const titleEl = document.getElementById('song-title');
    const artistEl = document.getElementById('song-artist');
    if (titleEl) titleEl.innerText = song.title || 'Canción Desconocida';
    if (artistEl) artistEl.innerText = song.artist || 'Vyrorei al Fallo';

    setCover(document.getElementById('cover-art'), song.art);

    const lc = document.getElementById('listener-count');
    if (lc) lc.textContent = `👥 ${data.listeners?.current ?? 0} oyentes`;

    elapsed  = np.elapsed  || 0;
    duration = np.duration || 0;
    const tt = document.getElementById('total-time');
    if (tt) tt.innerText = formatTime(duration);

    if (data.playing_next) {
      const next = data.playing_next.song;
      const nt = document.getElementById('next-title');
      const na = document.getElementById('next-artist-sub');
      if (nt) nt.innerText = next.title || '---';
      if (na) na.innerText = next.artist || 'Siguiente Tema';
      setCover(document.getElementById('next-cover'), next.art);
    }

    // 🐾 HISTORIAL IZQUIERDO (FILA HORIZONTAL)
    const leftHistoryList = document.getElementById('left-history-list');
    if (leftHistoryList && data.song_history) {
        leftHistoryList.innerHTML = '';
        
        data.song_history.slice(0, 4).forEach(item => {
            const hSong = item.song;
            const hArt  = hSong.art && !hSong.art.includes('default') ? hSong.art : DEFAULT_COVER;
            
            const div = document.createElement('div');
            div.className = 'left-history-item';
            
            // 🐾 Inyectamos el Título, Artista y el ÁLBUM (hSong.album)
            div.innerHTML = `
                <img src="${hArt}" onerror="this.src='${DEFAULT_COVER}'" class="left-h-art" />
                <div class="left-h-info">
                    <span class="left-h-title">${hSong.title || '---'}</span>
                    <span class="left-h-artist">${hSong.artist || '---'}</span>
                    <span class="left-h-album">${hSong.album || ''}</span> 
                </div>`;
            leftHistoryList.appendChild(div);
        });
        // 🐾 Pausa técnica de log para confirmar la carga
        console.log("🐾 Historial actualizado con álbumes incluidos.");
    }

  } catch (err) {
    console.warn('[Player] Error:', err.message);
    if (indicator) {
      indicator.classList.remove('online');
      indicator.classList.add('offline');
      if (indicatorText) indicatorText.innerText = 'OFF - AIR';
    }
    const songTitle = document.getElementById('song-title');
    if (songTitle) songTitle.innerText = 'FUERA DE LÍNEA';
    const cover = document.getElementById('cover-art');
    if (cover) { cover.src = DEFAULT_COVER; cover.style.display = 'block'; }
  }
}

// ─── ZOOM DE PORTADA ─────────────────────────────────────────────────────────
function openZoomCover(artUrl) {
  const modal = document.getElementById('zoom-modal');
  const img   = document.getElementById('zoom-img');
  if (!modal || !img) return;
  img.src = artUrl || DEFAULT_COVER;
  modal.style.display = 'flex';
}