import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database"
import { getFirestore } from "firebase/firestore"
import { getFunctions } from "firebase/functions"
import { getStorage } from "firebase/storage"
import { firebaseConfig } from "./Credentials"

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(app)
export const realtimeDB = getDatabase(app)
export const storage = getStorage(app)
export const functions = getFunctions(app)
export const googleAuthProvider = new GoogleAuthProvider()

if (location.hostname === "127.0.0.1") {
	// connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true })
	// connectFirestoreEmulator(db, "localhost", 8080)
	// connectDatabaseEmulator(realtimeDB, "localhost", 9000)
	// connectStorageEmulator(storage, "localhost", 9199)
	// connectFunctionsEmulator(functions, "localhost", 5001)
}

export namespace FirebaseFn {
	// export const createCompany = httpsCallable(functions, "createCompany")
}
