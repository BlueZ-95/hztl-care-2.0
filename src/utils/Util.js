import Neon, { wallet, api } from "@cityofzion/neon-js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { createWalletEndpoint } from "./Const"

export const account = (userPvtKey) => new wallet.Account(userPvtKey);

export const contract = (scriptHash, rpcAddress, userPvtKey) =>
  new Neon.experimental.SmartContract(Neon.u.HexString.fromHex(scriptHash), {
    networkMagic: 4181071835,
    rpcAddress: rpcAddress,
    account: account(userPvtKey),
  });

export async function CreateWalletUsingUtil(userEmail) {
  const privateKey = wallet.generatePrivateKey();

  const docRef = doc(db, "users", userEmail);

  await updateDoc(docRef, {
    privateKey: privateKey,
  });

  console.log(userEmail);
  const myAccount = new wallet.Account(privateKey);

  const userName = userEmail.split("@")[0];

  const myWallet = Neon.create.wallet({ name: userName });
  myWallet.addAccount(myAccount);
  myWallet.encryptAll("").then((results) => {
    const walletString = myWallet.export();
    console.log(createWalletEndpoint);
    console.log(JSON.stringify(walletString));
    createWallet(walletString, userName);
  });
}

function createWallet(walletString, userName) {
  const requestOptions =  {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      content: walletString,
      filename: `${userName}.json`,
    }),
  }

  fetch(createWalletEndpoint, requestOptions)
  .then(() => {
    console.log("wallet created");
  });
}

export function mergeUniqueObjects(arr) {
  const mergedArray = [];
  // Create an object to store the merged objects
  const mergedObjects = {};

  for (let i = 0; i < arr.length; i++) {
    const campaignid = arr[i].campaignid || arr[i].campaignId;
    
    if (mergedObjects[campaignid]) {
      // If an object with the same campaignid already exists,
      // merge the properties of the existing object and the current object
      mergedObjects[campaignid] = Object.assign({}, mergedObjects[campaignid], arr[i]);
    } else {
      // If no object with the same campaignid exists, add the object to the merged objects object
      mergedObjects[campaignid] = arr[i];
    }
  }
  // Convert the merged objects object to an array and return it
  for (let campaignid in mergedObjects) {
    mergedArray.push(mergedObjects[campaignid]);
  }
  return mergedArray;
}