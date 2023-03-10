import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ComponentProps } from 'lib/component-props';
import firebase, { db, firebaseAuth } from 'src/firebase/firebase';
import { TransferAssetFromUtil } from '../utils/UtilTransferAsset';
import { TransferGasAssetFromUtil } from '../utils/UTilTransferGas';
import { CreateWalletUsingUtil } from '../utils/Util';
import { doc, getDoc } from 'firebase/firestore';
import { masterWallet, rpcAddress } from 'src/utils/Const';
import { CONST, rpc, sc, wallet, tx, u } from '@cityofzion/neon-core';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [user, loading, error] = useAuthState(firebaseAuth);

  const [neoBalance, setNeoBalance] = useState(null);
  const MySwal = withReactContent(Swal)


  const router = useRouter();

  const createWallet = () => {
    // await fetchUserDetails();
    CreateWalletUsingUtil(user.email);
    MySwal.fire({
      title: <p>Wallet created successfully</p>,
      icon: 'success'
      
    })
  };

  const [showModal, setShowModal] = useState(false)
  if (showModal == true) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const addMoney = async () => {
    const docRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      const userData = docSnap.data();
      TransferAssetFromUtil(masterWallet, userData.privateKey, 5000);
      TransferGasAssetFromUtil(masterWallet, userData.privateKey, 1000);
      MySwal.fire({
        title: <p>Amount added successfully</p>,
        icon: 'success'
        
      })
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  
  };

  const logout = () => {
signOut(firebaseAuth).then(() => {
  // Sign-out successful.
  router.push('/')
}).catch((error) => {
  // An error happened.
});
  }

  async function GetNeoBalance(){
    if(user) {

    const docRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      const userData = docSnap.data();
      const a = new wallet.Account(userData.privateKey);
    const rpcClient = new rpc.RPCClient(rpcAddress);
    rpcClient.getNep17Balances(a.address).then(response => {
      console.log(response);

      response.balance.length > 0 && setNeoBalance(response.balance[1].amount)
    });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }
  }

  useEffect(() => {
    GetNeoBalance()

  }, [user]);

  return (
    <header>
      <div className="bg-theme-bg-1">
        <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <div className="relative flex grid items-center grid-cols-2 lg:grid-cols-3">
            <ul className="flex items-center hidden space-x-8 lg:flex">
              <li>
                <a
                  href="/"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium tracking-wide text-gray-dark transition-colors duration-200 hover:theme-01"
                >
                  Campaigns
                </a>
              </li>
              <li>
                <a
                  href="/"
                  aria-label="Our product"
                  title="Our product"
                  className="font-medium text-gray-dark tracking-wide transition-colors duration-200 hover:theme-01"
                >
                  Aboutus
                </a>
              </li>
              <li>
                <a
                  href="/"
                  aria-label="Product pricing"
                  title="Product pricing"
                  className="font-medium tracking-wide text-gray-dark transition-colors duration-200 hover:theme-01"
                >
                  Contactus
                </a>
              </li>
            </ul>
            <a
              href="/"
              aria-label="Company"
              title="Company"
              className="inline-flex items-center lg:mx-auto"
            >
              <Image
                priority
                src="/hcare-logo.svg"
                height={120}
                width={120}
                alt="Horizontal Care"
              />

              <span className="ml-2 text-xl font-bold tracking-wide text-theme-01 uppercase hidden">
                Horizontal Care
              </span>
            </a>
            <ul className="flex items-center hidden ml-auto space-x-8 lg:flex">
              {!user ?
              <>
              <li>
                <a
                  href="/login"
                  aria-label="Sign in"
                  title="Sign in"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                >
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Sign up
                </a>
              </li>
              </>
              :
              <>
              {neoBalance && <p>Neo Balance: {neoBalance}</p>}
              {!neoBalance && <button onClick={createWallet}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                  >Create Wallet</button>
              }
              
              <button onClick={addMoney}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                  >Add Money</button>
                  <li>
                <a
                  href="/createcampaign"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                  aria-label="create"
                  title="create"
                >
                  Create
                </a>
              </li>
                  <button onClick={logout}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                  >Sign out</button>
              </>
              }
            </ul>
            <div className="ml-auto lg:hidden">
              <button
                aria-label="Open Menu"
                title="Open Menu"
                className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                onClick={() => setIsMenuOpen(true)}
              >
                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                  />
                  <path
                    fill="currentColor"
                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="p-5 bg-white border rounded shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <a
                          href="/"
                          aria-label="Company"
                          title="Company"
                          className="inline-flex items-center"
                        >
                          <Image
                            priority
                            src="horizontal-care.svg"
                            height={32}
                            width={32}
                            alt="Horizontal Care"
                          />
                          <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
                            Horizontal Care
                          </span>
                        </a>
                      </div>
                      <div>
                        <button
                          aria-label="Close Menu"
                          title="Close Menu"
                          className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <nav>
                      <ul className="space-y-4">
                        <li>
                          <a
                            href="/"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-dark transition-colors duration-200 hover:theme-01"
                          >
                            Link 1
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            aria-label="Our product"
                            title="Our product"
                            className="font-medium tracking-wide text-gray-dark transition-colors duration-200 hover:theme-01"
                          >
                            Link 2
                          </a>
                        </li>
                        <li>
                          <a
                            href="/"
                            aria-label="Product pricing"
                            title="Product pricing"
                            className="font-medium tracking-wide text-gray-dark transition-colors duration-200 hover:theme-01"
                          >
                            Link 3
                          </a>
                        </li>
                        {!user && (
                          <>
                            <li>
                              <a
                                href="/"
                                aria-label="Sign in"
                                title="Sign in"
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                              >
                                Sign in
                              </a>
                            </li>
                            <li>
                              <a
                                href="/"
                                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
                                aria-label="Sign up"
                                title="Sign up"
                              >
                                Sign up
                              </a>
                            </li>
                          </>
                        )}
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
