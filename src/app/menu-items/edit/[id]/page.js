'use client';
import {UseProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Left from "@/components/icons/Left";
import {redirect, useParams} from "next/navigation";

export default function EditMenuItemPage(){

    const {id} = useParams();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [redirectToItmes, setRedirectToItmes] = useState(false);
    const {loading, data} = UseProfile();

    useEffect(() =>{
        fetch('/api/menu-items').then(res =>{
            res.json().then(items => {
                const item = items.find(i => i._id === id);
                setImage(item.image);
                setName(item.name);
                setDescription(item.description);
                setBasePrice(item.basePrice);
            })
        })
    }, [])
    if(loading){
        return 'Loading user info';
    }

    if(!data.admin){
        return 'Not an admin';
    }



    async function handleFormSubmit(ev){
        ev.preventDefault();
        const data = {image, name, description, basePrice, _id:id};
        const savingPromise = new Promise(async (resolve, reject) =>{
            const response = await fetch('/api/menu-items', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {'Content-Type' : 'application/json'},
            });
            if(response.ok){
                resolve();
            } else reject();
        });
        await toast.promise(savingPromise, {
            loading: 'saving item',
            success: 'saved',
            error: 'error',
        });

        setRedirectToItmes(true);
    }

    if(redirectToItmes){
        return redirect('/menu-items');
    }

    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            <div className="max-w-md mx-auto mt-8">
                <Link href={'/menu-items'} className="button">
                    <Left />
                    <span>Show all menu items</span>
                </Link>
            </div>
            <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
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
        </section>
    )
}