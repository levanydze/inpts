import React, { useState } from "react";

import styles from "./CreateNewItem.module.css";
import Image from "next/image";
const categories = [
  { value: "breakfast", label: "Breakfast" },
  { value: "dessert", label: "Dessert" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "drinks", label: "Drinks" },
  { value: "special", label: "Special" },
];

interface CreateNewItemProps {
  saveData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Change the function signature
  handleMenuCategoryChange: (category: string) => void;
  menuCategoryValue: string;
  imageValue: string;
  nameValue: string;
  descriptionValue: string;
  ingredientsValue: string;
  portionsValue: string;
  priceValue: number;
  specialValue: boolean;
  seasonValue: boolean;
  veganValue: boolean;
  spicyValue: boolean;
  newItemValue: boolean;
  disableValue: boolean;
  setImageValue: (value: string) => void;
  setNameValue: (value: string) => void;
  setDescriptionValue: (value: string) => void;
  setIngredientsValue: (value: string) => void;
  setPortionsValue: (value: string) => void;
  setPriceValue: (value: number) => void;
  setSpecialValue: (value: boolean) => void;
  setSeasonValue: (value: boolean) => void;
  setVeganValue: (value: boolean) => void;
  setSpicyValue: (value: boolean) => void;
  setNewItemValue: (value: boolean) => void;
  setDisableValue: (value: boolean) => void;
}

export default function CreateNewItem({
  saveData,
  handleMenuCategoryChange,
  menuCategoryValue,
  imageValue,
  nameValue,
  descriptionValue,
  ingredientsValue,
  portionsValue,
  priceValue,
  specialValue,
  seasonValue,
  veganValue,
  spicyValue,
  newItemValue,
  disableValue,
  setImageValue,
  setNameValue,
  setDescriptionValue,
  setIngredientsValue,
  setPortionsValue,
  setPriceValue,
  setSpecialValue,
  setSeasonValue,
  setVeganValue,
  setSpicyValue,
  setNewItemValue,
  setDisableValue,
}: CreateNewItemProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  return (
    <div>
      {isCreateModalOpen ? (
        <form
          onSubmit={saveData}
          className={`p-4 items-center flex flex-col border-4 border-teal-800 m-4 `}
        >
          <div className="m-2">
            <h2 className="text-white text-2xl mb-4 text-center">
              Create New List For Your Menu
            </h2>
          </div>
          <div className={styles.allInputWrapper}>
            <div className={styles.selectCategoryInput}>
              <h3>Category</h3>
              <div className="selectWrapper">
                <select
                  value={menuCategoryValue}
                  onChange={(e) => handleMenuCategoryChange(e.target.value)}
                >
                  <option className="flex justify-center" value="">
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.imgTextNameWrap}>
              <Image
                className="mr-2"
                src={
                  !imageValue
                    ? "https://github.com/levanydze/restaurant2024support/blob/main/icons/apple.png?raw=true"
                    : imageValue
                }
                width={400}
                height={300}
                alt="any"
              ></Image>
              <div className="w-full flex flex-col justify-evenly">
                <div className={` ${styles.textInputWrapper}`}>
                  <p>Image Link</p>
                  <input
                    className="text-black m-1"
                    type="text"
                    value={imageValue}
                    onChange={(e) => setImageValue(e.target.value)}
                  />
                </div>
                <div className={styles.textInputWrapper}>
                  <p>Name</p>
                  <input
                    className="text-black m-1"
                    type="text"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className={styles.textInputWrapper}>
              <p>Description</p>
              <input
                className="text-black m-1"
                type="text"
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
              />
            </div>
            <div className={styles.textInputWrapper}>
              <p>Ingredients</p>
              <input
                className="text-black m-1"
                type="text"
                value={ingredientsValue}
                onChange={(e) => setIngredientsValue(e.target.value)}
              />
            </div>
            <div className={styles.textInputWrapper}>
              <p>Portions</p>
              <input
                className="text-black m-1"
                type="text"
                value={portionsValue}
                onChange={(e) => setPortionsValue(e.target.value)}
              />
            </div>
            <div className={styles.textInputWrapper}>
              <p>Price</p>
              <input
                className="text-black m-1"
                type="number"
                value={priceValue}
                onChange={(e) => setPriceValue(parseFloat(e.target.value))}
              />
              <p>sek</p>
            </div>
            <div className={styles.checkBoxesWrapper}>
              <div>
                <p>Special</p>
                <input
                  type="checkbox"
                  checked={specialValue}
                  onChange={(e) => setSpecialValue(e.target.checked)}
                />
              </div>
              <div>
                <p>Season</p>
                <input
                  type="checkbox"
                  checked={seasonValue}
                  onChange={(e) => setSeasonValue(e.target.checked)}
                />
              </div>
              <div>
                <p>Vegan</p>
                <input
                  type="checkbox"
                  checked={veganValue}
                  onChange={(e) => setVeganValue(e.target.checked)}
                />
              </div>
              <div>
                <p>Spicy</p>
                <input
                  type="checkbox"
                  checked={spicyValue}
                  onChange={(e) => setSpicyValue(e.target.checked)}
                />
              </div>
              <div>
                <p>New</p>
                <input
                  type="checkbox"
                  checked={newItemValue}
                  onChange={(e) => setNewItemValue(e.target.checked)}
                />
              </div>
              {/* <div>
              <p>Disabled?</p>
              <input
                type="checkbox"
                checked={disableValue}
                onChange={(e) => setDisableValue(e.target.checked)}
              />
            </div> */}
            </div>
            <div
              className={`flex px-4 py-2 rounded-md justify-evenly w-72 m-auto mt-6 ${
                disableValue ? " text-gray-400 bg-red-900" : " bg-teal-600 "
              }`}
            >
              <p>
                {" "}
                Product Is {disableValue ? "Disabeled Now" : "Enabled Now"}
              </p>
              <input
                className="h-6 w-6 my-auto"
                type="checkbox"
                checked={disableValue}
                onChange={(e) => setDisableValue(e.target.checked)} // Update the updateNewItem state
              />
            </div>
          </div>
          <div>
            <button
              className=" mx-3 bg-green-700 py-2 px-4 my-4 rounded-md"
              type="submit"
            >
              SAVE NEW DATA
            </button>
            <button
              className="mx-3 bg-red-700 py-2 px-4 my-4 rounded-md"
              onClick={() => setIsCreateModalOpen(false)}
            >
              CANCEL
            </button>
          </div>
        </form>
      ) : (
        <div
          className="border-2 border-teal-700 w-[200px] h-[200px] m-auto my-[50px] flex  flex-col  cursor-pointer text-green-600"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <p className=" text-center text-[80px] ">+</p>
          <p className=" text-center"> Add New Product</p>
        </div>
      )}
    </div>
  );
}
