import { db } from '../firebase-config';
import { collection, getDocs, getDoc, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';

const userCollectionRef = collection(db, "users");
console.log(userCollectionRef);


class UserDataService {
    addUser = (newUser) => {
        const docRef = doc(db, "users", newUser.email);
        return setDoc(docRef, newUser);
    }

    updateUser = (id, updatedUser) => {
        const userDoc = doc(db, "users", id);
        return updateDoc(userDoc, updatedUser);
    }

    deleteUser = (id) => {
        const userDoc = doc(db, "users", id);

        return deleteDoc(userDoc, id);
    }

    getAllUsers = () => {
        return getDocs(userCollectionRef);
    }

    getUser = (id) => {
        const userDoc = doc(db, "users", id);
        return getDoc(userDoc);
    }

}

export default new UserDataService();