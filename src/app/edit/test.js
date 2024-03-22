// "use client";
// import React, { useState, useEffect } from "react";
// import { app } from "../firebase";
// import { getDatabase, ref, set, push, get } from "firebase/database";
// import styles from "./page.module.css";
// import Image from "next/image";

// interface MenuItemProps {
//   image: string;
//   name: string;
//   description: string;
//   ingredients: string;
//   portions: string;
//   price: number;
//   special: boolean;
//   season: boolean;
//   vegan: boolean;
//   spicy: boolean;
//   newItem: boolean;
//   breakfast: boolean;
//   lunch: boolean;
//   dinner: boolean;
//   dessert: boolean;
//   drink: boolean;
//   pizza: boolean;
//   id: string;
// }

// export default function Write() {
//   const [postCategoryValue, setPostCategoryValue] = useState("");
//   const [fetchCategoryValue, setFetchCategoryValue] = useState("breakfast");
//   const [imageValue, setImageValue] = useState("");
//   const [nameValue, setNameValue] = useState("");
//   const [descriptionValue, setDescriptionValue] = useState("");
//   const [ingredientsValue, setIngredientsValue] = useState("");
//   const [portionsValue, setPortionsValue] = useState("");
//   const [specialValue, setSpecialValue] = useState(false);
//   const [seasonValue, setSeasonValue] = useState(false);
//   const [veganValue, setVeganValue] = useState(false);
//   const [spicyValue, setSpicyValue] = useState(false);
//   const [newItemValue, setNewItemValue] = useState(false);
//   const [priceValue, setPriceValue] = useState("");
//   const [itemEditing, setItemEditing] = useState<boolean>(true);

//   const handlePostCategoryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setPostCategoryValue(e.target.value);
//   };

//   const handleFetchCategoryChange = (category: string) => {
//     setFetchCategoryValue(category);
//     // console.log(fetchCategoryValue);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setter: Function
//   ) => {
//     setter(e.target.value);
//   };

//   const saveData = async () => {
//     try {
//       const db = getDatabase(app);
//       const newDocRef = push(ref(db, `menu/${postCategoryValue}`));

//       await set(newDocRef, {
//         id: newDocRef.key,
//         image: imageValue,
//         name: nameValue,
//         description: descriptionValue,
//         ingredients: ingredientsValue,
//         portions: portionsValue,
//         special: specialValue,
//         season: seasonValue,
//         vegan: veganValue,
//         spicy: spicyValue,
//         newItem: newItemValue,
//         price: priceValue,
//         [postCategoryValue]: true,
//       });
//       // const newId = newDocRef.key;
//       // console.log("Here is the generated ID:", newId);
//       alert("Data saved successfully");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Error saving data");
//     }
//   };

//   const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [emptyCategory, setEmptyCategory] = useState<boolean>(false);
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

//   const setImageValueForCard = (newValue: string, cardId: string) => {
//     setMenuItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === cardId ? { ...item, image: newValue } : item
//       )
//     );
//   };

//   useEffect(() => {
//     if (fetchCategoryValue) {
//       fetchData();
//     }
//   }, [fetchCategoryValue]);

//   return (
//     <>
//       <div className="p-4 items-center flex flex-col">
//         <div className="mb-10 flex justify-center flex-col">
//           <h2 className="text-white text-2xl mb-4 text-center">
//             Create New List For Your Menu
//           </h2>
//           <select
//             className=" h-12 text-2xl rounded-md px-2 text-teal-800 m-auto "
//             value={postCategoryValue}
//             onChange={handlePostCategoryChange}
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
//         <div className="flex w-72 justify-between">
//           <h5>Description</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={descriptionValue}
//             onChange={(e) => setDescriptionValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between">
//           <h5>Ingredients</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={ingredientsValue}
//             onChange={(e) => setIngredientsValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between">
//           <h5>Portions</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={portionsValue}
//             placeholder="S / M or 150g / 250g"
//             onChange={(e) => setPortionsValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between border-2 border-teal-600 px-2">
//           <h5>Price</h5>
//           <input
//             className="text-black m-1"
//             type="number"
//             value={priceValue}
//             onChange={(e) => setPriceValue(e.target.value)}
//           />
//         </div>
//         <div className="flex my-6 gap-6">
//           <div className="flex">
//             <h5>Special</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={specialValue}
//               onChange={(e) => setSpecialValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>Season</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={seasonValue}
//               placeholder="seasonValue"
//               onChange={(e) => setSeasonValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>Vegan</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={veganValue}
//               placeholder="veganValue"
//               onChange={(e) => setVeganValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex ">
//             <h5>Spicy</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={spicyValue}
//               placeholder="spicyValue"
//               onChange={(e) => setSpicyValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>New item</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={newItemValue}
//               placeholder="newItemValue"
//               onChange={(e) => setNewItemValue(e.target.checked)}
//             />
//           </div>
//         </div>

