import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { isKnownPlatform } from "@/lib/suggestions";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req: Request) {
  const { value, type } = await req.json();

  if (!value || typeof value !== "string" || !type) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const trimmed = value.trim();

  if (type === "platform" && isKnownPlatform(trimmed)) {
    return NextResponse.json({ skipped: true });
  }

  const suggestionsRef = collection(db, "suggestions");

  // Check if this exact value already exists
  const existing = await getDocs(
    query(
      suggestionsRef,
      where("type", "==", type),
      where("value", "==", trimmed),
    ),
  );

  if (!existing.empty) {
    // Already exists — just increment the count
    await updateDoc(existing.docs[0].ref, {
      count: increment(1),
    });
  } else {
    // New suggestion — create a fresh document
    await addDoc(suggestionsRef, {
      type,
      value: trimmed,
      count: 1,
      createdAt: serverTimestamp(),
    });
  }

  return NextResponse.json({ ok: true });
}
