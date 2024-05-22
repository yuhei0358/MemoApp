import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: "AIzaSyDyWXRBavY2R_TNvHSzz08FEiHi1E3DfVM",
    authDomain: "memoapp-e8302.firebaseapp.com",
    projectId: "memoapp-e8302",
    storageBucket: "memoapp-e8302.appspot.com",
    messagingSenderId: "914038536270",
    appId: "1:914038536270:web:64744b93c8b49036572b1f"
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  })
  const db =getFirestore(app)

  export { app, auth, db }
