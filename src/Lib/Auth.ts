import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db, googleAuthProvider } from "./Firebase"
import { UsersDB } from "./Models/Users"
import { userStore } from "./State"

//----------------------------------------------------------------------------------------------

export function initAuthListener() {
   onAuthStateChanged(auth, async (user) => {
      if (!user) {
         userStore.set(null)
         return
      }
      userStore.merge({
         id: user.uid,
         dp: user.photoURL ?? "",
      })

      // Check if user is already in the database or not, if not create it.
      {
         const exists = (await getDoc(doc(db, UsersDB.collection, user.uid))).exists()
         if (!exists) {
            await UsersDB.Create({
               id: user.uid,
               name: user.displayName ?? "",
               email: user.email ?? "",
               dp: user.photoURL ?? "",
            })
         }
      }

      UsersDB.Unlisten(user.uid)
      UsersDB.Listen(user.uid, (user) => {
         if (!auth.currentUser) return
         userStore.set(user)
      })
   })
}

//----------------------------------------------------------------------------------------------

export async function logout() {
   await signOut(auth)
}

//----------------------------------------------------------------------------------------------

export async function authWithGoogle() {
   if (auth.currentUser) return
   await signInWithPopup(auth, googleAuthProvider)
}

//----------------------------------------------------------------------------------------------
