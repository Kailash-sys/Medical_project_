import subprocess
import sys
import time
import os
import signal

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend", "Medical_project_")
    frontend_dir = os.path.join(base_dir, "frontend", "medscan-ai")

    print("Starting MediScan AI Application...")

    # Start Backend
    print(f"Starting backend from {backend_dir}...")
    backend_python = os.path.join(backend_dir, "venv", "bin", "python3")
    
    # Fallback to system python if venv not found
    if not os.path.exists(backend_python):
        backend_python = sys.executable
        
    backend_process = subprocess.Popen(
        [backend_python, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"],
        cwd=backend_dir
    )

    # Start Frontend
    print(f"Starting frontend from {frontend_dir}...")
    frontend_process = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd=frontend_dir
    )

    def signal_handler(sig, frame):
        print("\nShutting down MediScan AI...")
        backend_process.terminate()
        frontend_process.terminate()
        backend_process.wait()
        frontend_process.wait()
        print("Shutdown complete.")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)
    signal.signal(signal.SIGTERM, signal_handler)

    try:
        # Keep the main thread alive
        while True:
            time.sleep(1)
            # Check if any process died unexpectedly
            if backend_process.poll() is not None:
                print("Backend process exited unexpectedly.")
                break
            if frontend_process.poll() is not None:
                print("Frontend process exited unexpectedly.")
                break
    except KeyboardInterrupt:
        pass
    finally:
        print("\nShutting down MediScan AI...")
        backend_process.terminate()
        frontend_process.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
