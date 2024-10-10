import {
    Timestamp,
    addDoc,
    collection,
    getFirestore,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot
} from "firebase/firestore";
import app from "../../firebaseConfig";

const db = getFirestore(app);
const symptomsCollection = collection(db, "symptoms");

export async function addSymptom(data) {
    const dbData = {
        createdAt: Timestamp.now(),
        date: data.date,
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

export function fetchAllSymptoms(callback) { // Modify to accept a callback
    const unsubscribe = onSnapshot(symptomsCollection, (snapshot) => {
        const symptomsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        callback(symptomsList); // Use the callback to update the state
    });

    return unsubscribe; // Return unsubscribe function to stop listening
}

export async function deleteSymptom(id) {
    const symptomDoc = doc(symptomsCollection, id);

    try {
        await deleteDoc(symptomDoc);
        console.log(`Symptom with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting symptom: ", error);
    }
}



