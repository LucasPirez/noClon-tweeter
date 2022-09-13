import { db } from "./client";
import { arrayUnion, arrayRemove } from "firebase/firestore";
const dataBase = db.collection("followers");

function findDocfollow(id) {
  return dataBase.where("user", "==", id).get();
}

export function following(users) {
  return findDocfollow(users.seguidor).then((d) => {
    if (d.size === 0) {
      return false;
    } else {
      const doc = d.docs[0];
      return doc.data().following.includes(users.seguir);
    }
  });
}

export async function follow(users) {
  try {
    const response = await findDocfollow(users.seguidor);
    if (response.size === 0) {
      dataBase.add({
        user: users.seguidor,
        following: [`${users.seguir}`],
      });
    } else {
      const id = response.docs[0].id;

      dataBase.doc(id).update({
        following: arrayUnion(users.seguir),
      });
    }
    const response2 = await findDocfollow(users.seguir);
    if (response2.size === 0) {
      dataBase.add({
        user: users.seguir,
        follower: [`${users.seguidor}`],
      });
    } else {
      const id = response2.docs[0].id;

      dataBase.doc(id).update({
        follower: arrayUnion(users.seguidor),
      });
    }
    return response2;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function unfollow(users) {
  try {
    const response = await findDocfollow(users.seguidor);
    const id = response.docs[0].id;

    dataBase.doc(id).update({
      following: arrayRemove(users.seguir),
    });

    const response2 = await findDocfollow(users.seguir);
    const id2 = response2.docs[0].id;

    dataBase.doc(id2).update({
      follower: arrayRemove(users.seguidor),
    });
    return;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function countFollows(user) {
  return findDocfollow(user).then((d) => {
    console.log(d);
    const data = d.docs[0].data();

    const countFollowers = data.follower ? data.follower.length : 0;
    const countFollowing = data.following ? data.following : 0;

    return {
      countFollowers,
      countFollowing: countFollowing.length,
      following: countFollowing,
    };
  });
}
