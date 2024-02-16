import React, { useState } from 'react';
import { IState as Props} from "./App"


interface IProps {
    people: Props["people"]
    setPeople: React.Dispatch<React.SetStateAction<Props["people"]>>    
}



const AddToList: React.FC<IProps> = ({people, setPeople}) => {

    // within here we can now create our react 
    // states for each card after user inputs have
    // been entered

    const [input , setInput] = useState({
        name: "",
        age: "",
        note: " ",
        img: ""
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value // two way binding that goes through whole object
        })
    }

    const handleClick = (): void => {
        if(
            !input.name ||
            !input.age  ||
            !input.img    
        ){
            return
        }

        setPeople([
            ...people,
            {
                name: input.name,
                age: parseInt(input.age),
                url: input.img,
                note: input.note
            }
        ]);

        setInput({
        name: "",
        age: "",
        note: " ",
        img: ""})

    }

    return(
        <div className="AddToList">
            <input
                type="text"
                placeholder="Name"
                className="AddToList-input"
                value={input.name} // this sets up our two way binding 
                onChange={handleChange}
                name="name"
            />
            <input
                type="text"
                placeholder="Age"
                className="AddToList-input"
                value={input.age} // this sets up our two way binding 
                onChange={handleChange}
                name="age"
            />
            <input
                type="text"
                placeholder="Image Url"
                className="AddToList-input"
                value={input.img} // this sets up our two way binding 
                onChange={handleChange}
                name="img"
            />
            <textarea
                placeholder="Notes"
                className="AddToList-input"
                value={input.note} // this sets up our two way binding 
                onChange={handleChange}
                name="note"
            />
            <button
                className="AddToList-btn"
                onClick={handleClick}
            >
                Add To List
            </button>
        </div>
    )

}

export default AddToList 