//         <button className="bg-teal-900 py-2 px-4" onClick={saveData}>
//           SAVE DATA
//         </button>
//       </div>
//       <div>
//         <div className="mb-10">
//           <h2 className="text-white text-2xl mb-4 text-center mt-20">
//             Choose a menu
//           </h2>

//           <ul className="flex justify-center  ">
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "breakfast" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("breakfast")}
//             >
//               Breakfast
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "lunch" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("lunch")}
//             >
//               Lunch
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "dinner" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("dinner")}
//             >
//               Dinner
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "dessert" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("dessert")}
//             >
//               Dessert
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "drink" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("drink")}
//             >
//               Drink
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "pizza" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("pizza")}
//             >
//               Pizza
//             </li>
//           </ul>
//         </div>
//       </div>

//       <h1 className="text-4xl text-white text-center mb-20">Menu List</h1>
//       {!emptyCategory ? (
//         <div className="flex flex-wrap justify-center">
//           {menuItems.map((item, index) => {
//             console.log(item);
//             return (
//               <div key={item.id} className={`m-8 ${styles.cardWrapper}`}>
//                 <Image
//                   src={item.image}
//                   width={600}
//                   height={600}
//                   alt={item.name}
//                 />
//                 {!itemEditing ? (
//                   <div className={styles.cardInfoDiv}>
//                     <div className={styles.namePrice}>
//                       <h1 className="title1 font1">{item.name}</h1>
//                       <p className={`${styles.dotted}`}></p>
//                       <h6>{item.price} sek</h6>
//                     </div>
//                     <h2 className="title0 font1 textMedium">
//                       {item.ingredients.length > 40
//                         ? item.ingredients.substring(0, 40) + "..."
//                         : item.ingredients}
//                     </h2>
//                     <div className={styles.details}>
//                       {item.portions && (
//                         <h5 className="title0 font1">{item.portions}</h5>
//                       )}
//                       {item.vegan && (
//                         <p className={`menuTags ${styles.vegan}`}>VEGAN</p>
//                       )}
//                       {item.special && (
//                         <p className={`menuTags ${styles.special}`}>SPECIAL</p>
//                       )}
//                       {item.season && (
//                         <p className={`menuTags ${styles.season}`}>SEASON</p>
//                       )}
//                       {item.spicy && (
//                         <p className={`menuTags ${styles.spicy}`}>SPICY</p>
//                       )}
//                       {item.newItem && (
//                         <p className={`menuTags ${styles.newItem}`}>NEW</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Image Link</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={imageValue}
//                         onChange={(e) =>
//                           setImageValueForCard(e.target.value, item.id)
//                         }
//                       />
//                     </div>

//                     <div className="flex w-72 justify-between">
//                       <h5>Name</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={nameValue}
//                         onChange={(e) => setNameValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Description</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={descriptionValue}
//                         onChange={(e) => setDescriptionValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Ingredients</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={ingredientsValue}
//                         onChange={(e) => setIngredientsValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Portions</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={portionsValue}
//                         placeholder="S / M or 150g / 250g"
//                         onChange={(e) => setPortionsValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between border-2 border-teal-600 px-2">
//                       <h5>Price</h5>
//                       <input
//                         className="text-black m-1"
//                         type="number"
//                         value={priceValue}
//                         onChange={(e) => setPriceValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex my-6 gap-6">
//                       <div className="flex">
//                         <h5>Special</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={specialValue}
//                           onChange={(e) => setSpecialValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex">
//                         <h5>Season</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={seasonValue}
//                           placeholder="seasonValue"
//                           onChange={(e) => setSeasonValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex">
//                         <h5>Vegan</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={veganValue}
//                           placeholder="veganValue"
//                           onChange={(e) => setVeganValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex ">
//                         <h5>Spicy</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={spicyValue}
//                           placeholder="spicyValue"
//                           onChange={(e) => setSpicyValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex">
//                         <h5>New item</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={newItemValue}
//                           placeholder="newItemValue"
//                           onChange={(e) => setNewItemValue(e.target.checked)}
//                         />
//                       </div>
//                     </div>
//                     <button>UPDATE</button>
//                   </div>
//                 )}
//                 <div className="pb-40 w-full h-1"></div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div>
//           <h6 className="text-center text-white text-xl pt-10 mb-40">
//             There is nothing in this category
//           </h6>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import { app } from "../firebase";
// import { getDatabase, ref, set, push, get } from "firebase/database";
// import styles from "./page.module.css";
// import Image from "next/image";

