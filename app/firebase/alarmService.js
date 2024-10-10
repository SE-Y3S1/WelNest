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
import app from "../../firebaseConfig"; // Ensure this points to your Firebase configuration

const db = getFirestore(app);
const alarmsCollection = collection(db, "alarms"); // Reference to the "alarms" collection

/**
 * Adds an alarm entry to Firestore
 * @param {Object} data - The alarm data
 * @param {Date} data.date - The date for the alarm
 * @param {Date} data.time - The time for the alarm
 * @param {boolean} data.enabled - Whether the alarm is enabled
 * @param {boolean} data.vibrate - Whether the alarm should vibrate
 * @param {string} data.repeat - The repeat frequency of the alarm
 * @param {string} data.name - The name of the alarm
 */
async function addAlarm(data) {
    const dbData = {
        createdAt: Timestamp.now(),
        date: data.date instanceof Date ? Timestamp.fromDate(data.date) : null, // Convert to Timestamp
        time: data.time instanceof Date ? Timestamp.fromDate(data.time) : null, // Convert to Timestamp
        enabled: data.enabled,
        vibrate: data.vibrate,
        repeat: data.repeat,
        name: data.name,
    };

    try {
        await addDoc(alarmsCollection, dbData);
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error; // Re-throw the error so it can be caught in the frontend
    }
}

/**
 * Fetches all alarms from Firestore
 * @returns {Promise<Array>} - An array of all alarm entries
 */
async function getAlarms() {
    try {
        const snapshot = await getDocs(alarmsCollection);
        const alarms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return alarms; // Return an array of alarms with their IDs
    } catch (error) {
        console.error("Error fetching alarms: ", error);
        throw error; // Re-throw the error so it can be caught in the frontend
    }
}

/**
 * Deletes an alarm entry from Firestore
 * @param {string} id - The ID of the alarm entry to delete
 */
async function deleteAlarm(id) {
    try {
        const alarmDocRef = doc(db, "alarms", id); // Reference to the specific alarm doc
        await deleteDoc(alarmDocRef); // Delete the document
    } catch (error) {
        console.error("Error deleting document: ", error);
        throw error; // Re-throw the error so it can be caught in the frontend
    }
}

/**
 * Updates an alarm entry in Firestore
 * @param {Object} data - The updated alarm data
 * @param {string} data.id - The ID of the alarm entry to update
 * @param {Date} data.date - The new date for the alarm
 * @param {Date} data.time - The new time for the alarm
 * @param {boolean} data.enabled - The new enabled status
 * @param {boolean} data.vibrate - The new vibration status
 * @param {string} data.repeat - The new repeat frequency
 * @param {string} data.name - The new name for the alarm
 */
async function updateAlarm(data) {
    const alarmDocRef = doc(db, "alarms", data.id); // Reference to the specific document

    const updatedData = {
        date: data.date instanceof Date ? Timestamp.fromDate(data.date) : null,
        time: data.time instanceof Date ? Timestamp.fromDate(data.time) : null,
        enabled: enabled !== undefined ? enabled : false, // Default to false if undefined
        vibrate: vibrate !== undefined ? vibrate : false, // Default to false if undefined
        repeat: repeat || '', // Default to empty string if undefined
        name: data.name,
    };

    try {
        await updateDoc(alarmDocRef, updatedData); // Update the document in Firestore
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error;
    }
}

export { addAlarm, getAlarms, deleteAlarm, updateAlarm };
