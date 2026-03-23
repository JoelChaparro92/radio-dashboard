import sys
import time

def miau_auditoria_python():
    print("🐾 El Gato Auditor está revisando los binarios... ¡Miau!")
    
    # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
    print("💤 Pausa de 5 segundos para consultar al sistema operativo...")
    time.sleep(5)

    # Obtenemos la versión actual
    version_actual = sys.version.split()[0]
    
    print(f"\n🔍 RESULTADO DE LA AUDITORÍA:")
    print(f"Versión detectada: {version_actual}")

    if version_actual.startswith("3.12"):
        print("✅ ¡Miau! Estás en la versión 3.12. Es perfecta para Aider.")
    else:
        print(f"⚠️  Cuidado, parece que todavía estás en {version_actual}.")
        print("💡 CONSEJO: Si ya instalaste la 3.12, reinicia VS Code.")

    # OTRA PAUSA DE SEGURIDAD
    print("\n💤 Pausa final de 5 segundos... ¡Miau!")
    time.sleep(5)

if __name__ == "__main__":
    miau_auditoria_python()