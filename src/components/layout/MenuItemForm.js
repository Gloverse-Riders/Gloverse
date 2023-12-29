import EditableImage from "@/components/layout/EditableImage";
import {useState} from "react";

export default function MenuItemForm({onSubmit, menuItem}){
    const [image, setImage] = useState(menuItem?.image || '');
    const [name, setName] = useState(menuItem?.name || '');
    const [description, setDescription] = useState(menuItem?.description || '');
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');

    return (
        <form onSubmit={ev => onSubmit(ev, {image, name, description, basePrice})}
              className="mt-8 max-w-md mx-auto">
            <div className="grid items-start gap-4" style={{gridTemplateColumns: '.3fr .7fr'}}>
                <div className="max-w-[200px]">
                    <EditableImage link={image} setLink={setImage}/>
                </div>
                <div className="grow">
                    <label>Menu item</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)}/>
                    <label>Description</label>
                    <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} />
                    <label>Price</label>
                    <input type="text" value={basePrice} onChange={ev => setBasePrice(ev.target.value)}/>
                    <button type="submit">Save</button>
                </div>
            </div>
        </form>
    );
 }