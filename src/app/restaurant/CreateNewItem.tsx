"use client";
import React, { useState } from "react";
import { CreateNewItemProps } from "./types";

import styles from "./CreateNewItem.module.css";
import Image from "next/image";

export default function CreateNewItem({
  categories,
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
  priorityValue,
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
  setPriorityValue,
}: CreateNewItemProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  return (
    <div
      className={`${styles.animate} ${
        isCreateModalOpen ? styles.visible : styles.hidden
      }  `}
    >
      <div>
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
              <div className={`flex ${styles.selectWrapper}`}>
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

                {!menuCategoryValue ? (
                  <span className="text-red-500 text-3xl h-4">*</span>
                ) : null}
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
                alt="Error in Url"
              ></Image>
              <div className="w-full flex flex-col justify-evenly">
                <div className={` ${styles.textInputWrapper}`}>
                  <p>Image Url</p>
                  <input
                    className="text-black m-1"
                    type="text"
                    value={imageValue}
                    onChange={(e) => setImageValue(e.target.value)}
                  />
                </div>
                <div className={styles.textInputWrapper}>
                  <p className="flex justify-between px-5">
                    Name
                    {!nameValue ? (
                      <span className="text-red-500 text-3xl h-4">*</span>
                    ) : null}
                  </p>
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
            </div>
            <div className={styles.textInputWrapper}>
              <p className="flex justify-between px-4 ">
                Priority
                {!priorityValue ? (
                  <span className="text-red-500 text-3xl h-4">*</span>
                ) : null}
              </p>
              <input
                type="number"
                value={priorityValue}
                placeholder="1 = First   (can be also 0,2 or 2,1 ...)  999... = Last "
                onChange={(e) => setPriorityValue(parseFloat(e.target.value))}
              />
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
            </div>
            <div
              className={`flex px-4 py-2 rounded-md justify-evenly w-72 m-auto mt-6 ${
                disableValue ? " text-gray-400 bg-red-900" : " bg-teal-600 "
              }`}
            >
              <p>Product Is {disableValue ? "Disabeled Now" : "Enabled Now"}</p>
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
              className="mx-3 border-2 border-teal-900 bg-red-700 py-2 px-4 my-4 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                setIsCreateModalOpen(false);
              }}
            >
              CLOSE
            </button>
          </div>
        </form>
        <div
          className={` ${styles.animate} ${
            !isCreateModalOpen ? styles.visibleAdd : styles.hideAdd
          } border-2 border-teal-700 w-[300px] h-[100px] m-auto  flex justify-center items-center   cursor-pointer text-green-600`}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <p className=" text-center text-[40px] pb-2 ">+</p>
          <p className=" text-center pl-2 text-[20px]"> Add New Product</p>
        </div>
      </div>
    </div>
  );
}
