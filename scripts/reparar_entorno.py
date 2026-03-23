import os
import time
import subprocess

def miau_reparacion_total():
    print("🐾 El Gato está demoliendo el entorno viejo... ¡Miau!")
    
    # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
    print("💤 Pausa de 5 segundos para cerrar conexiones de archivos...")
    time.sleep(5)

    print("🐱 Joel, seguí estos pasos manuales en la terminal para limpiar todo:")
    print("1. Escribí: deactivate")
    print("2. Escribí: rm -r .venv")
    
    time.sleep(2)
    
    print("\n🚀 Luego, creá el entorno nuevo forzando la versión 3.12:")
    print("3. Escribí: py -3.12 -m venv .venv")
    print("4. Escribí: .\\.venv\\Scripts\\Activate.ps1")

    # OTRA PAUSA DE SEGURIDAD
    print("\n💤 Pausa final de 5 segundos para que anotes los comandos... ¡Miau!")
    time.sleep(5)

if __name__ == "__main__":
    miau_reparacion_total()