// interface MenuItemProps {
//   image: string;
//   name: string;
//   description: string;
//   ingredients: string;
//   portions: string;
//   special: boolean;
//   season: boolean;
//   vegan: boolean;
//   spicy: boolean;
//   newItem: boolean;
//   price: number;
//   breakfast: boolean;
//   lunch: boolean;
//   dinner: boolean;
//   dessert: boolean;
//   drink: boolean;
//   pizza: boolean;
//   id: string;
// }

// export default function Write() {
//   const [postCategoryValue, setPostCategoryValue] = useState("");
//   const [fetchCategoryValue, setFetchCategoryValue] = useState("breakfast");
//   const [imageValue, setImageValue] = useState("");
//   const [nameValue, setNameValue] = useState("");
//   const [descriptionValue, setDescriptionValue] = useState("");
//   const [ingredientsValue, setIngredientsValue] = useState("");
//   const [portionsValue, setPortionsValue] = useState("");
//   const [specialValue, setSpecialValue] = useState(false);
//   const [seasonValue, setSeasonValue] = useState(false);
//   const [veganValue, setVeganValue] = useState(false);
//   const [spicyValue, setSpicyValue] = useState(false);
//   const [newItemValue, setNewItemValue] = useState(false);
//   const [priceValue, setPriceValue] = useState("");

//   const handlePostCategoryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setPostCategoryValue(e.target.value);
//   };

//   const handleFetchCategoryChange = (category: string) => {
//     setFetchCategoryValue(category);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setter: Function
//   ) => {
//     setter(e.target.value);
//   };

//   const saveData = async () => {
//     try {
//       const db = getDatabase(app);
//       const newDocRef = push(ref(db, `menu/${postCategoryValue}`));

//       await set(newDocRef, {
//         id: newDocRef.key,
//         image: imageValue,
//         name: nameValue,
//         description: descriptionValue,
//         ingredients: ingredientsValue,
//         portions: portionsValue,
//         special: specialValue,
//         season: seasonValue,
//         vegan: veganValue,
//         spicy: spicyValue,
//         newItem: newItemValue,
//         price: priceValue,
//         [postCategoryValue]: true,
//       });

//       alert("Data saved successfully");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Error saving data");
//     }
//   };

//   const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [emptyCategory, setEmptyCategory] = useState<boolean>(false);

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

//   useEffect(() => {
//     if (fetchCategoryValue) {
//       fetchData();
//     }
//   }, [fetchCategoryValue]);

//   return (
//     <>
//       <div className="p-4 items-center flex flex-col">
//         <div className="mb-10 flex justify-center flex-col">
//           <h2 className="text-white text-2xl mb-4 text-center">
//             Create New List For Your Menu
//           </h2>
//           <select
//             className="h-12 text-2xl rounded-md px-2 text-teal-800 m-auto"
//             value={postCategoryValue}
//             onChange={handlePostCategoryChange}
//           >
//             <option value="">Select category</option>
//             <option value="breakfast">Breakfast</option>
//             <option value="lunch">Lunch</option>
//             <option value="dinner">Dinner</option>
//             <option value="dessert">Dessert</option>
//             <option value="drink">Drink</option>
//             <option value="pizza">Pizza</option>
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
//         <div className="flex w-72 justify-between">
//           <h5>Description</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={descriptionValue}
//             onChange={(e) => setDescriptionValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between">
//           <h5>Ingredients</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={ingredientsValue}
//             onChange={(e) => setIngredientsValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between">
//           <h5>Portions</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={portionsValue}
//             placeholder="S / M or 150g / 250g"
//             onChange={(e) => setPortionsValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between border-2 border-teal-600 px-2">
//           <h5>Price</h5>
//           <input
//             className="text-black m-1"
//             type="number"
//             value={priceValue}
//             onChange={(e) => setPriceValue(e.target.value)}
//           />
//         </div>
//         <div className="flex my-6 gap-6">
//           <div className="flex">
//             <h5>Special</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={specialValue}
//               onChange={(e) => setSpecialValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>Season</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={seasonValue}
//               placeholder="seasonValue"
//               onChange={(e) => setSeasonValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>Vegan</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={veganValue}
//               placeholder="veganValue"
//               onChange={(e) => setVeganValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex ">
//             <h5>Spicy</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={spicyValue}
//               placeholder="spicyValue"
//               onChange={(e) => setSpicyValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>New item</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={newItemValue}
//               placeholder="newItemValue"
//               onChange={(e) => setNewItemValue(e.target.checked)}
//             />
//           </div>
//         </div>

