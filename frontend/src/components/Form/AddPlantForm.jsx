// import { useForm } from "react-hook-form";
// import { imageUpload } from "../../utils";
// import useAuth from "../../hooks/useAuth";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import LoadingSpinner from "../Shared/LoadingSpinner";
// import ErrorPage from "../../pages/ErrorPage";
// import toast from "react-hot-toast";
// import { TbFidgetSpinner } from "react-icons/tb";

// const AddPlantForm = () => {
//   const { user } = useAuth();

//   // useMutation hook useCase
//   const {
//     isPending,
//     isError,
//     mutateAsync,
//     reset: mutationReset,
//   } = useMutation({
//     mutationFn: async (payload) =>
//       await axios.post(`${import.meta.env.VITE_API_URL}/plants`, payload),
//     onSuccess: (data) => {
//       console.log(data);
//       // show toast
//       toast.success("Plant Added Successfully");
//       mutationReset();
//       // Query key invalid
//     },
//     onError: (error) => {
//       console.log(error);
//     },
//     onMutate: (payload) => {
//       console.log("I will post this data --->", payload);
//     },

//     // onSettled work both of onSuccess and onError
//     onSettled: (data, error) => {
//       console.log("I am from onSettled", data);
//       if (error) console.log(error);
//     },
//     retry: 3,
//   });

//   // react hook form
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     const { name, category, description, price, quantity, image } = data;
//     const imageFile = image[0];

//     try {
//       const imageUrl = await imageUpload(imageFile);
//       const plantData = {
//         image: imageUrl,
//         name,
//         category,
//         description,
//         price: Number(price),
//         quantity: Number(quantity),
//         seller: {
//           image: user?.photoURL,
//           name: user?.displayName,
//           email: user?.email,
//         },
//       };

//       await mutateAsync(plantData);
//       reset();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (isPending) {
//     return <LoadingSpinner />;
//   }

//   if (isError) {
//     return <ErrorPage />;
//   }

//   return (
//     <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           <div className="space-y-6">
//             {/* Name */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="name" className="block text-gray-600">
//                 Name
//               </label>
//               <input
//                 className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
//                 id="name"
//                 type="text"
//                 placeholder="Plant Name"
//                 {...register("name", {
//                   required: {
//                     value: true,
//                     message: "Name is required",
//                   },
//                   maxLength: {
//                     value: 20,
//                     message: "Name is too long",
//                   },
//                 })}
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.name.message}
//                 </p>
//               )}
//             </div>

//             {/* Category */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="category" className="block text-gray-600 ">
//                 Category
//               </label>
//               <select
//                 {...register("category", {
//                   required: {
//                     value: true,
//                     message: "Category is required",
//                   },
//                 })}
//                 className="w-full px-4 py-3 border-lime-300 focus:outline-lime-500 rounded-md bg-white"
//               >
//                 <option value="Indoor">Indoor</option>
//                 <option value="Outdoor">Outdoor</option>
//                 <option value="Succulent">Succulent</option>
//                 <option value="Flowering">Flowering</option>
//               </select>
//             </div>

//             {/* Description */}
//             <div className="space-y-1 text-sm">
//               <label htmlFor="description" className="block text-gray-600">
//                 Description
//               </label>

//               <textarea
//                 id="description"
//                 placeholder="Write plant description here..."
//                 className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-lime-500 "
//                 name="description"
//                 {...register("description", {
//                   required: {
//                     value: true,
//                     message: "Description is required",
//                   },
//                 })}
//               />
//             </div>
//             {errors.description && (
//               <p className="text-red-500 text-xs mt-1">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           <div className="space-y-6 flex flex-col">
//             {/* Price & Quantity */}
//             <div className="flex justify-between gap-2">
//               {/* Price */}
//               <div className="space-y-1 text-sm">
//                 <label htmlFor="price" className="block text-gray-600 ">
//                   Price
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
//                   id="price"
//                   type="number"
//                   placeholder="Price per unit"
//                   {...register("price", {
//                     required: {
//                       value: true,
//                       message: "Price is required",
//                     },
//                   })}
//                 />

