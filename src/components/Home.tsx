import Image from 'next/image';

import { CONST, rpc, sc, wallet, tx, u } from '@cityofzion/neon-core';
import { rpcAddress, scriptHash, userPvtKey } from 'src/utils/Const';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { mergeUniqueObjects } from 'src/utils/Util';
import { doc, getDoc } from 'firebase/firestore';
import { db, firebaseAuth } from 'src/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [user, loading, error] = useAuthState(firebaseAuth);

  const router = useRouter();

  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    if (user) {
      const docRef = doc(db, 'users', user?.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const userData = docSnap.data();
        setUserData(userData);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    }
  };

  useEffect(() => {
    readBlockChainData();
    getUserData();
  }, [user]);

  function readBlockChainData() {
    const sb = new sc.ScriptBuilder();
    const rpcClient = new rpc.RPCClient(rpcAddress);
    const account = new wallet.Account(userPvtKey);

    sb.emitAppCall(scriptHash, 'getCampaignData', ['campaigns']);
    console.log(account.scriptHash);
    rpcClient
      .invokeScript(u.HexString.fromHex(sb.str), [
        {
          account: account.scriptHash,
          scopes: tx.WitnessScope.CalledByEntry,
        },
      ])
      .then((res) => {
        console.log(res);
        var jsonData = [];
        res.stack[0].value.map((el, index) => {
          console.log(el);
          el.value.map((data, index) => {
            console.log(data);
            if (index == 0) {
              console.log(atob(data.value));
            } else {
              if (atob(data.value).indexOf('privateKey') > -1) {
                var json = JSON.parse(atob(data.value).substring(4));
                console.log(json);
                jsonData.push(json);
              } else if (atob(data.value).indexOf('isApproved') > -1) {
                const ignoreIds = [
                  '2a1eafc5-5efe-48a2-8082-638bfbd60653',
                  '36b5171d-c1d5-4812-8d7d-42ca7b03759c',
                  '4d6e3684-c996-4e68-9266-e7b7d9d1dad5',
                  '6aa2b034-2d22-4e0d-b5f7-52a1328767ba',
                  'b0ba3b22-60f1-4d06-b999-a095b671eea1',
                ];
                if (
                  atob(data.value).indexOf(ignoreIds[0]) > -1 ||
                  atob(data.value).indexOf(ignoreIds[1]) > -1 ||
                  atob(data.value).indexOf(ignoreIds[2]) > -1 ||
                  atob(data.value).indexOf(ignoreIds[3]) > -1 ||
                  atob(data.value).indexOf(ignoreIds[4]) > -1 ||
                  atob(data.value).indexOf(ignoreIds[5]) > -1
                ) {
                } else {
                  var json = JSON.parse(atob(data.value).substring(2));
                  console.log(json);
                  jsonData.push(json);
                }
              }
            }
          });
        });
        console.log('unmerged campaigns', jsonData);

        jsonData = mergeUniqueObjects(jsonData);
        setCampaigns(jsonData);
        console.log('campaigns', jsonData);
        // image
        // https://firebasestorage.googleapis.com/v0/b/hztl-care.appspot.com/o/campaignImages%2Fcampaign-ab0ab6d9-df9c-49dd-8c3a-db272cc73a17?alt=media&token=85779888-abb0-4332-a79e-45de9fffb1be

        //console.log(combinedItems(jsonData));
        //console.log(u.base642utf8(res.stack[0].value));
      });
  }
  return (
    <main>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <div className="relative mb-10">
          {/* <img src="care_banner.jpg" className='max-w-full' /> */}
          <Image
                  priority
                  src="/care_banner.jpg"
                  height={90}
                  width={90}
                  alt="Horizontal Care"
                />
        </div>
        <span className="w-full p-0.5 mb-10 bg-theme-01 opacity-70 lg:w-1/2 block mx-auto"></span>
        <div className="flex flex-col w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
          <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
            <a href="/" aria-label="Item" className="mr-3">
              <div className="flex items-center justify-center rounded-full bg-indigo-50">
                <Image
                  priority
                  src="/hcare-logo.svg"
                  height={90}
                  width={90}
                  alt="Horizontal Care"
                />
              </div>
            </a>
          </div>
          <p className="w-full text-gray-700 lg:text-sm lg:max-w-md">
            "Sed ut perspiciatis unde omnis iste natus error sit iste voluptatem accusantium
            doloremque rem aperiam, ipsa eaque quae. Sed ut perspiciatis unde omnis iste."
          </p>
        </div>
        <div className="grid gap-8 row-gap-5 mb-8 lg:grid-cols-3 lg:row-gap-8">
          {campaigns.map((campaign) => {
            return (
              campaign?.privateKey &&
              (campaign?.isApproved || userData?.isAdmin) && (
                <div
                  id={campaign.campaignId}
                  onClick={() =>
                    router.push({
                      pathname: '/campaigndetail',
                      query: { campaignId: campaign.campaignId },
                    })
                  }
                >
                  <img
                    className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                    src={`https://firebasestorage.googleapis.com/v0/b/hztl-care.appspot.com/o/campaignImages%2Fcampaign-${campaign.campaignId}?alt=media&token=85779888-abb0-4332-a79e-45de9fffb1be`}
                    alt=""
                  />
                  <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                    {campaign.campaignName}
                  </p>
                  <p className="text-gray-700">{campaign.description}</p>
                </div>
              )
            );
          })}
        </div>
        <div className="text-center">
          <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-theme-01"
          >
            See more
            <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="relative flex flex-col-reverse mb-10 sm:max-w-xl md:max-w-full lg:max-w-screen-xl mx-auto py-16 lg:py-0 lg:flex-col">
        <div className="w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:py-20 lg:max-w-screen-xl">
          <div className="mb-0 lg:max-w-lg lg:pr-8 xl:pr-6">
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none md:text-center">
              Join
              <br className="hidden md:block" />
              Horizontal Care
            </h2>
            <p className="mb-5 text-base text-gray-700 md:text-lg md:text-center">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae. explicabo.
            </p>
            <div className="mb-10 text-center md:mb-16 lg:mb-20">
              <a
                href="/"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none"
              >
                Connect
              </a>
            </div>
          </div>
        </div>
        <div className="inset-y-0 top-0 right-0 w-full max-w-xl px-4 mx-auto mb-6 md:px-0 lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0">
          <img
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
            alt=""
          />
        </div>
      </div>
    </main>
  );
}
