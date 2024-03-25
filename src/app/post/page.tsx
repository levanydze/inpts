"use client";
import CreateNewItem from "./CreateNewItem";
import EditItem from "./EditItem";
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
} from "firebase/database";

export interface SectionsProps {
  menuCategory: string;
  section: string;
  menu: string;
}

export interface MenuItemProps {
  image: string;
  name: string;
  id: string;
  description: string;
  ingredients: string;
  portions: string;
  price: number;
  special: boolean;
  season: boolean;
  vegan: boolean;
  spicy: boolean;
  newItem: boolean;
  disable: boolean;
}

export default function Post() {
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const [sections, setSections] = useState<SectionsProps[]>([]);
  const categories = Object.keys(sections);

  const [loading, setLoading] = useState(false);
  const [emptyCategory, setEmptyCategory] = useState<boolean>(false);
  //Create new item states
  const [menuCategoryValue, setMenuCategoryValue] = useState("");
  const [fetchCategoryValue, setFetchCategoryValue] = useState("breakfast");
  const [imageValue, setImageValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState<string>("");
  const [ingredientsValue, setIngredientsValue] = useState<string>("");
  const [portionsValue, setPortionsValue] = useState<string>("");
  const [priceValue, setPriceValue] = useState<number | string>("");
  const [specialValue, setSpecialValue] = useState<boolean>(false);
  const [seasonValue, setSeasonValue] = useState<boolean>(false);
  const [veganValue, setVeganValue] = useState<boolean>(false);
  const [spicyValue, setSpicyValue] = useState<boolean>(false);
  const [newItemValue, setNewItemValue] = useState<boolean>(false);
  const [disableValue, setDisableValue] = useState<boolean>(false);

  //edit item states
  const [updateName, setUpdateName] = useState<string>("");
  const [updateImage, setUpdateImage] = useState<string>("");
  const [updateDescription, setUpdateDescription] = useState<string>("");
  const [updateIngredients, setUpdateIngredients] = useState<string>("");
  const [updatePortions, setUpdatePortions] = useState<string>("");
  const [updatePrice, setUpdatePrice] = useState<number>(0);
  const [updateSpecial, setUpdateSpecial] = useState<boolean>(false);
  const [updateSeason, setUpdateSeason] = useState<boolean>(false);
  const [updateVegan, setUpdateVegan] = useState<boolean>(false);
  const [updateSpicy, setUpdateSpicy] = useState<boolean>(false);
  const [updateNewItem, setUpdateNewItem] = useState<boolean>(false);
  const [updateDisable, setUpdateDisable] = useState<boolean>(false);
  const [itemId, setItemId] = useState<string>("");

  const handleMenuCategoryChange = (category: string) => {
    setMenuCategoryValue(category);
  };

  const handleFetchCategoryChange = (category: string) => {
    setFetchCategoryValue(category);
  };

  const saveData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !menuCategoryValue ||
        !imageValue
        //  ||
        // !nameValue ||
        // !descriptionValue ||
        // !ingredientsValue ||
        // !portionsValue ||
        // !priceValue
      ) {
        alert("Category and Img Url must be filled");

        return;
      }

      const db = getDatabase(app);
      const newDocRef = push(ref(db, `menu/${menuCategoryValue}`));

      await set(newDocRef, {
        id: newDocRef.key,
        image: imageValue,
        name: nameValue,
        description: descriptionValue,
        ingredients: ingredientsValue,
        portions: portionsValue,
        price: priceValue,
        special: specialValue,
        season: seasonValue,
        vegan: veganValue,
        spicy: spicyValue,
        newItem: newItemValue,
        disable: disableValue,

        [menuCategoryValue]: true,
      });
      console.log("Data saved successfully");
      fetchData();

      // Reset form fields after saving
      setMenuCategoryValue("");
      setImageValue("");
      setNameValue("");
      setDescriptionValue("");
      setIngredientsValue("");
      setPortionsValue("");
      setPriceValue(0);
      setSpecialValue(false);
      setSeasonValue(false);
      setVeganValue(false);
      setSpicyValue(false);
      setNewItemValue(false);
      setDisableValue(false);
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data");
    }
  };
  const handleDeleteItem = async (itemId: string) => {
    try {
      const db = getDatabase(app);
      const itemRef = ref(db, `menu/${fetchCategoryValue}/${itemId}`);

      const itemSnapshot = await get(itemRef);
      if (!itemSnapshot.exists()) {
        alert("Item does not exist in the database");
        return;
      }

      await remove(itemRef);

      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      fetchData();
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    }
  };

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      const db = getDatabase(app);
      const dbRef = ref(db);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        setSections(Object.values(snapshot.val()) as SectionsProps[]);
      } else {
        console.log("No section data available");
      }
    } catch (error) {
      console.error("Error section fetching data:", error);
      alert("Error fetching section data");
    } finally {
      setLoading(false);
    }
  };
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
        console.log("No data available");
        setEmptyCategory(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const [postEditing, setPostEditing] = useState<boolean>(false);
  const updateData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        // !updateName ||
        !updateImage
        //  ||
        // !updateDescription ||
        // !updateIngredients ||
        // !updatePortions ||
        // !updatePrice
      ) {
        alert("Image Url must be filled");
        return;
      }

      const db = getDatabase(app);
      const updates = {
        [`menu/${fetchCategoryValue}/${itemId}/name`]: updateName,
        [`menu/${fetchCategoryValue}/${itemId}/image`]: updateImage,
        [`menu/${fetchCategoryValue}/${itemId}/description`]: updateDescription,
        [`menu/${fetchCategoryValue}/${itemId}/ingredients`]: updateIngredients,
        [`menu/${fetchCategoryValue}/${itemId}/portions`]: updatePortions,
        [`menu/${fetchCategoryValue}/${itemId}/price`]: updatePrice,
        [`menu/${fetchCategoryValue}/${itemId}/special`]: updateSpecial,
        [`menu/${fetchCategoryValue}/${itemId}/season`]: updateSeason,
        [`menu/${fetchCategoryValue}/${itemId}/vegan`]: updateVegan,
        [`menu/${fetchCategoryValue}/${itemId}/spicy`]: updateSpicy,
        [`menu/${fetchCategoryValue}/${itemId}/newItem`]: updateNewItem,
        [`menu/${fetchCategoryValue}/${itemId}/disable`]: updateDisable,
      };

      await update(ref(db), updates);
      setPostEditing(false);
      fetchData();
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Errorupdating data:", error);
      alert("Error updating data");
    }
  };

  const handleEditItem = (
    itemId: string,
    itemName: string,
    itemImage: string,
    itemDescription: string,
    itemIngredients: string,
    itemPortions: string,
    itemPrice: number,
    itemSpecial: boolean,
    itemSeason: boolean,
    itemVegan: boolean,
    itemSpicy: boolean,
    itemNewItem: boolean,
    itemDisable: boolean
  ) => {
    setItemId(itemId);
    setUpdateName(itemName);
    setUpdateImage(itemImage);
    setUpdateDescription(itemDescription);
    setUpdateIngredients(itemIngredients);
    setUpdatePortions(itemPortions);
    setUpdatePrice(itemPrice);
    setUpdateSpecial(itemSpecial);
    setUpdateSeason(itemSeason);
    setUpdateVegan(itemVegan);
    setUpdateSpicy(itemSpicy);
    setUpdateNewItem(itemNewItem);
    setUpdateDisable(itemDisable);

    setPostEditing(true);
  };

  useEffect(() => {
    if (fetchCategoryValue) {
      fetchData();
      fetchCategoryData();
    }
  }, [fetchCategoryValue]);
  return (
    <main>
      <CreateNewItem
        saveData={saveData}
        handleMenuCategoryChange={handleMenuCategoryChange}
        menuCategoryValue={menuCategoryValue}
        setImageValue={setImageValue}
        imageValue={imageValue}
        setNameValue={setNameValue}
        nameValue={nameValue}
        descriptionValue={descriptionValue}
        setDescriptionValue={setDescriptionValue}
        ingredientsValue={ingredientsValue}
        setIngredientsValue={setIngredientsValue}
        portionsValue={portionsValue}
        setPortionsValue={setPortionsValue}
        priceValue={priceValue}
        setPriceValue={setPriceValue}
        specialValue={specialValue}
        setSpecialValue={setSpecialValue}
        seasonValue={seasonValue}
        setSeasonValue={setSeasonValue}
        veganValue={veganValue}
        setVeganValue={setVeganValue}
        spicyValue={spicyValue}
        setSpicyValue={setSpicyValue}
        newItemValue={newItemValue}
        setNewItemValue={setNewItemValue}
        disableValue={disableValue}
        setDisableValue={setDisableValue}
      />

      <EditItem
        fetchCategoryValue={fetchCategoryValue}
        handleFetchCategoryChange={handleFetchCategoryChange}
        emptyCategory={emptyCategory}
        menuItems={menuItems}
        sections={sections}
        handleDeleteItem={handleDeleteItem}
        updateName={updateName}
        updateImage={updateImage}
        updateDescription={updateDescription}
        updateIngredients={updateIngredients}
        updatePortions={updatePortions}
        updatePrice={updatePrice}
        updateSpecial={updateSpecial}
        updateSeason={updateSeason}
        updateVegan={updateVegan}
        updateSpicy={updateSpicy}
        updateNewItem={updateNewItem}
        updateDisable={updateDisable}
        updateData={updateData}
        handleEditItem={handleEditItem}
        setUpdateImage={setUpdateImage}
        setUpdateName={setUpdateName}
        setUpdateDescription={setUpdateDescription}
        setUpdateIngredients={setUpdateIngredients}
        setUpdatePortions={setUpdatePortions}
        setUpdatePrice={setUpdatePrice}
        setUpdateSpecial={setUpdateSpecial}
        setUpdateSeason={setUpdateSeason}
        setUpdateVegan={setUpdateVegan}
        setUpdateSpicy={setUpdateSpicy}
        setUpdateNewItem={setUpdateNewItem}
        setUpdateDisable={setUpdateDisable}
        postEditing={postEditing}
        setPostEditing={setPostEditing}
      />
    </main>
  );
}
