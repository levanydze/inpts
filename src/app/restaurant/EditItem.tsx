"use client";
import Image from "next/image";
import styles from "./css/EditItem.module.css";
import Modal from "./Modal";
import { EditItemProps } from "./types";
import { useState } from "react";
import CreateNewItem from "./CreateNewItem";

export default function EditItem({
  fetchCategoryValue,
  handleFetchCategoryChange,
  emptyCategory,
  menuItems,
  sections,
  handleDeleteItem,
  updateName,
  updateImage,
  updateDescription,
  updateIngredients,
  updatePortions,
  updatePrice,
  updatePriority,
  updateSpecial,
  updateSeason,
  updateVegan,
  updateSpicy,
  updateNewItem,
  updateDisable,
  updateData,
  setUpdateImage,
  setUpdateName,
  setUpdateDescription,
  setUpdateIngredients,
  setUpdatePortions,
  setUpdatePrice,
  setUpdatePriority,
  setUpdateSpecial,
  setUpdateSeason,
  setUpdateVegan,
  setUpdateSpicy,
  setUpdateNewItem,
  setUpdateDisable,
  postEditing,
  setPostEditing,
  handleEditItem,
  saveData,
  handleMenuCategoryChange,
  setMenuCategoryValue,
  menuCategoryValue,
  setImageValue,
  imageValue,
  setNameValue,
  nameValue,
  descriptionValue,
  setDescriptionValue,
  ingredientsValue,
  setIngredientsValue,
  portionsValue,
  setPortionsValue,
  priceValue,
  setPriceValue,
  specialValue,
  setSpecialValue,
  seasonValue,
  setSeasonValue,
  veganValue,
  setVeganValue,
  spicyValue,
  setSpicyValue,
  newItemValue,
  setNewItemValue,
  disableValue,
  setDisableValue,
  priorityValue,
  setPriorityValue,
  categories, // categories as a prop
}: EditItemProps & { categories: { value: string; label: string }[] }) {
  const [deleteAsk, setDeleteAsk] = useState<{
    show: boolean;
    itemId: string;
    itemName: string;
  }>({ show: false, itemId: "", itemName: "" });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const handleOpenCreateModal = () => {
    setMenuCategoryValue(fetchCategoryValue); // Set the default category when the modal opens
    setIsCreateModalOpen(true);
  };

  return (
    <div className="border-4 border-teal-800 m-4">
      {!isCreateModalOpen && (
        <div>
          <div className="mb-10">
            <h1 className="text-4xl text-white text-center mt-8">
              Menu lists on your database
            </h1>
            <h2 className="text-white text-2xl mb-4 text-center mt-6"></h2>

            <ul className="flex justify-center ">
              <div className="flex flex-wrap justify-evenly ">
                {categories.map((category) => (
                  <li
                    key={category.value}
                    className={`px-4 py-2 mx-2 my-2 rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
                      fetchCategoryValue === category.value
                        ? "bg-orange-600"
                        : "bg-teal-700"
                    }`}
                    onClick={() => handleFetchCategoryChange(category.value)}
                  >
                    {category.label}
                  </li>
                ))}
              </div>
            </ul>
          </div>
        </div>
      )}
      <div>
        {sections.map((section, index) => (
          <div key={index} className="flex gap-2 uppercase justify-center">
            {fetchCategoryValue === section.menuCategory && (
              <div className="flex flex-col">
                <h2 className="px-4 py-2 m-auto my-2 rounded-md cursor-pointer bg-teal-950 duration-200 w-max">
                  {section.menuCategory}
                </h2>
              </div>
            )}
          </div>
        ))}
        {/* Add New Item Modal */}
        {isCreateModalOpen && (
          <div className="bg-black bg-opacity-15 p-4 w-full top-16 left-0 z-10">
            <CreateNewItem
              category={fetchCategoryValue} // Pass the current category to the modal
              categories={categories}
              saveData={saveData}
              handleMenuCategoryChange={handleMenuCategoryChange}
              setMenuCategoryValue={setMenuCategoryValue}
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
              priorityValue={priorityValue}
              setPriorityValue={setPriorityValue}
              setIsCreateModalOpen={setIsCreateModalOpen}
            />
          </div>
        )}

        <div className="flex flex-wrap justify-center">
          {/* Add New Item Button - Always Rendered */}
          {!isCreateModalOpen && (
            <div
              className={`m-8 border-[2px] rounded-md border-teal-700 ${styles.cardWrapperAdd}`}
            >
              <div className="flex justify-between p-2">
                <div
                  className="rounded-md border-2 border-teal-700 w-full m-5 h-auto flex justify-center items-center cursor-pointer text-green-600 hover:text-green-400 transition-all flex-col py-36"
                  onClick={handleOpenCreateModal}
                >
                  <p className="text-center text-[40px] pb-2">+</p>
                  <p className="text-center pl-2 text-[20px] capitalize">
                    Add {fetchCategoryValue}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Cards */}
          {!emptyCategory &&
            menuItems.map((item) => (
              <div
                key={item.id}
                className={`m-8 relative border-[2px] rounded-md border-teal-700 ${styles.cardWrapper}`}
              >
                <div className="flex justify-between absolute top-0 p-2 w-full ">
                  <button
                    className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 "
                    onClick={() =>
                      setDeleteAsk({
                        show: true,
                        itemId: item.id,
                        itemName: item.name,
                      })
                    }
                  >
                    Delete
                  </button>
                  <p className="button1"> {item.priority}</p>

                  <button
                    className="bg-teal-900 hover:bg-teal-600 px-4 py-2 rounded-md"
                    onClick={() =>
                      handleEditItem(
                        item.id,
                        item.name,
                        item.image,
                        item.description,
                        item.ingredients,
                        item.portions,
                        item.price,
                        item.priority,
                        item.special,
                        item.season,
                        item.vegan,
                        item.spicy,
                        item.newItem,
                        item.disable
                      )
                    }
                  >
                    EDIT
                  </button>
                </div>
                <div className="absolute w-full bottom-1/2 ">
                  {item.disable ? (
                    <button className="bg-red-900 px-4 py-2 cursor-default w-full h-12">
                      Disabled
                    </button>
                  ) : null}
                </div>

                <div className={styles.cardWrapper}>
                  <Image
                    src={item.image}
                    width={600}
                    height={600}
                    alt={item.name}
                  ></Image>
                  <div className={styles.cardInfoDiv}>
                    <div className={styles.namePrice}>
                      <h1 className="title1 font1">{item.name}</h1>
                      <p className={`${styles.dotted}`}></p>
                      <h6>{item.price} sek</h6>
                    </div>
                    <h2 className="title0 font1 textMedium">
                      {item.ingredients.length > 40
                        ? item.ingredients.substring(0, 40) + "..."
                        : item.ingredients}
                    </h2>
                    <div className={styles.details}>
                      {item.portions && (
                        <h5 className="title0 font1">{item.portions}</h5>
                      )}
                      {item.vegan && (
                        <p className={`menuTags ${styles.vegan}`}>VEGAN</p>
                      )}
                      {item.special && (
                        <p className={`menuTags ${styles.special}`}>SPECIAL</p>
                      )}
                      {item.season && (
                        <p className={`menuTags ${styles.season}`}>SEASON</p>
                      )}
                      {item.spicy && (
                        <p className={`menuTags ${styles.spicy}`}>SPICY</p>
                      )}
                      {item.newItem && (
                        <p className={`menuTags ${styles.newItem}`}>NEW</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pb-40 w-full h-1"></div>
              </div>
            ))}
        </div>

        {deleteAsk.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center">
              <p className="text-xl">Are you sure you want to delete?</p>
              <p className="text-lg font-semibold">{deleteAsk.itemName}</p>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mr-2"
                  onClick={() => {
                    handleDeleteItem(deleteAsk.itemId);
                    setDeleteAsk({ show: false, itemId: "", itemName: "" });
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                  onClick={() =>
                    setDeleteAsk({ show: false, itemId: "", itemName: "" })
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal
        setPostEditing={setPostEditing}
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
        updatePriority={updatePriority}
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
        setUpdatePriority={setUpdatePriority}
        postEditing={postEditing}
      />
    </div>
  );
}
