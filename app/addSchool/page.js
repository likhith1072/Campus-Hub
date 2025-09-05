"use client";
import { useForm } from "react-hook-form";
import { app } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ref, uploadBytes, getDownloadURL,getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import { useState } from "react";
import {useSchools} from "@/context/SchoolContext";



export default function AddSchool() {
  const { setSchools, loading, setLoading } = useSchools();  
  const storage = getStorage(app);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const emailValue = watch("email_id", "");
  const contactValue = watch("contact", "");
  const schoolNameValue = watch("name", "");
  const cityValue = watch("city", "");
  const stateValue = watch("state", "");
  const addressValue = watch("address", "");
  const imageFile = watch("image", []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
       let imageUrl = "";
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);

      if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
        // Send raw file in development
        formData.append("image", data.image[0]);
      } else {
        // Upload to Firebase in production
        // Upload to Firebase in production
        const file = data.image[0];
        const FileName=`${file.name}_${Date.now()}`;
        const storageRef = ref(storage, `schools/${FileName}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
        formData.append("imageUrl", imageUrl);
  
      }

      const res = await fetch("/api/addSchool", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) {
        toast.error(result.error || "Failed to add school");
        setLoading(false);
        return;
      }
      toast.success("School added successfully!");
      setSchools(result.schools);
      router.push("/showSchools");
      setLoading(false);
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to add school");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add School</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="School Name"
            {...register("name", { required: true })}
            className={`peer border-2 border-gray-300 p-2 rounded outline-none w-full shadow-sm ${errors.name ? "border-red-500" : "focus:border-blue-500 "}`}
          />
          <label
            htmlFor="name"
            className={`absolute left-2 top-0 text-xs -translate-y-1/2 z-20 font-semibold bg-white px-1
               transition-all cursor-text  ${schoolNameValue ? "block" : "hidden"} peer-focus:block
               peer-focus:top-0 ${!loading && !errors.name && "peer-focus:text-blue-600"} ${errors.name && "text-red-500"}`}
          >School Name
          </label>
          {errors.name && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 text-sm pointer-events-none">
              School Name is required
            </span>)}
        </div>




        <div className="relative">
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}
            className={`peer border-2 border-gray-300 p-2 rounded outline-none w-full shadow-sm ${errors.address ? "border-red-500" : "focus:border-blue-500 "}`}
          />
          <label
            htmlFor="address"
            className={`absolute left-2 top-0 text-xs -translate-y-1/2 z-20 font-semibold bg-white px-1
               transition-all cursor-text  ${addressValue ? "block" : "hidden"} peer-focus:block
               peer-focus:top-0 ${!loading && !errors.address && "peer-focus:text-blue-600"} ${errors.address && "text-red-500"}`}
          >Address
          </label>
          {errors.address && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 text-sm pointer-events-none">
              Address is required
            </span>)}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="City"
            {...register("city", { required: true })}
           className={`peer border-2 border-gray-300 p-2 rounded outline-none w-full shadow-sm ${errors.city ? "border-red-500" : "focus:border-blue-500 "}`}
          />
          <label
            htmlFor="city"
            className={`absolute left-2 top-0 text-xs -translate-y-1/2 z-20 font-semibold bg-white px-1
               transition-all cursor-text  ${cityValue ? "block" : "hidden"} peer-focus:block
               peer-focus:top-0 ${!loading && !errors.city && "peer-focus:text-blue-600"} ${errors.city && "text-red-500"}`}
          >City
          </label>
          {errors.city && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 text-sm pointer-events-none">
              City is required
            </span>)}
        </div>

        <div className="relative">
          <select
            id="state"
            {...register("state", { required: "State is required" })}
            className={`peer border-2  p-2 rounded outline-none w-full shadow-sm ${errors.state ? "border-red-500" : "focus:border-blue-500 border-gray-300"}`}
          >
            <option value="">-- Select State --</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>

          <label
            htmlFor="state"
            className={`absolute left-2 top-0 text-xs -translate-y-1/2 z-20 font-semibold bg-white px-1
               transition-all cursor-text  ${stateValue ? "block" : "hidden"} peer-focus:block
               peer-focus:top-0 ${!loading && !errors.state && "peer-focus:text-blue-600"} ${errors.state && "text-red-500"}`}
          >State
          </label>
          {errors.state && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 text-sm pointer-events-none bg-white ">
              State is required
            </span>)}
        </div>

        <div className="relative">
          <input
            type="number"
            placeholder="Contact"
            min={0}
            {...register("contact", {
              required: "Contact is required",
            })}
             className={`peer border-2 border-gray-300 p-2 rounded outline-none w-full shadow-sm ${errors.contact ? "border-red-500" : "focus:border-blue-500 "}`}
          />
          <label
            htmlFor="contact"
            className={`absolute left-2 top-0 text-xs -translate-y-1/2 z-20 font-semibold bg-white px-1
               transition-all cursor-text  ${contactValue ? "block" : "hidden"} peer-focus:block
               peer-focus:top-0 ${!loading && !errors.contact && "peer-focus:text-blue-600"} ${errors.contact && " text-red-500 "}`}
          >Contact
          </label>
          {errors.contact && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-red-500 text-sm pointer-events-none bg-white">
              {errors.contact.message}
            </span>)}
        </div>

        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            {...register("email_id", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
              }
            })}
             className={`peer border-2 border-gray-300 p-2 rounded outline-none w-full shadow-sm ${errors.email_id ? "border-red-500" : "focus:border-blue-500 "}`}
          />
          <label
            htmlFor="email_id"
           className={`absolute left-2 top-0 text-xs -translate-y-1/2 z-20 font-semibold bg-white px-1
               transition-all cursor-text  ${emailValue ? "block" : "hidden"} peer-focus:block
               peer-focus:top-0 ${!loading && !errors.email_id && "peer-focus:text-blue-600"} ${errors.email_id && "text-red-500"}`}
          >Email
          </label>
          {errors.email_id && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 text-sm pointer-events-none">
              {errors.email_id.message}
            </span>
          )}
        </div>

        

       

                <div className="flex gap-4 items-center justify-between  py-3">
          <div className="border border-gray-500 rounded-sm flex gap-2 items-center text-sm sm:text-md">
                   <input
          type="file"
          id="image" 
          accept="image/*"
          {...register("image", {
            required: "Image is required",
            validate: (files) =>
  files[0]?.size <= 2 * 1024 * 1024 || "Image must be less than or equal to 2MB",

          })}
          className=" peer border-2 border-gray-300 p-2 rounded outline-none focus:border-blue-500 w-full shadow-sm cursor-pointer hidden "
        />
            <label
              htmlFor="image"
              className="bg-blue-500 text-white px-4 py-2 cursor-pointer hover:bg-blue-600 font-semibold"
            >
              Choose File
            </label>
            <span className={` w-40 truncate ${errors.image ? "text-red-500" : "text-gray-600"}`}>{imageFile[0]?.name || "No File Chosen"}</span>
          </div>
          <div>{errors.image && <p className="text-red-500 text-sm">Image whose size is &lt;=2MB is required</p>}</div>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Saving...": "Save"}
        </button>
      </form>
    </div>
  );
}
