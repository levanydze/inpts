import { SectionsProps } from "./Restaurant";

export interface EditItemProps {
  categories: { value: string; label: string }[];
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
  updatePriority: number;
  updateSpecial: boolean;
  updateSeason: boolean;
  updateVegan: boolean;
  updateSpicy: boolean;
  updateNewItem: boolean;
  updateDisable: boolean;
  updateData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Change the function signature
  setUpdateImage: (value: string) => void;
  setUpdateName: (value: string) => void;
  setUpdateDescription: (value: string) => void;
  setUpdateIngredients: (value: string) => void;
  setUpdatePortions: (value: string) => void;
  setUpdatePrice: (value: number) => void;
  setUpdatePriority: (value: number) => void;
  setUpdateSpecial: (value: boolean) => void;
  setUpdateSeason: (value: boolean) => void;
  setUpdateVegan: (value: boolean) => void;
  setUpdateSpicy: (value: boolean) => void;
  setUpdateNewItem: (value: boolean) => void;
  setUpdateDisable: (value: boolean) => void;
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
    itemPriority: number,
    itemSpecial: boolean,
    itemSeason: boolean,
    itemVegan: boolean,
    itemSpicy: boolean,
    itemNewItem: boolean,
    itemDisable: boolean
  ) => void;
}

export interface CreateNewItemProps {
  categories: { value: string; label: string }[];
  saveData: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Change the function signature
  handleMenuCategoryChange: (category: string) => void;
  menuCategoryValue: string;
  imageValue: string;
  nameValue: string;
  descriptionValue: string;
  ingredientsValue: string;
  portionsValue: string;
  priceValue: number | string;
  priorityValue: number | string;
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
  setPriceValue: (value: number | string) => void;
  setSpecialValue: (value: boolean) => void;
  setSeasonValue: (value: boolean) => void;
  setVeganValue: (value: boolean) => void;
  setSpicyValue: (value: boolean) => void;
  setNewItemValue: (value: boolean) => void;
  setDisableValue: (value: boolean) => void;
  setPriorityValue: (value: number) => void;
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
  priority: number;
}

export interface ModalProps {
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