//                 {errors.price && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.price.message}
//                   </p>
//                 )}
//               </div>

//               {/* Quantity */}
//               <div className="space-y-1 text-sm">
//                 <label htmlFor="quantity" className="block text-gray-600">
//                   Quantity
//                 </label>
//                 <input
//                   className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
//                   id="quantity"
//                   type="number"
//                   placeholder="Available quantity"
//                   {...register("quantity", {
//                     required: {
//                       value: true,
//                       message: "Quantity is required",
//                     },
//                   })}
//                 />

//                 {errors.quantity && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.quantity.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* Image */}
//             <div className=" p-4  w-full  m-auto rounded-lg grow">
//               <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
//                 <div className="flex flex-col w-max mx-auto text-center">
//                   <label>
//                     <input
//                       className="text-sm cursor-pointer w-36 hidden"
//                       type="file"
//                       id="image"
//                       accept="image/*"
//                       hidden
//                       {...register("image", {
//                         required: {
//                           value: true,
//                           message: "Please upload image",
//                         },
//                       })}
//                     />
//                     <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
//                       Upload
//                     </div>
//                   </label>
//                 </div>
//               </div>
//               {errors.image && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.image.message}
//                 </p>
//               )}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500 "
//             >
//               <button
//                 type="submit"
//                 className="bg-lime-500 w-full rounded-md py-3 text-white"
//               >
//                 {isPending ? (
//                   <TbFidgetSpinner className="animate-spin m-auto" />
//                 ) : (
//                   "Save & Continue "
//                 )}
//               </button>
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddPlantForm;

import { useForm } from "react-hook-form";
import { imageUpload } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorPage from "../../pages/ErrorPage";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState } from "react";

