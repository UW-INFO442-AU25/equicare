// src/firebaseService.js
import { db } from "./firebase.js";
import { doc, collection, setDoc, getDoc, updateDoc, getDocs, arrayUnion } from "firebase/firestore";

// -------- Users --------
export async function createUser(userId, email, linkedCalendar) {
  await setDoc(doc(db, "users", userId), { email, linkedCalendar });
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
