import {
    Timestamp,
    addDoc,
    collection,
    getFirestore,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot
} from "firebase/firestore";
import app from "../../firebaseConfig";

const db = getFirestore(app);
const symptomsCollection = collection(db, "symptoms");

//create
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


//read
export function fetchAllSymptoms(callback) { 
    const unsubscribe = onSnapshot(symptomsCollection, (snapshot) => {
        const symptomsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        callback(symptomsList); 
    });

    return unsubscribe; 
}

//delete
export async function deleteSymptom(id) {
    const symptomDoc = doc(symptomsCollection, id);

    try {
        await deleteDoc(symptomDoc);
        console.log(`Symptom with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting symptom: ", error);
    }
}

//update
export async function updateSymptom(id, updatedData) {
    const symptomDoc = doc(symptomsCollection, id);

    const updatedFields = {
        ...updatedData,
        updatedAt: Timestamp.now(),
    };

    try {
        await updateDoc(symptomDoc, updatedFields);
        
    } catch (error) {
        console.error("Error updating symptom: ", error);
    }
}

// Fetch symptoms from the database based on a specific date
export function fetchSymptomsByDate(date, callback) {
    const unsubscribe = onSnapshot(symptomsCollection, (snapshot) => {
        const symptomsList = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        const filteredSymptoms = symptomsList.filter(symptom => {
            if (symptom.date) {
                const [day, month, year] = symptom.date.split('/');
                const formattedDate = `${year}-${month}-${day}`;

                return formattedDate === date; 
            }
            return false;
        });

        callback(filteredSymptoms);
    });

    return unsubscribe;
}



