import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { context } from '../Context'

function SearchPage() {

    var {query} = useParams()
    // console.log(query)
    query = query.toLowerCase()
    const {categories} = useContext(context)


    const [dummy_categories, setdummy_categories] = useState(
        JSON.parse(JSON.stringify(categories))
    )

    const matched_categories = dummy_categories.filter((category)=>{
       
        const matchingWidgets = category.widgets.filter((widget) => 
            widget.widget_name.toLowerCase().includes(query)
        );
        if(matchingWidgets.length > 0 ){
            category.widgets = matchingWidgets;
        }
        return matchingWidgets.length > 0;
    })
    // const matched_categories = dummy_categories
    // console.log("after", categories)
  return (
    <div className="container-fluid border w-100 p-4 min-vh-100" style={{ backgroundColor: "rgb(240, 245, 250)" }}>
        {matched_categories.length == 0 ? <>No widget found </> :(
             matched_categories.map((category, index) => (
                <div key={index}>
                    <div className="h5">{category.category_name}</div>
                    <div key={index} className='d-flex flex-wrap gap-5'>
                        {category.widgets.map((widget, widgetIndex) => (
                            <div key={widgetIndex} className='box rounded'>
                                <h3>{widget.widget_name}</h3>
                                <p>{widget.widget_text}</p>
                            </div>
                        ))}
                        <div className="box rounded">
                            <button className="btn btn-outline-primary" onClick={() => handleAddWidget(index)}>
                                + Add Widget
                            </button>
                        </div>
                    </div>
                </div>
            ))
        )}
       
        
    </div>
  )
}

export default SearchPage