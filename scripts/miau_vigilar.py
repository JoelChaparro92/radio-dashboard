import os
import time

def miau_auditoria_bootstrap():
    print("🐾 El Gato está revisando los nuevos cimientos... ¡Miau!")
    
    # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
    print("💤 Pausa de 5 segundos para que los archivos se asienten...")
    time.sleep(5)

    if os.path.exists("index.html"):
        with open("index.html", "r", encoding="utf-8") as f:
            codigo = f.read().lower()
            if "bootstrap" in codigo:
                print("✅ ¡Sintonía total! Veo las etiquetas de Bootstrap en el index.")
                print("🚀 La web de la radio está subiendo de nivel.")
            else:
                print("⚠️  El index cambió, pero no detecto Bootstrap. Revisá el chat de Aider.")
    
    # OTRA PAUSA DE SEGURIDAD
    print("\n💤 Pausa final de 5 segundos... ¡Miau!")
    time.sleep(5)

if __name__ == "__main__":
    miau_auditoria_bootstrap()