"use client";
import React, { useState, useEffect } from "react";
import { app } from "../firebase";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  remove,
  update,
  child,
  onValue,
} from "firebase/database";
import styles from "./page.module.css";
import Image from "next/image";

interface MenuItemProps {
  image: string;
  name: string;
  id: string;
}

export default function Write() {
  const [menuCategoryValue, setMenuCategoryValue] = useState("");
  const [fetchCategoryValue, setFetchCategoryValue] = useState("breakfast");
  const [imageValue, setImageValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");

  const handleMenuCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMenuCategoryValue(e.target.value);
  };

  const handleFetchCategoryChange = (category: string) => {
    setFetchCategoryValue(category);
  };

  //SAVE
  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Perform data validation
      if (!menuCategoryValue || !imageValue || !nameValue) {
        alert("All fields must be filled");
        return; // Stop execution if validation fails
      }

      // Proceed with saving data to the database
      const db = getDatabase(app);
      const newDocRef = push(ref(db, `menu/${menuCategoryValue}`));

      await set(newDocRef, {
        id: newDocRef.key,
        image: imageValue,
        name: nameValue,
        [menuCategoryValue]: true,
      }).then(() => {
        fetchData();
      });

      alert("Data saved successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };

  //DELETE
  const handleDeleteItem = async (itemId: string) => {
    try {
      const db = getDatabase(app);
      const itemRef = ref(db, `menu/${fetchCategoryValue}/${itemId}`);

      // Check if the item exists before deletion
      const itemSnapshot = await get(itemRef);
      if (!itemSnapshot.exists()) {
        alert("Item does not exist in the database");
        return;
      }

      // Delete the item from the database
      await remove(itemRef);

      // Update the state to remove the deleted item
      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );

      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };
  //FETCH
  const fetchData = async () => {
    try {
      setLoading(true);
      const db = getDatabase(app);
      const dbRef = ref(db, `menu/${fetchCategoryValue}`);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        setMenuItems(Object.values(snapshot.val()) as MenuItemProps[]);
        setEmptyCategory(false);
      } else {
        alert("No data available");
        setEmptyCategory(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  //EDIT
  const [updateName, setUpdateName] = useState<string>();
  const [updateImage, setUpdateImage] = useState<string>();

  const handleEditPost = (id: string) => {
    // Set the itemId state to the ID of the post being edited
    setItemId(id);
    // Set postEditing state to true or perform any other necessary actions
  };

  const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const db = getDatabase(app);

      // Update the data in the database using the itemId state
      await update(ref(db, `menu/${fetchCategoryValue}/${itemId}`), {
        name: updateName,
        image: updateImage,
      });

      alert("Data updated successfully");
      setPostEditing(false); // Hide the modal after updating data
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data");
    }
  };

  const [postEditing, setPostEditing] = useState<boolean>(false);
  //  const updateData = {
  //     name: username,
  //     id: itemId;
  //     image:itemImage
  //   };

  // const newPostKey = push(child(ref(db), "posts")).key;

  // const updates = {};
  // updates["/posts/" + newPostKey] = postData;
  // updates["/user-posts/" + name + "/" + id] = postData;
  // return update(ref(db), updates);
  // }

  useEffect(() => {
    if (fetchCategoryValue) {
      fetchData();
    }
  }, [fetchCategoryValue]);

  return (
    <>
      <form
        onSubmit={saveData}
        className="p-4 items-center flex flex-col border-4 border-teal-800 m-4 "
      >
        <div className="mb-10 flex justify-center flex-col">
          <h2 className="text-white text-2xl mb-4 text-center">
            Create New List For Your Menu
          </h2>
          <select
            className="h-12 text-2xl rounded-md px-2 text-teal-800 m-auto"
            value={menuCategoryValue}
            onChange={handleMenuCategoryChange}
          >
            <option value="">Select category</option>
            <option value="breakfast">Breakfast</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <div className="flex w-72 justify-between">
          <h5>Image Link</h5>
          <input
            className="text-black m-1"
            type="text"
            value={imageValue}
            onChange={(e) => setImageValue(e.target.value)}
          />
        </div>

        <div className="flex w-72 justify-between">
          <h5>Name</h5>
          <input
            className="text-black m-1"
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </div>

        <button className="bg-teal-900 py-2 px-4 my-4 rounded-md" type="submit">
          SAVE DATA
        </button>
      </form>
      <div className="border-4 border-teal-800 m-4">
        <div>
          <div className="mb-10">
            <h1 className="text-4xl text-white text-center mt-8">
              Menu lists on your database
            </h1>
            <h2 className="text-white text-2xl mb-4 text-center mt-6">
              Choose a menu
            </h2>

            <ul className="flex justify-center ">
              <li
                className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
                  fetchCategoryValue === "breakfast" ? "  bg-orange-600" : ""
                }`}
                onClick={() => handleFetchCategoryChange("breakfast")}
              >
                Breakfast
              </li>

              <li
                className={`px-4 py-2 bg-teal-700 mx-1 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
                  fetchCategoryValue === "dessert" ? "  bg-orange-600" : ""
                }`}
                onClick={() => handleFetchCategoryChange("dessert")}
              >
                Dessert
              </li>
            </ul>
          </div>
        </div>

        {!emptyCategory ? (
          <div className="flex flex-wrap justify-center">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`m-8 relative border-[2px] rounded-md border-teal-700  ${styles.cardWrapper}`}
              >
                <button
                  className="absolute top-2 left-2 bg-teal-900 px-4 py-2 rounded-md hover:bg-teal-600"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
                <button
                  className="absolute top-2 right-2 bg-teal-900 hover:bg-teal-600 px-4 py-2 rounded-md"
                  onClick={() => {
                    setPostEditing(true);
                    setItemId(item.id); // Set the itemId state to the current item's id
                  }}
                >
                  EDIT
                </button>
                <Image
                  src={item.image}
                  width={600}
                  height={600}
                  alt={item.name}
                />
                <div className={styles.cardInfoDiv}>
                  <div className={styles.namePrice}>
                    <h1 className="title1 font1">{item.name}</h1>
                    <p className={`${styles.dotted}`}></p>
                  </div>
                </div>

                <div className="pb-40 w-full h-1"></div>
                <div></div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h6 className="text-center text-white text-xl pt-10 mb-40">
              There is nothing in this category
            </h6>
          </div>
        )}
      </div>
      {postEditing ? (
        <div className="w-96 h-96 bg-teal-950 top-14 left-1/2 flex justify-center fixed">
          <form
            action=""
            onSubmit={(e) => updateData(e)} // Pass only the event object to the updateData function
            className="flex flex-col justify-center gap-[20px] w-80"
          >
            <input
              type="text"
              value={updateName}
              placeholder="update Name"
              onChange={(e) => setUpdateName(e.target.value)} // Update the 'updateName' state
              className="text-black bottom-2 w-full h-10"
            />
            <input
              type="text"
              value={updateImage}
              placeholder="update Image Link"
              onChange={(e) => setUpdateImage(e.target.value)} // Update the 'updateImage' state
              className="text-black bottom-10 h-10"
            />

            <button
              className="bg-teal-900 py-2 px-4 my-4 rounded-md"
              type="submit"
            >
              UPDATE DATA
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
