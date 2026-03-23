import os
import time

def miau_check_sincronia():
    print("🐾 El Gato está preparando el reporte de sincronía... ¡Miau!")
    
    # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
    print("💤 Pausa de 5 segundos para escanear archivos de la radio...")
    time.sleep(5)

    # Lista de archivos que DEBEN estar en tu Pendrive o Nube
    esenciales = [".env", "index.html", "monitor_carga.py", "instalar_aider.py"]
    
    print("\n📋 LISTA DE VERIFICACIÓN PARA CASA:")
    for item in esenciales:
        if os.path.exists(item):
            print(f"✅ [LISTO] {item}")
        else:
            print(f"❌ [FALTA] {item} (Asegúrate de crearlo antes de irte)")
        time.sleep(1) # Pausa corta entre líneas para lectura clara

    print("\n💡 NOTA DE SOPORTE: En tu casa, solo instala Python 3.12 y")
    print("volveremos a crear el .venv para que todo esté fresco.")

    # OTRA PAUSA DE SEGURIDAD
    print("\n💤 Pausa final de 5 segundos para estabilizar procesos... ¡Miau!")
    time.sleep(5)

if __name__ == "__main__":
    miau_check_sincronia()