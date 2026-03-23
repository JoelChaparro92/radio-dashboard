import time
import sys
import subprocess

def miau_espera_segura():
    print("🐾 ¡Miau! Preparando la instalación de Aider...")
    print("⚠️  AVISO: Si EasyOCR sigue corriendo, este proceso irá lento.")
    
    # PAUSA INICIAL DE SEGURIDAD PARA EL USUARIO
    print("💤 Pausa de 10 segundos para que verifiques si EasyOCR terminó...")
    time.sleep(10) 

    try:
        print("🐱 Verificando versión de Python actual...")
        print(f"Versión: {sys.version}")
        
        # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
        print("💤 Pausa de 5 segundos para no saturar el sistema...")
        time.sleep(5)
        
        print("✅ Script listo para ejecutar cuando EasyOCR termine.")

    except Exception as e:
        print(f"😿 Error en el diagnóstico: {e}")

if __name__ == "__main__":
    miau_espera_segura()