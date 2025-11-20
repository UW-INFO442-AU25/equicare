// src/firebaseService.js
import { db } from "./firebase.js";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// -------- Users --------
export async function saveUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  const existing = await getDoc(userRef);

  // If user document already exists, DO NOT overwrite it
  if (existing.exists()) {
    return;
  }

  // If new user → create default document
  await setDoc(userRef, {
    email: user.email,
    linkedCalendar: null,

    profileData: {
      name: "Jane Doe",
      location: "Seattle, WA",
      term: "Second Trimester (Week 18)",
      nextEvent: "None yet",
      partner: "Not connected",
    },

    relationshipData: {
      relationshipStatus: "",
      anniversaryDate: "",
      notes: ""
    },

    partnerInvites: [],
    notifications: []
  });
}

export async function addJournalEntry(userId, date, text) {
  await setDoc(doc(db, "users", userId, "journals", date), { text });
}

// -------- Calendars --------
export async function createCalendar(calendarId, events = []) {
  await setDoc(doc(db, "calendars", calendarId), { events });
}

export async function addCalendarEvent(calendarId, event) {
  const calendarRef = doc(db, "calendars", calendarId);
  await updateDoc(calendarRef, { events: arrayUnion(event) });
}
