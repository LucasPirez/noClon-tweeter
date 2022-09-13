import { db } from "./client";
import { arrayUnion } from "firebase/firestore";

export const AddChats = ({ usuarios, usernames }) => {
  return db
    .collection("chats")
    .add({ usuarios, usernames, noRead: "" })
    .then((data) => {
      return data.id;
    });
};

export const deleteChat = (id) => {
  return db.collection("chats").doc(id).delete();
};

export const getAllChats = (user) => {
  return db
    .collection("chats")
    .where("usuarios", "array-contains-any", [`${user}`])
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();

        const id = doc.id;

        return {
          ...data,
          id,
        };
      });
    });
};

export function updateChat(id, message) {
  const m = message.messages.usuario1;
  return db
    .collection("chats")
    .doc(id)
    .update({
      messages: arrayUnion(message.messages),
      noRead: m,
    });
}

export function messageRead(id, userUid) {
  const doc = db.collection("chats").doc(id);

  return doc.get().then((data) => {
    console.log(userUid);
    const r = data.data().noRead;

    if (userUid !== r) {
      doc.update({
        noRead: "",
      });
    }
  });
}

export const getChatMessage = (id, newChats) => {
  return db
    .collection("chats")
    .doc(id)
    .onSnapshot((snapshot) => {
      return newChats(snapshot.data());
    });
};

export function getSnaptsChats(user, snap) {
  return db
    .collection("chats")
    .where("usuarios", "array-contains-any", [`${user}`])
    .onSnapshot((snapshot) => {
      const arrSnap = [];
      console.log("clientChat");
      snapshot.forEach((u) => {
        if (u.data().messages) {
          const last = u.data().messages.length;
          if (u.data().messages[last - 1].usuario1 !== user) {
            arrSnap.push({
              lastMessage: u.data().messages[last - 1].messages,
              messageUser: u.data().usuarios.filter((u) => u !== user)[0],
              noRead: u.data().noRead,
            });
          }
        }
      });
      return snap(arrSnap);
    });
}
