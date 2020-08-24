import {actions} from './reducer';
import {Category} from "./interface";

export const getCategories = () => actions.getCategories({});

export const addCategory = (name: string, description?: string, icon?: string, color?: string, forumId?: number) =>
    actions.addCategory({
        name: name,
        description: description,
        icon: icon,
        color: color,
        forumId: forumId
    });

export const updateCategory = (
    categoryId: number, name: string, description?: string, icon?: string, color?: string, forumId?: number) =>
    actions.updateCategory({
        categoryId: categoryId,
        name: name,
        description: description,
        icon: icon,
        color: color,
        forumId: forumId
    });

export const updateCategoryRelations = (categories: Category[]) => actions.updateCategoryRelations({categories: categories});

export const deleteCategory = (id: number) => actions.deleteCategory({id: id});
