import { Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { db, firebaseStorage } from "../firebase/firebase.js";
import { ref, uploadBytes } from "firebase/storage";
import * as Yup from "yup";

const CampaignForm = (props) => {
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

  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));

    const campaignId = uuidv4();

    if (campaignImage !== null) {
      const imageRef = ref(
        firebaseStorage,
        `campaignImages/campaign-${campaignId}`
      );
      uploadBytes(imageRef, campaignImage).then(() => alert("success"));
    }

    addDoc(collection(db, "campaigns"), {
      campaignId: campaignId,
      campaignName: data.campaignName,
      campaignImage: `campaign-${campaignId}`,
    }).catch((err) => console.log("err", err));
    return false;
  }

  const uploadImage = () => {
    if (campaignImage !== null) {
      const imageRef = ref(
        firebaseStorage,
        `campaignImages/campaign-${campaignId}`
      );
      uploadBytes(imageRef, campaignImage).then(() => alert("success"));
    }
  };

  return (
    <>
      <div className="">
        <h2 className="">Campaign Form</h2>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="-5">
              <label>Campaign Name</label>
              <input
                name="campaignName"
                type="text"
                {...register('campaignName')}
                className={`${errors.name ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.campaignName?.message}</div>
            </div>
            <br />
            <div className="-5">
              <label>Description</label>
              <textarea
                name="description"
                {...register('description')}
                className={`${errors.description ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.description?.message}</div>
            </div>
            <br />
            <div className="-5">
              <label>Campaign Image</label>
              <input
                type="file"
                name="campaignImage"
                onChange={(event) => {
                  setcampaignImage(event.target.files[0]);
                }}
              />
            </div>
            <br />
            <div className="">
              <label>Type</label>
              <select
                name="type"
                {...register('type')}
                className={`${errors.type ? 'is-invalid' : ''}`}
              >
                <option value="">Select</option>
                <option value="Self">Self</option>
                <option value="Educatiion">Educatiion</option>
                <option value="Medical">Medical</option>
              </select>
              <div className="invalid-feedback">{errors.type?.message}</div>
              <br />
            </div>
            <div className="">
              <div className="-5">
                <label>Amount</label>
                <input
                  name="amount"
                  type="number"
                  {...register('amount')}
                  className={`${errors.amount ? 'is-invalid' : ''}`}
                />
                <div className="invalid-feedback">{errors.amount?.message}</div>
              </div>
              <br />
            </div>
            <div className="">
              <label>Start Date</label>
              <input
                name="startDate"
                type="date"
                {...register('startDate')}
                className={`${errors.startDate ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.startDate?.message}</div>
            </div>
            <br />
            <div className="">
              <label>End Date</label>
              <input
                name="endDate"
                type="date"
                {...register('endDate')}
                className={`${errors.endDate ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.endDate?.message}</div>
            </div>
            <br />
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-1">
                Register
              </button>
              <button type="button" onClick={() => reset()} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CampaignForm;
