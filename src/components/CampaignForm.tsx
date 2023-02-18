
import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, firebaseAuth, firebaseStorage } from "../firebase/firebase.js";
import { ref, uploadBytes } from "firebase/storage";
import * as Yup from "yup";
import N3Helper from '../utils/UtilHelper.js';
import { contract } from 'src/utils/Util.js';
import * as N3Constants from '../utils/Const.js';
import { useAuthState } from 'react-firebase-hooks/auth';


const CampaignForm = (props) => {
  const [user, loading, error] = useAuthState(firebaseAuth);

  useEffect(() => {
    console.log('user', user);
    
    

    
  }, [])

  const [campaignImage, setcampaignImage] = useState(null);
  // form validation rules
  const validationSchema = Yup.object().shape({
    campaignName: Yup.string().required("First Name is required"),
    description: Yup.string().required("Description is required"),
    type: Yup.string().required("Title is required"),
    amount: Yup.string().required("Title is required"),
    startDate: Yup.string()
      .required("Start Date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Start Date must be a valid date in the format YYYY-MM-DD"
      ),
    endDate: Yup.string()
      .required("End Date is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "End Date must be a valid date in the format YYYY-MM-DD"
      ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(data) {
    // display form data on success
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));

    const docRef = doc(db, 'users', user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      const userData = docSnap.data()

      const campaignId = uuidv4();

    data.campaignId = campaignId;
    data.privateKey = userData.privateKey;


    const neoHelper = new N3Helper(
      contract(
        N3Constants.scriptHash,
        N3Constants.rpcAddress,
        N3Constants.userPvtKey,
      ),
    );
    neoHelper.contractInvoke('saveCampaignData', [
      {
        type: 'String',
        value: campaignId,
      },
      {
        type: 'String',
        value: JSON.stringify(data),
      }
    ]);

    if (campaignImage !== null) {
      const imageRef = ref(
        firebaseStorage,
        `campaignImages/campaign-${campaignId}`
      );
      uploadBytes(imageRef, campaignImage).then(() => alert("success"));
    }

    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }


    
    // addDoc(collection(db, "campaigns"), {
    //   campaignId: campaignId,
    //   campaignName: data.campaignName,
    //   campaignImage: `campaign-${campaignId}`,
    // }).catch((err) => console.log("err", err));
    return false;
  }

  // const uploadImage = () => {
  //   if (campaignImage !== null) {
  //     const imageRef = ref(
  //       firebaseStorage,
  //       `campaignImages/campaign-${campaignId}`
  //     );
  //     uploadBytes(imageRef, campaignImage).then(() => alert("success"));
  //   }
  // };

  return (
    <div className="relative">
      <img
        src="https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
        className="absolute inset-0 object-cover w-full h-full"
        alt=""
      />
      <div className="relative bg-gray-900 bg-opacity-75">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                The quick, brown fox <br className="hidden md:block" />
                jumps over a{" "}
                <span className="text-teal-accent-400">lazy dog</span>
              </h2>
              <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
                Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudan, totam rem aperiam,
                eaque ipsa quae.
              </p>
              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293lmb-8mb-8A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5mb-8A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full xl:px-8 xl:w-8/12">
              <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl mb-10">
                  <span className="mb-2 bg-theme-bg block h-2 w-14"></span>
                  Create Campaign
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-8">
                    <label className="text-sm text-theme-bg block font-bold">
                      Campaign Name
                    </label>
                    <input
                      name="campaignName"
                      type="text"
                      {...register("campaignName")}
                      className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                        errors.campaignName
                          ? "is-invalid border-theme-01"
                          : "border-theme-bg"
                      }`}
                    />
                    <div className="invalid-feedback text-theme-01 absolute">
                      {errors.campaignName?.message}
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="text-sm text-theme-bg block mb-1 font-bold">
                      Description
                    </label>
                    <textarea
                      name="description"
                      {...register("description")}
                      className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                        errors.description
                          ? "is-invalid border-theme-01"
                          : "border-theme-bg"
                      }`}
                    />
                    <div className="invalid-feedback text-theme-01 absolute">
                      {errors.description?.message}
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="text-sm text-theme-bg block mb-1 font-bold">
                      Type
                    </label>
                    <select
                      name="type"
                      {...register("type")}
                      className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                        errors.type
                          ? "is-invalid border-theme-01"
                          : "border-theme-bg"
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="Self">Self</option>
                      <option value="Educatiion">Educatiion</option>
                      <option value="Medical">Medical</option>
                    </select>
                    <div className="invalid-feedback text-theme-01 absolute">
                      {errors.type?.message}
                    </div>
                  </div>
                  <div className="mb-8">
                    <div className="mb-8">
                      <label className="text-sm text-theme-bg block mb-1 font-bold">
                        Amount
                      </label>
                      <input
                        name="amount"
                        type="number"
                        {...register("amount")}
                        className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                          errors.amount
                            ? "is-invalid border-theme-01"
                            : "border-theme-bg"
                        }`}
                      />
                      <div className="invalid-feedback text-theme-01 absolute">
                        {errors.amount?.message}
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="text-sm text-theme-bg block mb-1 font-bold">
                      Start Date
                    </label>
                    <input
                      name="startDate"
                      type="date"
                      {...register("startDate")}
                      className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                        errors.startDate
                          ? "is-invalid border-theme-01"
                          : "border-theme-bg"
                      }`}
                    />
                    <div className="invalid-feedback text-theme-01 absolute">
                      {errors.startDate?.message}
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="text-sm text-theme-bg block mb-1 font-bold">
                      End Date
                    </label>
                    <input
                      name="endDate"
                      type="date"
                      {...register("endDate")}
                      className={`appearance-none bg-transparent border-b-4 w-full py-1.5 focus:outline-none ${
                        errors.endDate
                          ? "is-invalid border-theme-01"
                          : "border-theme-bg"
                      }`}
                    />
                    <div className="invalid-feedback text-theme-01 absolute">
                      {errors.endDate?.message}
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="text-sm text-theme-bg block mb-1 font-bold">
                      Campaign Image
                    </label>
                    <input
                      type="file"
                      name="campaignImage"
                      onChange={(event) => {
                        setcampaignImage(event.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-btn hover:bg-theme-btn-hover focus:shadow-outline focus:outline-none mr-4"
                    >
                      Register
                    </button>
                    <button
                      type="button"
                      onClick={() => reset()}
                      className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-theme-btn-text transition duration-200 rounded shadow-md bg-theme-01 hover:bg-theme-01-hover focus:shadow-outline focus:outline-none"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;
