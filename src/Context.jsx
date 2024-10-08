
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const context = createContext();

function Context({ children }) {
    const [categories, setcategories] = useState([]);

    // Fetching categories from API
    async function getData() {
        try {
            const baseURL = await axios.get("https://uday-data.onrender.com/app/categories");
            setcategories(baseURL.data);
        } catch (error) {
            console.log(error, "error msg");
        }
    }

    async function addWidget(category_id, widget_name, widget_text) {
        const updated_categories = [...categories];
        
        // Find the index of the category to update
        const categoryIndex = updated_categories.findIndex(cat => {
            // console.log(cat.id, category_id)
            return cat.id === category_id});

        // console.log(category_id, categoryIndex)
        if (categoryIndex !== -1) {
            // Retrieve the category and add the new widget
            const category = updated_categories[categoryIndex];
            const newWidget = {
                // id: newWidgetId,
                widget_name,
                widget_text,
            };
    
            category.widgets.push(newWidget);
            console.log("new category after updating widgets ", category)
    
            try {
                const response = await axios.put(`https://uday-data.onrender.com/app/categories/${category_id}`, {
                    ...category 
                });
                
                // Update the state with the response data
                setcategories(updated_categories);
                // console.log("Category updated successfully:", response.data);
            } catch (error) {
                console.error("Failed to update category", error);
            }
        } else {
            console.error("Category not found");
        }
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <context.Provider
            value={{
                categories,
                setcategories,
                addWidget,
                // deleteWidget,
            }}>
            {children}
        </context.Provider>
    );
}

export default Context;
