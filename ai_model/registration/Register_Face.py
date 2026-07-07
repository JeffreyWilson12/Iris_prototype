import cv2
import numpy as np
from insightface.app import FaceAnalysis
import sqlite3

app = FaceAnalysis(name='buffalo_l')
app.prepare(ctx_id=-1)

def register_face(name):
    cap = cv2.VideoCapture(0)
    print(f"Registering {name} — press S to capture")
    
    while True:
        ret, frame = cap.read()
        faces = app.get(frame)
        
        for face in faces:
            bbox = face.bbox.astype(int)
            cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), (0,255,0), 2)
        
        cv2.imshow("Register", frame)
        key = cv2.waitKey(1) & 0xFF
        
        if key == ord('s') and len(faces) > 0:
            embedding = faces[0].embedding  # 512-d vector 
            save_to_db(name, embedding)
            print(f"Saved {name}")
            break
        elif key == ord('q'):
            break
    
    cap.release()
    cv2.destroyAllWindows()

def save_to_db(name, embedding):
    conn = sqlite3.connect("Registeration.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS students
                 (id INTEGER PRIMARY KEY, name TEXT, embedding BLOB)''')
    c.execute("INSERT INTO students (name, embedding) VALUES (?, ?)",
              (name, embedding.tobytes()))
    conn.commit()
    conn.close()

register_face("Aditya")  # change name each time