const AddPlantForm = () => {
  const { user } = useAuth();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/plants`, payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Plant Added Successfully");
      mutationReset();
    },
    onError: (error) => {
      console.log(error);
    },
    onMutate: (payload) => {
      console.log("I will post this data --->", payload);
    },
    onSettled: (data, error) => {
      console.log("I am from onSettled", data);
      if (error) console.log(error);
    },
    retry: 3,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  // const imageWatch = watch("image");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    const { name, category, description, price, quantity, image } = data;
    const imageFile = image[0];

    try {
      const imageUrl = await imageUpload(imageFile);
      const plantData = {
        image: imageUrl,
        name,
        category,
        description,
        price: Number(price),
        quantity: Number(quantity),
        seller: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(plantData);
      reset();
      setPreviewImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-lime-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Add New Plant
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Share your beautiful plants with our gardening community. Fill in
            the details below to add your plant to our collection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Preview Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 sticky top-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Plant Preview
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Upload an image to see preview
                </p>

                {/* Image Preview */}
                <div className="aspect-square rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 border-2 border-dashed border-emerald-200 overflow-hidden mb-6">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="w-12 h-12 text-emerald-400 mx-auto mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-emerald-600 text-sm">
                          Image will appear here
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-emerald-50 rounded-xl p-3">
                    <div className="text-emerald-600 font-semibold">Price</div>
                    <div className="text-gray-700 text-sm">
                      ${watch("price") || "0"}
                    </div>
                  </div>
                  <div className="bg-teal-50 rounded-xl p-3">
                    <div className="text-teal-600 font-semibold">Stock</div>
                    <div className="text-gray-700 text-sm">
                      {watch("quantity") || "0"} units
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200 flex items-center">
                      <span className="w-2 h-8 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></span>
                      Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-3">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <svg
                            className="w-4 h-4 text-emerald-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Plant Name
                        </label>
                        <input
                          className="w-full px-4 py-4 text-gray-800 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-2xl bg-white transition-all duration-300 placeholder-gray-400"
                          type="text"
                          placeholder="Enter plant name"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "Name is required",
                            },
                            maxLength: {
                              value: 20,
                              message: "Name is too long",
                            },
                          })}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-xs font-medium flex items-center"
                          >
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.name.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Category */}
                      <div className="space-y-3">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <svg
                            className="w-4 h-4 text-emerald-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                          Category
                        </label>
                        <select
                          {...register("category", {
                            required: {
                              value: true,
                              message: "Category is required",
                            },
                          })}
                          className="w-full px-4 py-4 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-2xl bg-white transition-all duration-300"
                        >
                          <option value="">Select category</option>
                          <option value="Indoor">🌿 Indoor</option>
                          <option value="Outdoor">🌳 Outdoor</option>
                          <option value="Succulent">🌵 Succulent</option>
                          <option value="Flowering">🌸 Flowering</option>
                        </select>
                        {errors.category && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-xs font-medium flex items-center"
                          >
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.category.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200 flex items-center">
                      <span className="w-2 h-8 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></span>
                      Description
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <svg
                          className="w-4 h-4 text-emerald-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                          />
                        </svg>
                        Plant Description
                      </label>
                      <textarea
                        placeholder="Describe your plant's features, care requirements, and special characteristics..."
                        className="block rounded-2xl w-full h-40 px-4 py-4 text-gray-800 border-2 border-gray-200 bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 resize-none transition-all duration-300 placeholder-gray-400"
                        {...register("description", {
                          required: {
                            value: true,
                            message: "Description is required",
                          },
                        })}
                      />
                      {errors.description && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-xs font-medium flex items-center"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {errors.description.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Stock */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200 flex items-center">
                      <span className="w-2 h-8 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></span>
                      Pricing & Stock
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Price */}
                      <div className="space-y-3">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <svg
                            className="w-4 h-4 text-emerald-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          Price ($)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
                            $
                          </span>
                          <input
                            className="w-full pl-12 pr-4 py-4 text-gray-800 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-2xl bg-white transition-all duration-300"
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            {...register("price", {
                              required: {
                                value: true,
                                message: "Price is required",
                              },
                            })}
                          />
                        </div>
                        {errors.price && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-xs font-medium flex items-center"
                          >
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.price.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="space-y-3">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <svg
                            className="w-4 h-4 text-emerald-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                          Quantity
                        </label>
                        <input
                          className="w-full px-4 py-4 text-gray-800 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-2xl bg-white transition-all duration-300"
                          type="number"
                          placeholder="Available quantity"
                          {...register("quantity", {
                            required: {
                              value: true,
                              message: "Quantity is required",
                            },
                          })}
                        />
                        {errors.quantity && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-xs font-medium flex items-center"
                          >
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            {errors.quantity.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-200 flex items-center">
                      <span className="w-2 h-8 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></span>
                      Plant Image
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
                        <svg
                          className="w-4 h-4 text-emerald-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Upload Plant Photo
                      </label>

                      <div className="border-3 border-dashed border-emerald-200 rounded-2xl p-8 text-center transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/50 group">
                        <input
                          className="hidden"
                          type="file"
                          id="image"
                          accept="image/*"
                          {...register("image", {
                            required: {
                              value: true,
                              message: "Please upload image",
                            },
                          })}
                          onChange={(e) => {
                            handleImageChange(e);
                            register("image").onChange(e);
                          }}
                        />
                        <label htmlFor="image" className="cursor-pointer block">
                          <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                              <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                              </svg>
                            </div>
                            <div>
                              <p className="text-gray-700 font-medium mb-1">
                                Click to upload
                              </p>
                              <p className="text-gray-500 text-sm">
                                PNG, JPG, WEBP up to 10MB
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                      {errors.image && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-red-500 text-xs font-medium flex items-center justify-center"
                        >
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                          {errors.image.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isPending ? (
                      <div className="flex items-center justify-center gap-3">
                        <TbFidgetSpinner className="animate-spin text-xl" />
                        <span>Adding Plant...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <svg
                          className="w-5 h-5 text-white group-hover:scale-110 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-lg">Add to Plant Collection</span>
                      </div>
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddPlantForm;
