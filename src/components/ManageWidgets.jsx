import React, { useContext, useState } from 'react';
import './ManageWidgets.css';
import { context } from '../Context';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function ManageWidgets({ setisactive_manage_widget }) {
    const { categories, setcategories} = useContext(context)

    const [dummy_categories, setdummy_categories] = useState(categories);
    const [active_category, setactive_category] = useState({
        category_id: 1,
        iscreate_new_category: false,
    });
    const [new_category_name, setnew_category_name] = useState("");
    const [maxId, setmaxId] = useState(categories.length);
    const [new_widget_name, setnew_widget_name] = useState("");
    const [new_widget_text, setnew_widget_text] = useState("");
    const [popup, setpopup] = useState(false);

    // Delete widget function
    function handleDelete(category_id, widget_index) {
        const updatedCategories = dummy_categories.map((category) => {
            if (category.id === category_id) {
                const updatedWidgets = category.widgets.filter((_, wIndex) => wIndex !== widget_index);
                return { ...category, widgets: updatedWidgets };
            }
            return category;
        });
        setdummy_categories(updatedCategories);
    }

    

    const handleAddNewCategory = (event) => {
        event.preventDefault();
        const obj = {
            id: maxId + 1,
            category_name: new_category_name,
            widgets: [],
        };
        setmaxId(maxId + 1);
        setdummy_categories([...dummy_categories, obj]);
        setnew_category_name(""); // Clear the input field
    };

    const handleAddNewWidget = (event) => {
        event.preventDefault();
        const updatedCategories = dummy_categories.map((category) => {
            if (category.id === active_category.category_id) {
                const newWidget = {
                    widget_name: new_widget_name,
                    widget_text: new_widget_text,
                };
                return { ...category, widgets: [...category.widgets, newWidget] };
            }
            return category;
        });
        setdummy_categories(updatedCategories);
        setpopup(false); // Close the popup after adding the widget
        setnew_widget_name(""); // Clear the widget name input
        setnew_widget_text(""); // Clear the widget text input
    };

    async function handleConfirm() {
        console.log("actual ", categories)
        console.log('Updated Categories:', dummy_categories);
    
        // axios.post('http://localhost:5000/categories', dummy_categories)

        setcategories(dummy_categories)
        setisactive_manage_widget(false)
    }

    const handleDeleteCategory = (id)=>{
        setdummy_categories(dummy_categories.filter((category)=>{
           return  category.id != id
        }))
        
    }
    

    return (
        <div className="manage-widget-container">
            <div className="manage-widget box-shadow border">
                <button
                    className="close-btn"
                    onClick={() => setisactive_manage_widget(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>

                <div className="container-fluid h4 bg-primary p-2 text-white">
                    Manage widgets
                </div>
                <div className="d-flex text-center justify-content-between">
                        <p className="px-2 ">
                            Manage your Dashboard
                        </p>

                        {/* Bootstrap Dropdown for selecting categories */}
                        <div className='d-flex'>
                        <div className="dropdown">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="categoryDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Select Category
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                                {dummy_categories.map((category) => (
                                    <li key={category.id} className='d-flex mb-2'>
                                        <button
                                            className="dropdown-item"
                                            onClick={() => setactive_category({
                                                category_id: category.id,
                                                iscreate_new_category: false
                                            })}
                                        >
                                            {category.category_name}
                                        </button>
                                    <button
                                        className="btn text-danger btn-sm ms-2"
                                        onClick={() => handleDeleteCategory(category.id)}
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="btn btn-default text-success"
                            onClick={() => setactive_category({
                                category_id: maxId + 1,
                                iscreate_new_category: true
                            })}
                            >
                            <i className="fa-solid fa-plus"></i>
                        </button>
                        </div>
                </div>


                {/* Showing category buttons */}
                <div className="category-buttons d-flex">
                    {dummy_categories.map((category) => (
                        <button
                            key={category.id}
                            className='btn btn-light'
                            onClick={() => setactive_category({
                                category_id: category.id,
                                iscreate_new_category: false
                            })}
                        >
                            <b>{category.category_name}</b>
                        </button>

                    ))}

                    <button
                        className="btn text-primary"
                        onClick={() => setactive_category({
                            category_id: maxId + 1,
                            iscreate_new_category: true
                        })}
                    >
                        + Add category
                    </button>
                </div>

                {/* Showing widgets */}
                <div className="widgets-list">
                    {dummy_categories.map((category) => {
                        if (category.id === active_category.category_id) {
                            return (
                                <div className='p-3' key={category.id}>
                                    {category.widgets.map((widget, widget_index) => (
                                        <li key={widget_index} className='mb-3 d-flex justify-content-between'>
                                            <span>{widget.widget_name}</span>
                                            <div
                                                onClick={() => handleDelete(category.id, widget_index)}
                                                className="btn btn-danger btn-sm mx-5"
                                            >
                                                Delete
                                            </div>
                                        </li>
                                    ))}
                                    <div>
                                        {popup && <>
                                            <div className='mt-5'>
                                                <form onSubmit={handleAddNewWidget}>
                                                    <input
                                                        type="text"
                                                        placeholder='Enter widget name'
                                                        value={new_widget_name}
                                                        onChange={(e) => setnew_widget_name(e.target.value)}
                                                        className="form-control w-75 mb-2"
                                                        // autoFocus // Ensure the input field is focused on render
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder='Enter widget text'
                                                        value={new_widget_text}
                                                        onChange={(e) => setnew_widget_text(e.target.value)}
                                                        className="form-control w-75 mb-2"
                                                        // autoFocus
                                                    />
                                                    <button className="btn btn-success" type='submit'>
                                                        Add
                                                    </button>
                                                </form>
                                            </div>
                                        </>}
                                    </div>
                                    <div className="mt-2 rounded">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => setpopup(true)}
                                        >
                                            + Add Widget
                                        </button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}

                    {/* something */}
                    {active_category.iscreate_new_category && (
                        <div className='p-4'>
                            <form onSubmit={handleAddNewCategory}>
                                <label htmlFor="c-name" className='mb-2'>
                                    Enter category name:
                                </label>
                                <input
                                    type="text"
                                    placeholder='Enter category name'
                                    id='c-name'
                                    value={new_category_name}
                                    onChange={(e) => setnew_category_name(e.target.value)}
                                    className='form-control w-50'
                                />
                                <button className="mt-2 btn btn-success btn-sm" type='submit'>
                                    Add category
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                <div className="buttons-container">
                    <button
                        onClick={() => setisactive_manage_widget(false)}
                        className="btn btn-light"
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary mx-5"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageWidgets;