//         <button className="bg-teal-900 py-2 px-4" onClick={saveData}>
//           SAVE DATA
//         </button>
//       </div>
//       <div>
//         <div className="mb-10">
//           <h2 className="text-white text-2xl mb-4 text-center mt-20">
//             Choose a menu
//           </h2>

//           <ul className="flex justify-center">
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "breakfast" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("breakfast")}
//             >
//               Breakfast
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "lunch" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("lunch")}
//             >
//               Lunch
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "dinner" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("dinner")}
//             >
//               Dinner
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "dessert" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("dessert")}
//             >
//               Dessert
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "drink" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("drink")}
//             >
//               Drink
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "pizza" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("pizza")}
//             >
//               Pizza
//             </li>
//           </ul>
//         </div>
//       </div>

//       <h1 className="text-4xl text-white text-center mb-20">Menu List</h1>
//       {!emptyCategory ? (
//         <div className="flex flex-wrap justify-center">
//           {menuItems.map((item, index) => {
//             console.log(item);
//             return (
//               <div key={item.id} className={`m-8 ${styles.cardWrapper}`}>
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
//                     <h6>{item.price} sek</h6>
//                   </div>
//                   <h2 className="title0 font1 textMedium">
//                     {item.ingredients.length > 40
//                       ? item.ingredients.substring(0, 40) + "..."
//                       : item.ingredients}
//                   </h2>
//                   <div className={styles.details}>
//                     {item.portions && (
//                       <h5 className="title0 font1">{item.portions}</h5>
//                     )}
//                     {item.vegan && (
//                       <p className={`menuTags ${styles.vegan}`}>VEGAN</p>
//                     )}
//                     {item.special && (
//                       <p className={`menuTags ${styles.special}`}>SPECIAL</p>
//                     )}
//                     {item.season && (
//                       <p className={`menuTags ${styles.season}`}>SEASON</p>
//                     )}
//                     {item.spicy && (
//                       <p className={`menuTags ${styles.spicy}`}>SPICY</p>
//                     )}
//                     {item.newItem && (
//                       <p className={`menuTags ${styles.newItem}`}>NEW</p>
//                     )}
//                   </div>
//                 </div>
//                 <div className="pb-40 w-full h-1"></div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div>
//           <h6 className="text-center text-white text-xl pt-10 mb-40">
//             There is nothing in this category
//           </h6>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";
// import React, { useState, useEffect } from "react";
// import { app } from "../firebase";
// import { getDatabase, ref, set, push, get } from "firebase/database";
// import styles from "./page.module.css";
// import Image from "next/image";

// interface MenuItemProps {
//   image: string;
//   name: string;
//   description: string;
//   ingredients: string;
//   portions: string;
//   special: boolean;
//   season: boolean;
//   vegan: boolean;
//   spicy: boolean;
//   newItem: boolean;
//   price: number;
//   breakfast: boolean;
//   lunch: boolean;
//   dinner: boolean;
//   dessert: boolean;
//   drink: boolean;
//   pizza: boolean;
//   id: string;
// }

// export default function Write() {
//   const [postCategoryValue, setPostCategoryValue] = useState("");
//   const [fetchCategoryValue, setFetchCategoryValue] = useState("breakfast");
//   const [imageValue, setImageValue] = useState("");
//   const [nameValue, setNameValue] = useState("");
//   const [descriptionValue, setDescriptionValue] = useState("");
//   const [ingredientsValue, setIngredientsValue] = useState("");
//   const [portionsValue, setPortionsValue] = useState("");
//   const [specialValue, setSpecialValue] = useState(false);
//   const [seasonValue, setSeasonValue] = useState(false);
//   const [veganValue, setVeganValue] = useState(false);
//   const [spicyValue, setSpicyValue] = useState(false);
//   const [newItemValue, setNewItemValue] = useState(false);
//   const [priceValue, setPriceValue] = useState("");
//   const [itemEditing, setItemEditing] = useState<boolean>(true);

