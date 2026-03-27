// logic/main.js
import { iniciarSliderFlyers } from './flyer.js';
import { iniciarPlayer, initVolumen, initBotonesEstacion } from './player.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const app = document.getElementById('app-container');
    
    if (!app) {
        console.error("❌ ERROR: No se encontró app-container");
        return;
    }

    console.log("🚀 Motor de la radio encendido...");

    // 🐾 Definimos todo el contenido en una sola variable para que sea fácil de encontrar
    const contenidoHTML = `
    <header class="row align-items-center mb-5 p-3" style="background: rgba(0,0,0,0.6); border-radius: 0 0 20px 20px; border-bottom: 3px solid #ff0000; position: relative;">
        <div class="col-md-7 col-12">
            <div class="d-flex align-items-center">
                <img src="img/logo_radio.jpg" alt="Logo" class="img-fluid rounded-3 me-3" style="max-height: 170px; border: 2px solid #ff0000;">
                <div class="logo-text">
                    <h1 class="m-0 text-vyrorei-al-fallo">
                        <span class="color-vyrorei">VYROREI</span>
                        <span class="juntos"><span class="text-al">AL</span><span class="color-fallo">FALLO</span></span>
                    </h1>
                    <small class="text-secondary fw-bold radio-subtitle" style="margin-left: 20px; letter-spacing: 6px;">RADIO ONLINE 24/7</small>
                </div>
            </div>
        </div>
        <div class="flyer-slider" style="position: absolute; bottom: 15px; right: 18px; width: 220px;">
            <img id="flyer-img" src="img/flyer1.jpg" alt="Flyer">
        </div>
    </header>

    <div id="walkman-horizontal">
        <div class="left-col">
            <div class="cover-art-box" onclick="document.getElementById('zoom-modal').style.display='flex';">
                <img id="cover-art" src="img/logo_radio.jpg" alt="Portada" style="display:none">
                <div id="cover-placeholder"></div>
            </div>
            <div id="on-air-indicator" class="on-air-box offline">
                <span class="on-air-text">ON - AIR</span>
            </div>
            <div class="listeners-box">
                <span id="listener-count">👥 0 oyentes</span>
            </div>
        </div>

        <div class="center-col">
            <div class="song-header"><p id="station-label">Sincronizando...</p></div>
            <div class="marquee-box main-title"><h2 id="song-title">Cargando...</h2></div>
            <h3 id="song-artist">Vyrorei al Fallo</h3>
            
            <div id="visualizer" class="spectrum-container paused">
                ${Array.from({length: 16}, () => '<div class="bar"></div>').join('')}
            </div>

            <div class="time-container">
                <span id="current-time" class="time-txt">00:00</span>
                <div class="progress-bar-bg"><div id="progress-fill"></div></div>
                <span id="total-time" class="time-txt">00:00</span>
            </div>

            <div class="controls-layout">
                <div class="station-row">
                    <button id="btn-station-a" class="sony-btn active">ROCK/METAL/HIPHOP</button>
                    <button id="btn-station-b" class="sony-btn">REGGAETON/RETRO</button>
                </div>
                <button id="request-btn" class="sony-action-btn">🎵 SOLICITAR CANCIÓN</button>
            </div>

            <div class="history-section-new">
                <span class="section-tag">ANTERIORES:</span>
                <div class="history-card-box"> 
                    <div id="left-history-list">
                         </div>
                     </div>
            </div>
        </div>

        <div class="right-col">
            <div class="next-section-box">
                <span class="section-tag">SIGUIENTE:</span>
                <div class="next-card">
                    <img id="next-cover" src="img/logo_radio.jpg" alt="Siguiente">
                    <p id="next-title">...</p>
                    <p id="next-artist-sub">Siguiente Tema</p>
                </div>
            </div>
            <div class="volume-section-box">
                <div class="vol-info"><span class="vol-icon">🔈</span><span id="vol-display">80</span></div>
                <input type="range" id="volume-control" min="0" max="100" value="80">
            </div>
        </div>
    </div>

    <div id="request-modal" class="modal-overlay">
        <div class="modal-center-container">
            <div class="modal-content requests-dark-theme">
                <div class="modal-header">
                    <span class="modal-title-text">🎵 SOLICITAR CANCIÓN</span>
                    <button id="close-request-btn" class="close-btn">×</button>
                </div>
                <div class="modal-body"><iframe id="request-frame" src="" frameborder="0"></iframe></div>
            </div>
        </div>
    </div>
    
    <div id="zoom-modal" onclick="this.style.display='none'" style="display:none; position:fixed; z-index:3000; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.95); justify-content:center; align-items:center;">
        <img id="zoom-img" src="" style="max-width:90%; max-height:85vh; border-radius:15px; border:2px solid #ff0000;">
        <audio id="radio-audio" preload="none"></audio>
    </div>
    `;

    // Inyectamos todo el contenido
    app.innerHTML = contenidoHTML;

    // Arrancamos funciones
    iniciarSliderFlyers();
    iniciarPlayer();
    initVolumen();
    initBotonesEstacion();
});