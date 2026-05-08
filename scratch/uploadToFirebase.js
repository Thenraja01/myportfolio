import { db } from "../src/firebase";
import { doc, setDoc } from "firebase/firestore";
import { user, project, skills } from "./data";
import { educationData } from "./educationdata";

const uploadData = async () => {
  try {
    await setDoc(doc(db, "portfolio", "data"), {
      user,
      project,
      skills,
      educationData
    });
    console.log("Data successfully uploaded to Firebase!");
  } catch (error) {
    console.error("Error uploading data:", error);
  }
};

uploadData();