//   const handlePostCategoryChange = (
//     e: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     setPostCategoryValue(e.target.value);
//   };

//   const handleFetchCategoryChange = (category: string) => {
//     setFetchCategoryValue(category);
//     // console.log(fetchCategoryValue);
//   };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setter: Function
//   ) => {
//     setter(e.target.value);
//   };

//   const saveData = async () => {
//     try {
//       const db = getDatabase(app);
//       const newDocRef = push(ref(db, `menu/${postCategoryValue}`));

//       await set(newDocRef, {
//         id: newDocRef.key,
//         image: imageValue,
//         name: nameValue,
//         description: descriptionValue,
//         ingredients: ingredientsValue,
//         portions: portionsValue,
//         special: specialValue,
//         season: seasonValue,
//         vegan: veganValue,
//         spicy: spicyValue,
//         newItem: newItemValue,
//         price: priceValue,
//         [postCategoryValue]: true,
//       });
//       // const newId = newDocRef.key;
//       // console.log("Here is the generated ID:", newId);
//       alert("Data saved successfully");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Error saving data");
//     }
//   };

//   const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [emptyCategory, setEmptyCategory] = useState<boolean>(false);
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

//   useEffect(() => {
//     if (fetchCategoryValue) {
//       fetchData();
//     }
//   }, [fetchCategoryValue]);

//   return (
//     <>
//       <div className="p-4 items-center flex flex-col">
//         <div className="mb-10 flex justify-center flex-col">
//           <h2 className="text-white text-2xl mb-4 text-center">
//             Create New List For Your Menu
//           </h2>
//           <select
//             className=" h-12 text-2xl rounded-md px-2 text-teal-800 m-auto "
//             value={postCategoryValue}
//             onChange={handlePostCategoryChange}
//           >
//             <option value="">Select category</option>
//             <option value="breakfast">Breakfast</option>
//             <option value="lunch">Lunch</option>
//             <option value="dinner">Dinner</option>
//             <option value="dessert">Dessert</option>
//             <option value="drink">Drink</option>
//             <option value="pizza">Pizza</option>
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
//         <div className="flex w-72 justify-between">
//           <h5>Description</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={descriptionValue}
//             onChange={(e) => setDescriptionValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between">
//           <h5>Ingredients</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={ingredientsValue}
//             onChange={(e) => setIngredientsValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between">
//           <h5>Portions</h5>
//           <input
//             className="text-black m-1"
//             type="text"
//             value={portionsValue}
//             placeholder="S / M or 150g / 250g"
//             onChange={(e) => setPortionsValue(e.target.value)}
//           />
//         </div>
//         <div className="flex w-72 justify-between border-2 border-teal-600 px-2">
//           <h5>Price</h5>
//           <input
//             className="text-black m-1"
//             type="number"
//             value={priceValue}
//             onChange={(e) => setPriceValue(e.target.value)}
//           />
//         </div>
//         <div className="flex my-6 gap-6">
//           <div className="flex">
//             <h5>Special</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={specialValue}
//               onChange={(e) => setSpecialValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>Season</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={seasonValue}
//               placeholder="seasonValue"
//               onChange={(e) => setSeasonValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>Vegan</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={veganValue}
//               placeholder="veganValue"
//               onChange={(e) => setVeganValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex ">
//             <h5>Spicy</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={spicyValue}
//               placeholder="spicyValue"
//               onChange={(e) => setSpicyValue(e.target.checked)}
//             />
//           </div>
//           <div className="flex">
//             <h5>New item</h5>
//             <input
//               className="text-black m-1"
//               type="checkbox"
//               checked={newItemValue}
//               placeholder="newItemValue"
//               onChange={(e) => setNewItemValue(e.target.checked)}
//             />
//           </div>
//         </div>

//         <button className="bg-teal-900 py-2 px-4" onClick={saveData}>
//           SAVE DATA
//         </button>
//       </div>
//       <div>
//         <div className="mb-10">
//           <h2 className="text-white text-2xl mb-4 text-center mt-20">
//             Choose a menu
//           </h2>

