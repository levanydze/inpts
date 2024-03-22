Link;
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div>
      <Link className=" text-3xl cursor-pointer m-auto" href={"/post"}>
        Dashboard
      </Link>
    </div>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";
// import { app } from "../firebase";
// import {
//   getDatabase,
//   ref,
//   set,
//   push,
//   get,
//   remove,
//   update,
// } from "firebase/database";
// import styles from "./page.module.css";
// import Image from "next/image";

// interface MenuItemProps {
//   image: string;
//   name: string;
//   id: string;
// }

// export default function Write() {
//   const [menuCategoryValue, setMenuCategoryValue] = useState("");
//   const [fetchCategoryValue, setFetchCategoryValue] = useState("breakfast");
//   const [imageValue, setImageValue] = useState("");
//   const [nameValue, setNameValue] = useState("");

//   const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [emptyCategory, setEmptyCategory] = useState<boolean>(false);

//   const [updateName, setUpdateName] = useState<string>("");
//   const [updateImage, setUpdateImage] = useState<string>("");
//   const [itemId, setItemId] = useState<string>(""); // State variable to hold itemId

//   const handleMenuCategoryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setMenuCategoryValue(e.target.value);
//   };

//   const handleFetchCategoryChange = (category: string) => {
//     setFetchCategoryValue(category);
//   };

//   const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       if (!menuCategoryValue || !imageValue || !nameValue) {
//         alert("All fields must be filled");
//         return;
//       }

//       const db = getDatabase(app);
//       const newDocRef = push(ref(db, `menu/${menuCategoryValue}`));

//       await set(newDocRef, {
//         id: newDocRef.key,
//         image: imageValue,
//         name: nameValue,
//         [menuCategoryValue]: true,
//       });

//       alert("Data saved successfully");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Error saving data");
//     }
//   };

//   const handleDeleteItem = async (itemId: string) => {
//     try {
//       const db = getDatabase(app);
//       const itemRef = ref(db, `menu/${fetchCategoryValue}/${itemId}`);

//       const itemSnapshot = await get(itemRef);
//       if (!itemSnapshot.exists()) {
//         alert("Item does not exist in the database");
//         return;
//       }

//       await remove(itemRef);

//       setMenuItems((prevItems) =>
//         prevItems.filter((item) => item.id !== itemId)
//       );

//       console.log("Item deleted successfully");
//     } catch (error) {
//       console.error("Error deleting item:", error);
//       alert("Error deleting item");
//     }
//   };

//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const db = getDatabase(app);
//       const dbRef = ref(db, `menu/${fetchCategoryValue}`);
//       const snapshot = await get(dbRef);

//       if (snapshot.exists()) {
//         setMenuItems(Object.values(snapshot.val()) as MenuItemProps[]);
//         setEmptyCategory(false);
//       } else {
//         alert("No data available");
//         setEmptyCategory(true);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       alert("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [postEditing, setPostEditing] = useState<boolean>(false);
//   const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       if (!itemId || !updateName || !updateImage) {
//         alert("All fields must be filled");
//         return;
//       }

//       const db = getDatabase(app);
//       const updates = {
//         [`menu/${fetchCategoryValue}/${itemId}/name`]: updateName,
//         [`menu/${fetchCategoryValue}/${itemId}/image`]: updateImage,
//       };

//       await update(ref(db), updates);

//       setPostEditing(false);
//       setUpdateName("");
//       setUpdateImage("");
//       setItemId("");
//       fetchData(); // Refresh the data after update
//       console.log("Data updated successfully");
//     } catch (error) {
//       console.error("Errorupdating data:", error);
//       alert("Error updating data");
//     }
//   };

//   const handleEditItem = (
//     itemId: string,
//     itemName: string,
//     itemImage: string
//   ) => {
//     setItemId(itemId); // Set the itemId in state
//     setUpdateName(itemName); // Set the name for editing
//     setUpdateImage(itemImage); // Set the image for editing
//     setPostEditing(true); // Enable editing mode
//   };

//   useEffect(() => {
//     if (fetchCategoryValue) {
//       fetchData();
//     }
//   }, [fetchCategoryValue]);

