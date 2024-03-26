import Image from "next/image";
import styles from "./Modal.module.css";

interface ModalProps {
  postEditing: boolean;
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
  updateData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setUpdateName: (value: string) => void;
  setUpdateImage: (value: string) => void;
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
  setPostEditing: (value: boolean) => void;
  setUpdatePriority: (value: number) => void;
}

export default function Modal({
  postEditing,
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
  setUpdateName,
  setUpdateImage,
  setUpdateDescription,
  setUpdateIngredients,
  setUpdatePortions,
  setUpdatePrice,
  setUpdateSpecial,
  setUpdateSeason,
  setUpdateVegan,
  setUpdateSpicy,
  setUpdateNewItem,
  setPostEditing,
  setUpdateDisable,
  setUpdatePriority,
}: ModalProps) {
  return (
    <div>
      {postEditing ? (
        <div className={styles.modalWrapper}>
          <h3>Editing List</h3>
          <form action="" onSubmit={updateData} className="w-full">
            <div className={styles.allInputWrapper}>
              <div className="flex">
                <Image
                  className="mr-2"
                  src={updateImage}
                  width={400}
                  height={300}
                  alt="any"
                ></Image>
                <div className="w-full ml-2">
                  <div className={styles.textInputWrapper}>
                    <p className="flex justify-between  ">
                      Name
                      {!updateName ? (
                        <span className="text-red-500 text-3xl h-4">*</span>
                      ) : null}
                    </p>
                    <input
                      type="text"
                      value={updateName}
                      placeholder="Update Name"
                      onChange={(e) => setUpdateName(e.target.value)} // Update the updateName state
                    />
                  </div>
                  <div className={styles.textInputWrapper}>
                    <p>Image Link</p>
                    <input
                      type="text"
                      value={updateImage}
                      placeholder="Update Image Link"
                      onChange={(e) => setUpdateImage(e.target.value)} // Update the updateImage state
                    />
                  </div>
                </div>
              </div>
              <div className={styles.textInputWrapper}>
                <p>Description</p>
                <input
                  type="text"
                  value={updateDescription}
                  placeholder="Update Description"
                  onChange={(e) => setUpdateDescription(e.target.value)} // Update the updateDescription state
                />
              </div>
              <div className={styles.textInputWrapper}>
                <p>Ingredients</p>
                <input
                  type="text"
                  value={updateIngredients}
                  placeholder="Update Ingredients"
                  onChange={(e) => setUpdateIngredients(e.target.value)} // Update the updateIngredients state
                />
              </div>
              <div className={styles.textInputWrapper}>
                <p>Portions</p>
                <input
                  type="text"
                  value={updatePortions}
                  placeholder="Update Portions"
                  onChange={(e) => setUpdatePortions(e.target.value)} // Update the updatePortions state
                />
              </div>
              <div className={styles.textInputWrapper}>
                <p>Price</p>
                <input
                  type="number"
                  value={updatePrice}
                  placeholder="Update Price"
                  onChange={(e) => setUpdatePrice(parseFloat(e.target.value))} // Update the updatePrice state
                />
              </div>
              <div className={styles.textInputWrapper}>
                <p className="flex justify-between  ">
                  Priority
                  {!updatePriority ? (
                    <span className="text-red-500 text-3xl h-4">*</span>
                  ) : null}
                </p>
                <input
                  type="number"
                  value={updatePriority}
                  placeholder="1 = First   (can be also 0,2 or 2,1 ...)  999 = Last "
                  onChange={(e) =>
                    setUpdatePriority(parseFloat(e.target.value))
                  } // Update the updatePrice state
                />
              </div>
              <div className={styles.checkBoxesWrapper}>
                <div>
                  <p>Special</p>
                  <input
                    type="checkbox"
                    checked={updateSpecial}
                    onChange={(e) => setUpdateSpecial(e.target.checked)} // Update the updateSpecial state
                  />
                </div>
                <div>
                  <p>Season</p>
                  <input
                    type="checkbox"
                    checked={updateSeason}
                    onChange={(e) => setUpdateSeason(e.target.checked)} // Update the updateSeason state
                  />
                </div>
                <div>
                  <p>Vegan</p>
                  <input
                    type="checkbox"
                    checked={updateVegan}
                    onChange={(e) => setUpdateVegan(e.target.checked)} // Update the updateVegan state
                  />
                </div>
                <div>
                  <p>Spicy</p>
                  <input
                    type="checkbox"
                    checked={updateSpicy}
                    onChange={(e) => setUpdateSpicy(e.target.checked)} // Update the updateSpicy state
                  />
                </div>
                <div>
                  <p>New</p>
                  <input
                    type="checkbox"
                    checked={updateNewItem}
                    onChange={(e) => setUpdateNewItem(e.target.checked)} // Update the updateNewItem state
                  />
                </div>
              </div>
              <div className="w-full flex justify-center my-4">
                <div
                  className={`flex px-4 py-2 rounded-md justify-evenly w-72 ${
                    updateDisable
                      ? " text-gray-300 bg-red-950"
                      : " bg-teal-600 "
                  }`}
                >
                  <p>
                    Product Is {updateDisable ? "Disabeled" : "Enabled"} Now
                  </p>
                  <input
                    className="h-6 w-6 my-auto"
                    type="checkbox"
                    checked={updateDisable}
                    onChange={(e) => setUpdateDisable(e.target.checked)} // Update the updateNewItem state
                  />
                </div>
              </div>
            </div>
            <div className={styles.buttonsWrapper}>
              <button
                className="bg-green-700 py-2 px-4 my-4 rounded-md"
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-red-700 py-2 px-4 my-4 rounded-md"
                onClick={() => setPostEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
