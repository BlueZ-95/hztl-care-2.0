
import Image from "next/image"

import { useEffect, useState } from "react";
import { CONST,rpc, sc, wallet, tx, u } from '@cityofzion/neon-core';
import { rpcAddress, scriptHash, userPvtKey } from "src/utils/Const";

export default function CampaignDetail() {
  useEffect(() => {
    readBlockChainData()
  }, [])

  function readBlockChainData(){

    const sb = new sc.ScriptBuilder();
    const rpcClient = new rpc.RPCClient(rpcAddress);
    const account = new wallet.Account(userPvtKey);

    sb.emitAppCall(scriptHash, 'getCampaignData', [`campaigns-4d6e3684-c996-4e68-9266-e7b7d9d1dad5`]);
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
          el.value.map( (data,index)=>{
            console.log(data);
            if(index == 0){
              console.log(atob(data.value));

            }else{
              
              if(atob(data.value).indexOf('privateKey') > -1) {
                var json = JSON.parse(atob(data.value).substring(4));
                console.log(json);
                jsonData.push(json);
              } else if(atob(data.value).indexOf('isApproved') > -1) {
                var json = JSON.parse(atob(data.value).substring(2));
                console.log(json);
                jsonData.push(json);
              }
              
            }
          })
        });
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
          <div className="grid grid-flow-col mr-5 mb-5">
            <div className="mb-3">
              <p className="font-sans text-xl font-bold leading-none tracking-tight lg:text-3xl xl:text-2xl">
                What it means when a man falls from outer space
              </p>
            </div>
            <div className="lg:col-span-2 text-right mt-2">
              <button
                aria-label=""
                class="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-01 focus:shadow-outline focus:outline-none"
              >
                Donate Now
              </button>
            </div>
          </div>

          <div className="relative block mx-auto w-full overflow-hidden">
            <Image
              priority
              src="/hcare-01.jpeg"
              layout="responsive"
              width={"100"}
              height={100}
              alt="Horizontal Care"
            />
          </div>
        </div>

        <div class="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
          <div class="text-center">
            <p class="text-sm font-bold tracking-widest text-black uppercase lg:text-xl mb-5">
              Campaign Stats
            </p>
          </div>
          <div class="grid grid-cols-2 row-gap-8 md:grid-cols-4">
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold text-theme-02 lg:text-4xl xl:text-5xl">$999</h6>
              <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Total Amount
              </p>
            </div>
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold text-theme-01 lg:text-4xl xl:text-5xl">$599</h6>
              <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Till Now
              </p>
            </div>
            <div class="text-center md:border-r">
              <h6 class="text-4xl font-bold lg:text-5xl xl:text-5xl">$400</h6>
              <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Remaining
              </p>
            </div>
            <div class="text-center">
              <h6 class="text-4xl font-bold lg:text-4xl xl:text-5xl">20 Mar</h6>
              <p class="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
                Last Date
              </p>
            </div>
          </div>
          <div class="text-left mt-12 text-lg font-regular">
            <p class="mb-3 ">
              Track work across the enterprise through an open, collaborative platform. Link issues
              across Jira and ingest data from other software development tools, so your IT support
              and operations teams have richer contextual information to rapidly respond to
              requests, incidents, and changes.
            </p>
            <p class="mb-3">
              Deliver great service experiences fast - without the complexity of traditional ITSM
              solutions.Accelerate critical development work, eliminate toil, and deploy changes
              with ease, with a complete audit trail for every change. Deliver great service
              experiences fast - without the complexity of traditional ITSM solutions.Accelerate
              critical development work, eliminate toil, and deploy changes with ease, with a
              complete audit trail for every change.
            </p>
            <p class="mb-3"></p>
            <p class="mb-3">
              Deliver great service experiences fast - without the complexity of traditional ITSM
              solutions.Accelerate critical development work, eliminate toil, and deploy changes
              with ease, with a complete audit trail for every change.
            </p>
            <p class="mb-3">
              Deliver great service experiences fast - without the complexity of traditional ITSM
              solutions.Accelerate critical development work, eliminate toil, and deploy changes
              with ease, with a complete audit trail for every change.
            </p>
            <p class="mb-3">
              Deliver great service experiences fast - without the complexity of traditional ITSM
              solutions.Accelerate critical development work, eliminate toil, and deploy changes
              with ease, with a complete audit trail for every change. Deliver great service
              experiences fast - without the complexity of traditional ITSM solutions.Accelerate
              critical development work, eliminate toil, and deploy changes with ease, with a
              complete audit trail for every change.
            </p>
          </div>
          <div class="flex flex-col items-center md:flex-row mt-8">
            <a
              href="/"
              aria-label=""
              class="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none mr-4"
            >
              Approve
            </a>
            <a
              href="/"
              aria-label=""
              class="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-01 focus:shadow-outline focus:outline-none mr-4"
            >
              Reject
            </a>
            <button
              aria-label=""
              class="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-01 focus:shadow-outline focus:outline-none"
            >
              Donate Now
            </button>
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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam, eaque ipsa quae. explicabo.
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
  )
}
