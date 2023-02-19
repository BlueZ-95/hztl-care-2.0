import { useEffect, useState } from 'react';

import { CONST, rpc, sc, wallet, tx, u } from '@cityofzion/neon-core';
import { rpcAddress, scriptHash, userPvtKey } from 'src/utils/Const';

import N3Helper from '../utils/UtilHelper.js';
import { contract, mergeUniqueObjects } from 'src/utils/Util.js';
import * as N3Constants from '../utils/Const.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseAuth } from 'src/firebase/firebase.js';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function CampaignLists() {
  const [campaigns, setCampaigns] = useState([]);
  const [user, loading, error] = useAuthState(firebaseAuth);
  const MySwal = withReactContent(Swal)


  useEffect(() => {
    readBlockChainData();
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

              if (atob(data.value).indexOf('privateKey') > -1 && atob(data.value).indexOf('NewCampaign') === -1) {
                var json = JSON.parse(atob(data.value).substring(4));
                console.log(json);
                jsonData.push(json);
              } else if(atob(data.value).indexOf('isApproved') > -1) {
      const ignoreIds = ["2a1eafc5-5efe-48a2-8082-638bfbd60653", "36b5171d-c1d5-4812-8d7d-42ca7b03759c", "4d6e3684-c996-4e68-9266-e7b7d9d1dad5", "6aa2b034-2d22-4e0d-b5f7-52a1328767ba","b0ba3b22-60f1-4d06-b999-a095b671eea1"]
                if(atob(data.value).indexOf(ignoreIds[0]) > -1 || atob(data.value).indexOf(ignoreIds[1]) > -1 || atob(data.value).indexOf(ignoreIds[2]) > -1 || atob(data.value).indexOf(ignoreIds[3]) > -1 || atob(data.value).indexOf(ignoreIds[4]) > -1 || atob(data.value).indexOf(ignoreIds[5]) > -1) {}
                else {
                  var json = JSON.parse(atob(data.value).substring(2));
                console.log(json);
                jsonData.push(json);
                }
              }
            }
            }
          );
        });
        console.log('unmerged campaigns', jsonData);
        jsonData = mergeUniqueObjects(jsonData);
        
        console.log('campaigns', jsonData);

        setCampaigns(jsonData);
        // image
        // https://firebasestorage.googleapis.com/v0/b/hztl-care.appspot.com/o/campaignImages%2Fcampaign-ab0ab6d9-df9c-49dd-8c3a-db272cc73a17?alt=media&token=85779888-abb0-4332-a79e-45de9fffb1be

        //console.log(combinedItems(jsonData));
        //console.log(u.base642utf8(res.stack[0].value));
      });
  }

  const updateCampaignStatus = (targetId, campaignId, status) => {
    if(targetId === campaignId) {
    console.log('statusChange');

    const campaignStatus = {
      campaignid: campaignId,
      isApproved: status
    }

    const neoHelper = new N3Helper(
      contract(N3Constants.scriptHash, N3Constants.rpcAddress, N3Constants.userPvtKey)
    );
    neoHelper.contractInvoke('approveCampaignData', [
      {
        type: 'String',
        value: campaignId,
      },
      {
        type: 'String',
        value: JSON.stringify(campaignStatus),
      },
    ]);

    MySwal.fire({
      title: <p>Campaign status updated</p>,
      icon: 'success'
    });
  }
  };

  return (
    <main>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
        <section class="container px-4 mx-auto">
          <div class="flex flex-col">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div class="flex items-center gap-x-3">
                            <input
                              type="checkbox"
                              class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                            />
                            <button class="flex items-center gap-x-2">
                              <span>Amount</span>

                              <svg
                                class="h-3"
                                viewBox="0 0 10 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                                  fill="currentColor"
                                  stroke="#ffffff"
                                  stroke-width="0.1"
                                />
                                <path
                                  d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                                  fill="currentColor"
                                  stroke="#ffffff"
                                  stroke-width="0.1"
                                />
                                <path
                                  d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                                  fill="currentColor"
                                  stroke="#ffffff"
                                  stroke-width="0.3"
                                />
                              </svg>
                            </button>
                          </div>
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Date
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Type
                        </th>

                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Campaign Name
                        </th>

                        <th scope="col" class="relative py-3.5 px-4">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {campaigns.length > 0 &&
                        campaigns.map((campaign) => {

                          return (
                            <>
                              <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                  <div className="inline-flex items-center gap-x-3">
                                    <input
                                      type="checkbox"
                                      className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                    />
                                    <span>{campaign.amount}</span>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  {campaign.startDate}
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                  <div className="inline-flex items-center px-3 py-1 text-gray-500 rounded-full gap-x-2 bg-theme-01 dark:bg-gray-800">
                                    <svg
                                      width="12"
                                      height="12"
                                      viewBox="0 0 12 12"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M4.5 7L2 4.5M2 4.5L4.5 2M2 4.5H8C8.53043 4.5 9.03914 4.71071 9.41421 5.08579C9.78929 5.46086 10 5.96957 10 6.5V10"
                                        stroke="#ffffff"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></path>
                                    </svg>
                                    <h2 className="text-sm font-normal">{campaign.isApproved ? 'Approved' : 'Rejected'}</h2>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                  <div className="flex items-center gap-x-2">
                                    
                                    <div>
                                      <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                       {campaign.type}
                                      </h2>
                                      
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {campaign.campaignName}
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <div className="flex items-center gap-x-6">
                                    <button id={campaign.campaignId} onClick={(e) => updateCampaignStatus(e.target.id, campaign.campaignId, true)} className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none">
                                      Approve
                                    </button>
                                    <button id={campaign.campaignId} onClick={(e) => updateCampaignStatus(e.target.id, campaign.campaignId, false)} className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-01 focus:shadow-outline focus:outline-none">
                                      Reject
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
