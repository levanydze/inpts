"use client";
import { CreateNewItemProps } from "./types";
import styles from "./css/CreateNewItem.module.css";
import Image from "next/image";

export default function CreateNewItem({
  categories,
  category,
  saveData,
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
  setIsCreateModalOpen,
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await saveData(e);
    } catch (error) {
      console.error("An error occurred while saving data:", error);
    }
  };

  return (
    <div className={styles.headWrapper}>
      <form onSubmit={handleSubmit} className="items-center flex flex-col">
        <div className={styles.allInputWrapper}>
          <h2 className="text-white text-2xl mb-4 text-center">Add New Item</h2>
          <div className={styles.selectCategoryInput}>
            <h3>Category</h3>
            <div className={`flex ${styles.selectWrapper}`}>
              <div className={`flex ${styles.selectWrapper}`}>
                <span className="text-white text-xl">
                  {
                    categories.find(
                      (cat) => cat.value === (menuCategoryValue || category)
                    )?.label
                  }
                </span>
              </div>
            </div>
          </div>
          <div className={styles.imgTextNameWrap}>
            <Image
              className="mr-2"
              src={
                imageValue ||
                "https://github.com/levanydze/restaurant2024support/blob/main/icons/apple.png?raw=true"
              }
              width={400}
              height={300}
              alt="Product Image"
            />
            <div className="w-full flex flex-col justify-evenly">
              <div className={styles.textInputWrapper}>
                <p>Image URL</p>
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
                  {!nameValue && (
                    <span className="text-red-500 text-3xl h-4">*</span>
                  )}
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
            <p className="flex justify-between px-4">
              Priority
              {!priorityValue && (
                <span className="text-red-500 text-3xl h-4">*</span>
              )}
            </p>
            <input
              type="number"
              value={priorityValue}
              placeholder="1 = First, 999... = Last"
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
              disableValue ? "text-gray-400 bg-red-900" : "bg-teal-600"
            }`}
          >
            <p>Product is {disableValue ? "Disabled" : "Enabled"}</p>
            <input
              className="h-6 w-6 my-auto"
              type="checkbox"
              checked={disableValue}
              onChange={(e) => setDisableValue(e.target.checked)}
            />
          </div>
        </div>
        <div className="mt-10">
          <button
            className="mx-3 bg-green-700 py-2 px-4 my-4 rounded-md"
            type="submit"
          >
            Add Item
          </button>
          <button
            className="mx-3 border-2 border-teal-900 bg-red-700 py-2 px-4 my-4 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              setIsCreateModalOpen(false); // Assuming you have a state to close the modal
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
