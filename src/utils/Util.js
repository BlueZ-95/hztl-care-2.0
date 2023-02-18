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
