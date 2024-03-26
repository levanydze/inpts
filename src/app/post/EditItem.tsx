import Image from "next/image";
import styles from "./EditItem.module.css";
import { MenuItemProps } from "./Post";
import Modal from "./Modal";
import { SectionsProps } from "./Post";

import { useState } from "react";
const categories = [
  { value: "breakfast", label: "Breakfast" },
  { value: "dessert", label: "Dessert" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "drinks", label: "Drinks" },
  { value: "special", label: "Special" },
];

interface EditItemProps {
  fetchCategoryValue: string;
  handleFetchCategoryChange: (category: string) => void;
  emptyCategory: boolean;
  menuItems: MenuItemProps[];
  sections: SectionsProps[];
  handleDeleteItem: (id: string) => void;
  updateName: string;
  updateImage: string;
  updateDescription: string;
  updateIngredients: string;
  updatePortions: string;
  updatePrice: number;
  updateSpecial: boolean;
  updateSeason: boolean;
  updateVegan: boolean;
  updateSpicy: boolean;
  updateNewItem: boolean;
  updateDisable: boolean;
  updatePriority: number;
  updateData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Change the function signature
  setUpdateImage: (value: string) => void;
  setUpdateName: (value: string) => void;
  setUpdateDescription: (value: string) => void;
  setUpdateIngredients: (value: string) => void;
  setUpdatePortions: (value: string) => void;
  setUpdatePrice: (value: number) => void;
  setUpdateSpecial: (value: boolean) => void;
  setUpdateSeason: (value: boolean) => void;
  setUpdateVegan: (value: boolean) => void;
  setUpdateSpicy: (value: boolean) => void;
  setUpdateNewItem: (value: boolean) => void;
  setUpdateDisable: (value: boolean) => void;
  setUpdatePriority: (value: number) => void;
  postEditing: boolean;
  setPostEditing: (value: boolean) => void;
  handleEditItem: (
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
    itemDisable: boolean,
    itemPriority: number
  ) => void;
}

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
  updateSpecial,
  updateSeason,
  updateVegan,
  updateSpicy,
  updateNewItem,
  updateDisable,
  updatePriority,
  updateData,
  setUpdateImage,
  setUpdateName,
  setUpdateDescription,
  setUpdateIngredients,
  setUpdatePortions,
  setUpdatePrice,
  setUpdateSpecial,
  setUpdateSeason,
  setUpdateVegan,
  setUpdateSpicy,
  setUpdateNewItem,
  setUpdateDisable,
  setUpdatePriority,
  postEditing,
  setPostEditing,
  handleEditItem,
}: EditItemProps) {
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
                            item.special,
                            item.season,
                            item.vegan,
                            item.spicy,
                            item.newItem,
                            item.disable,
                            item.priority
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
