import {
    Timestamp,
    addDoc,
    collection,
    getFirestore,
} from "firebase/firestore";
import app from "../../firebaseConfig"; // Ensure the correct path to your firebaseConfig

const db = getFirestore(app);
const mealPlansCollection = collection(db, "mealPlans"); // Collection name in Firestore

// Function to add meal plan
async function addMealPlan(data) {
    const dbData = {
        createdAt: Timestamp.now(),
        day: data.day,
        mealType: data.mealType,
        items: data.items,
        quantity: data.quantity,
    };

    try {
        await addDoc(mealPlansCollection, dbData);
        console.log("Meal plan added successfully:", dbData);
    } catch (error) {
        console.error("Error adding Meal: ", error);
    }
}

export { addMealPlan };
