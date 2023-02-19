using System;
using System.ComponentModel;
using System.Numerics;

using Neo;
using Neo.SmartContract.Framework;
using Neo.SmartContract.Framework.Attributes;
using Neo.SmartContract.Framework.Native;
using Neo.SmartContract.Framework.Services;

namespace CrowdFunding
{
    [DisplayName("Hackathon.CrowdFundingContract")]
    [ManifestExtra("Author", "Horizontal")]
    [ManifestExtra("Email", "ckhanna@horizontal.com")]
    [ManifestExtra("Description", "Crowd Funding APP")]
    public class CrowdFundingContract : SmartContract
    {
        const byte Prefix_NumberStorage = 0x00;
        public const string CampaignPrefix = "campaigns-";

        public static void SaveCampaignData(string campaignId, string campaigndata)
        {
            StorageMap contractStorage = new(Storage.CurrentContext, Prefix_NumberStorage);
            var storageSuffix = "-save";
            contractStorage.PutObject($"{CampaignPrefix + campaignId + storageSuffix}", campaigndata);
        }
        public static void ApproveCampaignData(string campaignId, string campaigndata)
        {
            StorageMap contractStorage = new(Storage.CurrentContext, Prefix_NumberStorage);
            var storageSuffix = "-approve";
            contractStorage.PutObject($"{CampaignPrefix + campaignId + storageSuffix}", campaigndata);
        }
        public static List<object> GetCampaignData(string campaignId)
        {
            StorageMap contractStorage = new(Storage.CurrentContext, Prefix_NumberStorage);
            Iterator campaign = contractStorage.Find($"{campaignId}");
            List<object> campdata = new List<object>();
            foreach (var data in campaign)
            {
                campdata.Add(data);
            }
            return campdata;
        }
    }
}
