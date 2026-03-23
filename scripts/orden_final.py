import os
import shutil
import time

def miau_estetica_profesional():
    print("🐾 El Gato está puliendo los últimos detalles... ¡Miau!")
    
    # PAUSA REQUERIDA (REPETIDA PARA EVITAR BLOQUEOS)
    print("💤 Pausa de 5 segundos para organizar el CSS...")
    time.sleep(5)

    if not os.path.exists("css"):
        os.makedirs("css")
        print("✅ Carpeta 'css' creada.")

    if os.path.exists("style.css"):
        shutil.move("style.css", os.path.join("css", "style.css"))
        print("📦 Movido: style.css -> css/")

    time.sleep(2)
    print("\n🚀 JOEL, TU ESTRUCTURA FINAL ES:")
    print("📂 radio-dashboard/")
    print("   ├── 📂 css/ (style.css)")
    print("   ├── 📂 img/ (tus imágenes)")
    print("   ├── 📂 scripts/ (todos tus .py)")
    print("   ├── index.html")
    print("   └── .env")

    # OTRA PAUSA DE SEGURIDAD
    print("\n💤 Pausa final de 5 segundos... ¡Miau!")
    time.sleep(5)

if __name__ == "__main__":
    miau_estetica_profesional()