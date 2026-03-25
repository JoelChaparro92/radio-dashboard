// logic/main.js
import { iniciarSliderFlyers } from './flyer.js';  // ← LÍNEA 1 (NUEVO)

document.addEventListener('DOMContentLoaded', () => {
    
    const app = document.getElementById('app-container');
    
    if (!app) {
        console.error("❌ ERROR DE INFRAESTRUCTURA: No se encontró app-container");
        return;
    }

    console.log("🚀 Motor de la radio encendido... ¡Sintonía Total!");

    const template = `
    <header class="row align-items-center mb-5 p-3" style="background: rgba(0,0,0,0.6); border-radius: 0 0 20px 20px; border-bottom: 3px solid #ff0000; box-shadow: 0 10px 30px rgba(0,0,0,0.8); position: relative;">
        
        <div class="col-md-7 col-12 text-center text-md-start">
            <div class="d-flex align-items-center justify-content-end justify-content-md-start">
                <img src="img/logo_radio.jpg" alt="Logo" class="img-fluid rounded-3 me-3" style="max-height: 170px; border: 2px solid #ff0000; box-shadow: 0 0 15px rgba(255,0,0,0.5);">
                <div class="logo-text">
                    <h1 class="m-0 text-vyrorei-al-fallo">
                        <span class="color-vyrorei">VYROREI</span>
                        <span class="juntos">
                            <span class="text-al">AL</span>
                            <span class="color-fallo">FALLO</span>
                        </span>
                    </h1>
                    <small class="text-secondary fw-bold radio-subtitle" style="margin-left: 20px; letter-spacing: 6px; font-family: sans-serif;">RADIO ONLINE 24/7</small>
                    
                    <div class="login-under-subtitle mt-2">
                        <button id="loginBtn" class="btn-login-corner">LOGIN / PERFIL</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- ↓ REEMPLAZA el marquee-corner por esto (NUEVO) -->
        <div class="flyer-slider" style="position: absolute; bottom: 15px; right: 18px; width: 220px; z-index: 100;">
            <img id="flyer-img" src="img/flyer1.jpg" alt="Flyer Programacion">
        </div>

    </header>
`;

    app.innerHTML = template;

    iniciarSliderFlyers(); // ← DESPUÉS del innerHTML (NUEVO)
});
