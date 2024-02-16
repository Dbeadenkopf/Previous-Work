import React from 'react';
import { isPropertySignature } from 'typescript';
import { IState as IProps} from "./App"




// type checking occurs here to we had
// to change list= () => to list = (props: IProps) =>
// with the final change, we explicity tell the react componant
// what the function is using React.FC<IProps> 
const List: React.FC<IProps> = ({people}) => {

// we need to redefine what we want to return 
// because right now were are only returning type void
    const renderList = (): JSX.Element[] => {
        return people.map((person) => {
           return (
            <li className="List">
            <div className="List-header">
                <img className="List-img" src={person.url}/>
                <h2>{person.name}</h2>
            </div>
            <p>{person.age} years old</p>
            <p className="List-note">{person.note}</p>
        </li>
           )
        })
    }

    return (
        <ul>
           {renderList()};
        </ul>
    )
}


export default List;