//           <ul className="flex justify-center  ">
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "breakfast" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("breakfast")}
//             >
//               Breakfast
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "lunch" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("lunch")}
//             >
//               Lunch
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "dinner" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("dinner")}
//             >
//               Dinner
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "dessert" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("dessert")}
//             >
//               Dessert
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "drink" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("drink")}
//             >
//               Drink
//             </li>
//             <li
//               className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
//                 fetchCategoryValue === "pizza" ? "  bg-orange-600" : ""
//               }`}
//               onClick={() => handleFetchCategoryChange("pizza")}
//             >
//               Pizza
//             </li>
//           </ul>
//         </div>
//       </div>

//       <h1 className="text-4xl text-white text-center mb-20">Menu List</h1>
//       {!emptyCategory ? (
//         <div className="flex flex-wrap justify-center">
//           {menuItems.map((item, index) => {
//             console.log(item);
//             return (
//               <div key={item.id} className={`m-8 ${styles.cardWrapper}`}>
//                 <Image
//                   src={item.image}
//                   width={600}
//                   height={600}
//                   alt={item.name}
//                 />
//                 {!itemEditing ? (
//                   <div className={styles.cardInfoDiv}>
//                     <div className={styles.namePrice}>
//                       <h1 className="title1 font1">{item.name}</h1>
//                       <p className={`${styles.dotted}`}></p>
//                       <h6>{item.price} sek</h6>
//                     </div>
//                     <h2 className="title0 font1 textMedium">
//                       {item.ingredients.length > 40
//                         ? item.ingredients.substring(0, 40) + "..."
//                         : item.ingredients}
//                     </h2>
//                     <div className={styles.details}>
//                       {item.portions && (
//                         <h5 className="title0 font1">{item.portions}</h5>
//                       )}
//                       {item.vegan && (
//                         <p className={`menuTags ${styles.vegan}`}>VEGAN</p>
//                       )}
//                       {item.special && (
//                         <p className={`menuTags ${styles.special}`}>SPECIAL</p>
//                       )}
//                       {item.season && (
//                         <p className={`menuTags ${styles.season}`}>SEASON</p>
//                       )}
//                       {item.spicy && (
//                         <p className={`menuTags ${styles.spicy}`}>SPICY</p>
//                       )}
//                       {item.newItem && (
//                         <p className={`menuTags ${styles.newItem}`}>NEW</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Image Link</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={editingImageValue}
//                         onChange={(e) => setImageValue(e.target.value)}
//                       />
//                     </div>

//                     <div className="flex w-72 justify-between">
//                       <h5>Name</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={nameValue}
//                         onChange={(e) => setNameValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Description</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={descriptionValue}
//                         onChange={(e) => setDescriptionValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Ingredients</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={ingredientsValue}
//                         onChange={(e) => setIngredientsValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between">
//                       <h5>Portions</h5>
//                       <input
//                         className="text-black m-1"
//                         type="text"
//                         value={portionsValue}
//                         placeholder="S / M or 150g / 250g"
//                         onChange={(e) => setPortionsValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex w-72 justify-between border-2 border-teal-600 px-2">
//                       <h5>Price</h5>
//                       <input
//                         className="text-black m-1"
//                         type="number"
//                         value={priceValue}
//                         onChange={(e) => setPriceValue(e.target.value)}
//                       />
//                     </div>
//                     <div className="flex my-6 gap-6">
//                       <div className="flex">
//                         <h5>Special</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={specialValue}
//                           onChange={(e) => setSpecialValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex">
//                         <h5>Season</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={seasonValue}
//                           placeholder="seasonValue"
//                           onChange={(e) => setSeasonValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex">
//                         <h5>Vegan</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={veganValue}
//                           placeholder="veganValue"
//                           onChange={(e) => setVeganValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex ">
//                         <h5>Spicy</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={spicyValue}
//                           placeholder="spicyValue"
//                           onChange={(e) => setSpicyValue(e.target.checked)}
//                         />
//                       </div>
//                       <div className="flex">
//                         <h5>New item</h5>
//                         <input
//                           className="text-black m-1"
//                           type="checkbox"
//                           checked={newItemValue}
//                           placeholder="newItemValue"
//                           onChange={(e) => setNewItemValue(e.target.checked)}
//                         />
//                       </div>
//                     </div>
//                     <button>UPDATE</button>
//                   </div>
//                 )}
//                 <div className="pb-40 w-full h-1"></div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div>
//           <h6 className="text-center text-white text-xl pt-10 mb-40">
//             There is nothing in this category
//           </h6>
//         </div>
//       )}
//     </>
//   );
// }
