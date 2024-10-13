import {
    Timestamp,
    addDoc,
    collection,
    getFirestore,
} from "firebase/firestore";
import app from "../../firebaseConfig"; // Ensure the correct path to your firebaseConfig

const db = getFirestore(app);
const nutritionTipsCollection = collection(db, "nutritionTips"); // Collection name in Firestore

// Function to add nutrition tip
async function addNutritionTip(data) {
    const dbData = {
        createdAt: Timestamp.now(),
        title: data.title,
        description: data.description,
    };

    try {
        await addDoc(nutritionTipsCollection, dbData);
        console.log("Nutrition tip added successfully:", dbData);
    } catch (error) {
        console.error("Error adding nutrition tip: ", error);
    }
}

export { addNutritionTip };
