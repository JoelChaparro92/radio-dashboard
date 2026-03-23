import time
import os

def miau_instrucciones_aider():
    print("🐾 El Gato está preparando el manual de vuelo... ¡Miau!")
    
    # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
    print("💤 Pausa de 5 segundos para que la instalación se asiente...")
    time.sleep(5)

    print("\n🚀 ¡ESTAMOS LISTOS, JOEL!")
    print("Para empezar a programar la web de la radio, pegá este comando:")
    print("-" * 60)
    print("aider --model gemini/gemini-1.5-pro")
    print("-" * 60)
    
    time.sleep(2)
    
    print("\n💡 CONSEJO DE SINTONÍA:")
    print("Cuando Aider te pregunte algo, recordale que sos Joel y que")
    print("el proyecto es para la radio online 'Vyrorei al fallo'.")
    print("También recordale que use Bootstrap para que se vea moderno.")

    # OTRA PAUSA DE SEGURIDAD
    print("\n💤 Pausa final de 5 segundos para cerrar el manual... ¡Miau!")
    time.sleep(5)

if __name__ == "__main__":
    miau_instrucciones_aider()