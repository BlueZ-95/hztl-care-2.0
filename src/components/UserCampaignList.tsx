
import Image from "next/image";
import { useEffect, useState } from "react";
import { CONST,rpc, sc, wallet, tx, u } from '@cityofzion/neon-core';
import { rpcAddress, scriptHash, userPvtKey } from "src/utils/Const";


export default function CampaignList() {

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    readBlockChainData()
  }, [])

  function readBlockChainData(){

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
          <div className="flex flex-col w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
            <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
              <a href="/" aria-label="Item" className="mr-3">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50">
                  <Image
                    priority
                    src="/horizontal-care.svg"
                    height={30}
                    width={30}
                    alt="Horizontal Care"
                  />
                </div>
              </a>
              <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
                <span className="mb-2 bg-theme-bg block h-2 w-14"></span>
                <span className="inline-block">Care</span>
              </h2>
            </div>
            <p className="w-full text-gray-700 lg:text-sm lg:max-w-md">
              "Sed ut perspiciatis unde omnis iste natus error sit iste
              voluptatem accusantium doloremque rem aperiam, ipsa eaque quae.
              Sed ut perspiciatis unde omnis iste."
            </p>
          </div>
          <div className="grid gap-8 row-gap-5 mb-8 lg:grid-cols-3 lg:row-gap-8">
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Galaxies Orion
              </p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Tunguska event
              </p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Yolo ipsum dolor
              </p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Curabitur mattis
              </p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Leverage agile
              </p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
            <div>
              <img
                className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt=""
              />
              <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
                Organically grow
              </p>
              <p className="text-gray-700">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium.
              </p>
            </div>
          </div>
          <div className="text-center">
            <a
              href="/"
              aria-label=""
              className="inline-flex items-center font-semibold transition-colors duration-200 text-theme-01"
            >
              See more
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </a>
          </div>
        </div>
      </main>
  );
}
