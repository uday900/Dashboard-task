import React, { useContext, useState, useRef, useEffect} from 'react';
import './NewWidget.css';
import { context } from '../Context';

function NewWidget({ setisactive_new_widget, category_index }) {
    const [widget_name, setwidget_name] = useState("");
    const [widget_text, setwidget_text] = useState("");

    const { addWidget } = useContext(context);

    const handleForm = (e) => {
        e.preventDefault();
        addWidget(category_index, widget_name, widget_text);
        setisactive_new_widget(false);
    }

    const widgetNameRef = useRef(null); // Create a reference to the widget name input

    useEffect(() => {
        if (widgetNameRef.current) {
            widgetNameRef.current.focus(); // Automatically focus the widget name input when the form opens
        }
    }, []);


    return (
        <div className='Newwidget-main'>
            <div className='NewWidget rounded border p-5'>
            <button
                    className="close-btn"
                    onClick={() => setisactive_new_widget(false)}
                >
                    <i className="fa-solid fa-xmark"></i>
                </button>
            <form onSubmit={handleForm}>
                <div>
                    <input type="text"
                        placeholder="Enter widget name"
                        className="form-control mb-3"
                        value={widget_name}
                        onChange={(e) => setwidget_name(e.target.value)}
                        required
                        ref={widgetNameRef}
                         />
                </div>
                <div>
                    <input type="text"
                        placeholder="Enter widget text"
                        className="form-control mb-3"
                        value={widget_text}
                        onChange={(e) => setwidget_text(e.target.value)}
                        required />
                </div>
                <button type="submit" className="btn btn-success">Add</button>
            </form>
        </div>
        </div>
    );
}

export default NewWidget