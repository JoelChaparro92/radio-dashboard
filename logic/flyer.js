// logic/flyer.js

export function iniciarSliderFlyers() {
    const flyers = [
        'img/flyer1.jpg',
        'img/flyer2.jpg',
        'img/flyer3.jpg'
    ];

    let flyerIndex = 0;
    const flyerImg = document.getElementById('flyer-img');

    if (!flyerImg) {
        console.error('❌ No se encontró el elemento flyer-img');
        return;
    }

    setInterval(() => {
        flyerIndex = (flyerIndex + 1) % flyers.length;
        flyerImg.style.opacity = '0';
        setTimeout(() => {
            flyerImg.src = flyers[flyerIndex];
            flyerImg.style.opacity = '1';
        }, 400);
    }, 10000);

    console.log('🎬 Slider de flyers iniciado');
}
