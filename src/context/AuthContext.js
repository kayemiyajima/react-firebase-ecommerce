import React, { useContext, useState, useEffect } from 'react'
import { auth, googleProvider, handleUserProfile } from './../firebase/utils'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    googleProvider.setCustomParameters({ prompt: 'select_account' });
    const signInWithGoole = () => {
        auth.signInWithPopup(googleProvider).then((res) => {
            console.log(res.user)
          }).catch((error) => {
            console.log(error.message)
          })
    };

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    // const updateEmail = (email) => {
    //     return currentUser.updateEmail(email)
    // }

    // const updatePassword = (password) => {
    //     return currentUser.updatePassword(password)
    // }

    useEffect(()=> {
        const subscribe = auth.onAuthStateChanged(async user => {
            if (user) {
                const userRef = await handleUserProfile(user);
                userRef.onSnapshot(snapshot => {
                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                })
            }
        })

        return subscribe;
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signInWithGoole,
        signup,
        login,
        logout,
        resetPassword,
        // updateEmail,
        // updatePassword
    }

    
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
