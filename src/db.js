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

// -------- Quizzes --------
export async function createQuiz(calendarId, userResponses = {}, commonAnswers = {}) {
  await setDoc(doc(db, "quizzes", calendarId), { userResponses, commonAnswers });
}

export async function updateUserQuizResponse(calendarId, userId, responses) {
  const quizRef = doc(db, "quizzes", calendarId);
  await updateDoc(quizRef, { [`userResponses.${userId}`]: responses });
}

export async function updateCommonAnswers(calendarId, commonAnswers) {
  const quizRef = doc(db, "quizzes", calendarId);
  await updateDoc(quizRef, { commonAnswers });
}
