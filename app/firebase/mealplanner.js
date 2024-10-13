// src/firebase/mealplanner.js

import {
    Timestamp,
    addDoc,
    collection,
    getFirestore,
    updateDoc,
    doc,
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

// Function to update meal plan
async function updateMealPlan(id, updatedData) {
    const mealDocRef = doc(db, 'mealPlans', id); // Reference to the document to update

    try {
        await updateDoc(mealDocRef, {
            day: updatedData.day,
            mealType: updatedData.mealType,
            items: updatedData.items,
            quantity: updatedData.quantity,
        });
        console.log("Meal plan updated successfully:", updatedData);
    } catch (error) {
        console.error("Error updating Meal: ", error);
    }
}

export { addMealPlan, updateMealPlan };
