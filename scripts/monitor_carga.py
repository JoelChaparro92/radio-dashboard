import os
import time
import subprocess

def miau_monitor_infraestructura():
    print("🐾 Iniciando monitoreo de recursos del sistema... ¡Miau!")
    
    try:
        # Usamos el comando nativo de Windows (WMIC) para ver la carga del CPU
        # Esto no requiere instalar librerías extras
        print("🐱 Consultando carga del procesador (CPU)...")
        
        # Ejecutamos el comando de sistema
        comando = "wmic cpu get loadpercentage"
        resultado = subprocess.check_output(comando, shell=True).decode()
        
        # Limpiamos el texto para mostrar solo el número
        carga = resultado.replace("LoadPercentage", "").strip()
        
        print(f"📊 La carga actual de tu CPU es del: {carga}%")
        
        if int(carga) > 80:
            print("😿 ¡Miau! El procesador está muy estresado por EasyOCR.")
            print("⚠️  RECOMENDACIÓN: No instales Aider todavía.")
        else:
            print("✅ El procesador tiene espacio para trabajar.")
            
        # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
        print("💤 Pausa de seguridad de 5 segundos para que el sistema respire...")
        time.sleep(5)

    except Exception as e:
        print(f"😿 No pude obtener la carga exacta: {e}")
        print("💡 Prueba ejecutando 'top' o mira el Administrador de Tareas.")

    print("✅ Monitoreo finalizado. ¡Miau!")

if __name__ == "__main__":
    miau_monitor_infraestructura()