//   return (
//     <>
//       <form
//         onSubmit={saveData}
//         className="p-4 items-center flex flex-col border-4 border-teal-800 m-4 "
//       >
//         <div className="mb-10 flex justify-center flex-col">
//           <h2 className="text-white text-2xl mb-4 text-center">
//             Create New List For Your Menu
//           </h2>
//           <select
//             className="h-12 text-2xl rounded-md px-2 text-teal-800 m-auto"
//             value={menuCategoryValue}
//             onChange={handleMenuCategoryChange}
//           >
//             <option value="">Select category</option>
//             <option value="breakfast">Breakfast</option>
//             <option value="dessert">Dessert</option>
//           </select>
//         </div>

//         <div className="flex w-72 justify-between">
//           <h5>Image Link</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={imageValue}
//             onChange={(e) => setImageValue(e.target.value)}
//           />
//         </div>

//         <div className="flex w-72 justify-between">
//           <h5>Name</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={nameValue}
//             onChange={(e) => setNameValue(e.target.value)}
//           />
//         </div>

//         <button className="bg-teal-900 py-2 px-4 my-4 rounded-md" type="submit">
//           SAVE DATA
//         </button>
//       </form>
//       <div className="border-4 border-teal-800 m-4">
//         <div>
//           <div className="mb-10">
//             <h1 className="text-4xl text-white text-center mt-8">
//               Menu lists on your database
//             </h1>
//             <h2 className="text-white text-2xl mb-4 text-center mt-6">
//               Choose a menu
//             </h2>

//             <ul className="flex justify-center ">
//               <li
//                 className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                   fetchCategoryValue === "breakfast" ? "  bg-orange-600" : ""
//                 }`}
//                 onClick={() => handleFetchCategoryChange("breakfast")}
//               >
//                 Breakfast
//               </li>

//               <li
//                 className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                   fetchCategoryValue === "dessert" ? "  bg-orange-600" : ""
//                 }`}
//                 onClick={() => handleFetchCategoryChange("dessert")}
//               >
//                 Dessert
//               </li>
//             </ul>
//           </div>
//         </div>

//         {!emptyCategory ? (
//           <div className="flex flex-wrap justify-center">
//             {menuItems.map((item) => (
//               <div
//                 key={item.id}
//                 className={`m-8 relative border-[2px] rounded-md border-teal-700  ${styles.cardWrapper}`}
//               >
//                 <button
//                   className="absolute top-2 left-2 bg-teal-900 px-4 py-2 rounded-md hover:bg-teal-600"
//                   onClick={() => handleDeleteItem(item.id)}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   className="absolute top-2 right-2 bg-teal-900 hover:bg-teal-600 px-4 py-2 rounded-md"
//                   onClick={() => handleEditItem(item.id, item.name, item.image)} // Pass itemId, name, and image to handleEditItem
//                 >
//                   EDIT
//                 </button>
//                 <Image
//                   src={item.image}
//                   width={600}
//                   height={600}
//                   alt={item.name}
//                 />
//                 <div className={styles.cardInfoDiv}>
//                   <div className={styles.namePrice}>
//                     <h1 className="title1 font1">{item.name}</h1>
//                     <p className={`${styles.dotted}`}></p>
//                   </div>
//                 </div>

//                 <div className="pb-40 w-full h-1"></div>
//                 <div></div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div>
//             <h6 className="text-center text-white text-xl pt-10 mb-40">
//               There is nothing in this category
//             </h6>
//           </div>
//         )}
//       </div>
//       {postEditing ? (
//         <div className=" w-96 h-96 bg-teal-950 top-14 left-1/2  flex flex-col justify-center fixed">
//           <Image src={updateImage} width={400} height={300} alt="any"></Image>
//           <form
//             action=""
//             onSubmit={updateData}
//             className="flex flex-col justify-center gap-[20px]  w-80"
//           >
//             <input
//               type="text"
//               value={updateName}
//               placeholder="update Name"
//               className="text-black   w-full h-10"
//               onChange={(e) => setUpdateName(e.target.value)} // Update the updateName state
//             />
//             <input
//               type="text"
//               value={updateImage}
//               placeholder="update Image Link"
//               className="text-black   h-10"
//               onChange={(e) => setUpdateImage(e.target.value)} // Update the updateImage state
//             />

//             <button
//               className="bg-teal-900 py-2 px-4 my-4 rounded-md"
//               type="submit"
//             >
//               UPDATE DATA
//             </button>
//           </form>
//         </div>
//       ) : null}
//     </>
//   );
// }
