import subprocess
import time
import os

def miau_esperar_a_que_termine():
    print("🐾 El Gato Vigilante está activo. Te avisaré cuando el CPU descanse... ¡Miau!")
    
    intentos = 0
    while True:
        try:
            # Consultamos la carga actual
            comando = "wmic cpu get loadpercentage"
            resultado = subprocess.check_output(comando, shell=True).decode()
            carga = int(resultado.replace("LoadPercentage", "").strip())
            
            print(f"📊 Carga actual: {carga}% - EasyOCR sigue trabajando...")
            
            # Si la carga baja del 20%, asumimos que terminó
            if carga < 20:
                print("\n🔔 ¡MIAU! ¡EL PROCESADOR ESTÁ LIBRE!")
                print("✅ Ya puedes proceder con la instalación de Python 3.12 y Aider.")
                break
            
            # RESPETANDO TIEMPOS DE PAUSA PARA NO ESTRESAR MÁS EL SISTEMA
            # Esperamos 30 segundos entre cada chequeo para ser ligeros
            time.sleep(30)
            
        except Exception:
            # Si hay un error por la saturación, esperamos un poco más
            time.sleep(10)

if __name__ == "__main__":
    miau_esperar_a_que_termine()