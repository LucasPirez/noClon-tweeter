import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDyiVhLhxKDpyJ0yOwheleXzn7Y_NL0QmA",
  authDomain: "mynext-app.firebaseapp.com",
  projectId: "mynext-app",
  storageBucket: "mynext-app.appspot.com",
  messagingSenderId: "4838757157",
  appId: "1:4838757157:web:b5556550d10ca6a60f00cc",
  measurementId: "G-K2G1856JBY",
};

!firebase.apps.lenght && firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
// const storage = getStorage(firebaseApp);

const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid, refreshToken } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
    refreshToken,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const loginWithGoogle = () => {
  const githubProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const singOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((data) => {
      console.log(data);
    });
};
export const addMessage = ({ avatar, content, img, userId, username }) => {
  return db.collection("tweets").add({
    avatar,
    content,
    img,
    userId,
    username,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: [],
    sharedCount: 0,
  });
};

export const addComment = (id, { avatar, content, userComment, useID }) => {
  const refTweets = db.collection("tweets").doc(id);
  return db.collection("comments").add({
    avatar,
    content,
    tweet: refTweets,
    userComment,
    useID,
    created: firebase.firestore.Timestamp.fromDate(new Date()),
  });
};

export const modifiedMessage = ({ content, identificador }) => {
  return db.collection("tweets").doc(identificador).update({
    content,
  });
};
export const deleteMessage = (identificador) => {
  return db.collection("tweets").doc(identificador).delete();
};

const mapTweetsFromFirebase = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  };
};

export const listenLatestTweet = (limit, handleNewTweets) => {
  const data = limit;
  return db
    .collection("tweets")
    .orderBy("createdAt", "desc")
    .limit(data)
    .onSnapshot(({ docs }) => {
      const newTweets = docs.map(mapTweetsFromFirebase);
      handleNewTweets(newTweets);
    });
};

export const listenLastComment = (id, handleNewComments) => {
  const refTweets = db.collection("tweets").doc(id);
  return db
    .collection("comments")
    .where("tweet", "==", refTweets)
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newTweets = docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;

        return {
          ...data,
          id,
        };
      });

      handleNewComments(newTweets);
    });
};

export const getMessage = (user, parameter, limit) => {
  return db
    .collection("tweets")
    .where("userId", parameter, user)
    .limit(limit)
    .get()
    .then(({ docs }) => {
      const order = docs.sort((a, b) => {
        return b.data().createdAt.seconds - a.data().createdAt.seconds;
      });
      return order.map(mapTweetsFromFirebase);
    });
};

export const getFollowTweets = (user) => {};

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  const task = ref.put(file);
  return task;
};

export async function likes(id, idUser) {
  const data = doc(db, "tweets", id);
  await updateDoc(data, {
    likesCount: arrayUnion(`${idUser}`),
  });
}

export async function unLikes(id, idUser) {
  const data = doc(db, "tweets", id);
  await updateDoc(data, {
    likesCount: arrayRemove(`${idUser}`),
  });
}

export const getTweet = (id) => {
  return db.collection("tweets").doc(id).get();
};

export const getLikeUser = (user) => {
  return db
    .collection("tweets")
    .where("likesCount", "array-contains", user)
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();

        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};
