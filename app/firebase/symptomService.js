import {
    Timestamp,
    addDoc,
    collection,
    getFirestore,
} from "firebase/firestore";
import app from "../../firebaseConfig";

const db = getFirestore(app);
const symptomsCollection = collection(db, "symptoms");

async function addSymptom(data) {
    const dbData = {
        createdAt: Timestamp.now(),
        date: data.date instanceof Date ? Timestamp.fromDate(data.date) : null, // Convert to Timestamp
        symptom: data.symptom,
        time: data.time,
        severity: data.severity,
        note: data.note,
    };

    try {
        await addDoc(symptomsCollection, dbData);
    } catch (error) {
        console.error("Error adding document: ", error);
    }

}
export { addSymptom };