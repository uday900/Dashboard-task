import React, { useContext, useEffect, useState } from 'react';
import './LandingPage.css';
import NewWidget from '../components/NewWidget';
import { context } from '../Context';
import ManageWidgets from '../components/ManageWidgets';

function LandingPage() {
    const [isempty, setisempty] = useState(false);
    const [isactive_new_widget, setisactive_new_widget] = useState(false);
    const [category_ind, setcategory_ind] = useState("");
    const [isactive_manage_widget, setisactive_manage_widget] = useState(false)

    const { categories, setcategories } = useContext(context);
    console.log("data", categories)
    const handleAddWidget = (i) => {
        setisactive_new_widget(true);
        setcategory_ind(i);
    }

    useEffect(() => {
        if (categories.length === 0) {
            setisempty(true);
        } else {
            setisempty(false);
        }
    }, [categories]);

    // console.log("data", categories)
    return (
        <div className="container-fluid border w-100 p-4 min-vh-100" style={{ backgroundColor: "rgb(240, 245, 250)" }}>
            {isactive_new_widget && <NewWidget setisactive_new_widget={setisactive_new_widget} category_index={category_ind} />}

            {isactive_manage_widget && <ManageWidgets categories = {categories}
                setcategories = {setcategories}
                setisactive_manage_widget = {setisactive_manage_widget}/>}

            <div className="header d-flex justify-content-between">
                <div className="h4">
                    Sample Dashboard
                </div>
                <div>
                    <button    
                        className="btn btn-light"
                        onClick={()=>setisactive_manage_widget(true)}>
                        Manage widgets
                    </button>
                    <button className="btn starred">
                        <i className="fa-regular fa-star"></i>
                    </button>
                </div>
            </div>
            {isempty ? (
                <>Not available</>
            ) : (
                <div>
                    {categories.map((category, index) => (
                        <div className = 'mt-4' key={index}>
                            <div className="h5">{category.category_name}</div>

                            <div key={index} className='d-flex flex-wrap gap-5'>
                                {/*  */}
                                {/* {console.log("first")} */}
                                {category.widgets.map((widget, widgetIndex) => (
                                    
                                    <div key={widgetIndex} className='box rounded'>
                                        {/* {console.log(widget)} */}
                                        <h3>{widget.widget_name}</h3>
                                        <p>
                                            {
                                                widget.widget_text.split(' ').slice(0, 6).join(' ')
                                            }...
                                        </p>
                                    </div>
                                ))}
                                <div className="box rounded">
                                    <button className="btn btn-outline-primary" onClick={() => handleAddWidget(index+1)}>
                                        + Add Widget
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default LandingPage;
