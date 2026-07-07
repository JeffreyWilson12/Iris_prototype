import cv2
import numpy as np
from insightface.app import FaceAnalysis
import sqlite3

app = FaceAnalysis(name='buffalo_l')
app.prepare(ctx_id=-1)


def load_known_faces():
    conn = sqlite3.connect("Registeration.db")
    c = conn.cursor()
    c.execute("SELECT name, embedding FROM students")
    rows = c.fetchall()
    conn.close()

    known = []
    for name, emb_bytes in rows:
        emb = np.frombuffer(emb_bytes, dtype=np.float32)
        known.append((name, emb))
    return known


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def identify_face(embedding, known_faces, threshold=0.45):
    best_name = "Unknown"
    best_score = -1

    for name, known_emb in known_faces:
        score = cosine_similarity(embedding, known_emb)
        if score > best_score:
            best_score = score
            best_name = name

    if best_score < threshold:
        return "Unknown", best_score
    return best_name, best_score


def recognize():
    known_faces = load_known_faces()
    print(f"Loaded {len(known_faces)} known face(s)")

    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        faces = app.get(frame)
        for face in faces:
            bbox = face.bbox.astype(int)
            name, score = identify_face(face.embedding, known_faces)

            color = (0, 255, 0) if name != "Unknown" else (0, 0, 255)
            cv2.rectangle(frame, (bbox[0], bbox[1]), (bbox[2], bbox[3]), color, 2)
            cv2.putText(frame, f"{name} ({score:.2f})", (bbox[0], bbox[1] - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, color, 2)

        cv2.imshow("Live Recognition", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


recognize()