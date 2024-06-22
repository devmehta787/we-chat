import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uid) => {
        console.log("uid in userStore: ", uid)
        if (!uid) return set({ currentUser: null, isLoading: false });

        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);
            console.log(docRef);
            console.log(docSnap);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                // currentUser = docSnap.data();
                set({ currentUser: docSnap.data(), isLoading: false });
            } else {
                set({ currentUser: null, isLoading: false });
            }
            // console.log("currentUser: ", currentUser);
        } catch (err) {
            console.log("ERROR: ",err);
            return set({ currentUser: null, isLoading: false });
        } finally {
            
            console.log("currentUser: ", currentUser);
        }
    },
}));
