import {
    Timestamp,
    addDoc,
    collection,
    getDocs,
    deleteDoc,
    updateDoc,
    doc,
    getFirestore
} from "firebase/firestore";
import app from "../../firebaseConfig"; // Assuming this is where your Firebase config is

const db = getFirestore(app);
const bedtimesCollection = collection(db, "bedtimes"); // Reference to the "bedtimes" collection

/**
 * Adds a bedtime entry to Firestore
 * @param {Object} data - The bedtime data
 * @param {Date} data.date - The date for the bedtime
 * @param {Date} data.bedTime - The time for the bedtime
 * @param {boolean} data.doNotDisturb - Whether "Do Not Disturb" is enabled
 * @param {string} data.note - Additional notes about the bedtime
 */
async function addBedtime(data) {
    const dbData = {
        createdAt: Timestamp.now(),
        date: data.date instanceof Date ? Timestamp.fromDate(data.date) : null, // Convert to Timestamp
        bedTime: data.bedTime instanceof Date ? Timestamp.fromDate(data.bedTime) : null, // Convert to Timestamp
        doNotDisturb: data.doNotDisturb,
        note: data.note,
    };

    try {
        await addDoc(bedtimesCollection, dbData);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error; // Re-throw the error so it can be caught in the frontend
    }
}

/**
 * Fetches all bedtimes from Firestore
 * @returns {Promise<Array>} - An array of all bedtime entries
 */
async function getBedtimes() {
    try {
        const snapshot = await getDocs(bedtimesCollection);
        const bedtimes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return bedtimes; // Return an array of bedtimes with their IDs
    } catch (error) {
        console.error("Error fetching bedtimes: ", error);
        throw error; // Re-throw the error so it can be caught in the frontend
    }
}

/**
 * Deletes a bedtime entry from Firestore
 * @param {string} id - The ID of the bedtime entry to delete
 */
async function deleteBedtime(id) {
    try {
        const bedtimeDocRef = doc(db, "bedtimes", id); // Reference to the specific bedtime doc
        await deleteDoc(bedtimeDocRef); // Delete the document
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error; // Re-throw the error so it can be caught in the frontend
    }
}
async function updateBedtime(data) {
    const bedtimeDocRef = doc(db, "bedtimes", data.id);  // Reference to the specific document

    const updatedData = {
        date: Timestamp.fromDate(data.date),
        bedTime: Timestamp.fromDate(data.bedTime),
        doNotDisturb: data.doNotDisturb,
        note: data.note,
    };

    try {
        await updateDoc(bedtimeDocRef, updatedData);  // Update the document in Firestore
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
}
export { addBedtime, getBedtimes, deleteBedtime, updateBedtime };
