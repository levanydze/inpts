"use client";
import Image from "next/image";
import styles from "./css/EditItem.module.css";
import Modal from "./Modal";
import { EditItemProps } from "./types";
import { useState } from "react";

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
  categories, // categories as a prop
}: EditItemProps & { categories: { value: string; label: string }[] }) {
  const [deleteAsk, setDeleteAsk] = useState<{
    show: boolean;
    itemId: string;
    itemName: string;
  }>({ show: false, itemId: "", itemName: "" });

  return (
    <div>
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
              <div className="flex flex-wrap justify-evenly ">
                {/* mapping seactions titles but not according data! it is according to the  /////  const  categories = [{ value: "breakfast", label: "Breakfast" .... }, */}
                {categories.map((category) => (
                  <li
                    key={category.value}
                    className={`px-4 py-2 mx-2 my-2   rounded-md cursor-pointer hover:bg-orange-600 duration-200 ${
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

        {!emptyCategory ? (
          <div>
            {deleteAsk.show ? (
              <div className=" h-full w-full bg-black opacity-95 z-20 flex flex-col justify-center fixed top-0 ">
                <div className="m-auto">
                  <p className="text-center text-xl">Deleting</p>
                  <p className=" text-center my-3">{deleteAsk.itemName}</p>
                  <button
                    className="bg-red-700 px-4 py-2 rounded-md mx-2 w-24"
                    onClick={() => {
                      handleDeleteItem(deleteAsk.itemId);
                      setDeleteAsk({ show: false, itemId: "", itemName: "" });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-700 px-4 py-2 rounded-md mx-2 w-24"
                    onClick={() =>
                      setDeleteAsk({ show: false, itemId: "", itemName: "" })
                    }
                  >
                    No
                  </button>
                </div>
              </div>
            ) : null}

            <div>
              {/* mapping each seaction and can be used in restaurant menu and in section can be mapped each section children */}
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="flex gap-2 uppercase justify-center"
                >
                  {fetchCategoryValue === section.menuCategory ? (
                    <h2 className="px-4 py-2 mx-2 my-2   rounded-md cursor-pointer bg-teal-950 duration-200 ">
                      {section.menuCategory}
                    </h2>
                  ) : null}
                </div>
              ))}
            </div>
            <div>
              <div className="flex flex-wrap justify-center">
                {/* mapping menu in each section */}
                {menuItems.map((item) => (
                  <div
                    key={item.id}
                    className={`m-8 relative border-[2px] rounded-md border-teal-700  ${styles.cardWrapper}`}
                  >
                    <div className="flex justify-between  absolute top-0 p-2 w-full">
                      <button
                        className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500"
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
                        className="   bg-teal-900 hover:bg-teal-600 px-4 py-2 rounded-md"
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
                        <button
                          className="bg-red-900 px-4 py-2  cursor-default w-full  h-12"
                          onClick={(e) => {}}
                        >
                          Disabeled
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
                            <p className={`menuTags ${styles.special}`}>
                              SPECIAL
                            </p>
                          )}
                          {item.season && (
                            <p className={`menuTags ${styles.season}`}>
                              SEASON
                            </p>
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
            </div>
          </div>
        ) : (
          <div>
            <h6 className="text-center text-white text-xl pt-10 mb-40 capitalize">
              There is no data in {fetchCategoryValue} Menu
            </h6>
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
