'use client';
import {UseProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import EditableImage from "@/components/layout/EditableImage";
import {useState} from "react";
import {toast} from "react-hot-toast";
import Link from "next/link";
import Right from "@/components/icons/Right";
import Left from "@/components/icons/Left";
import {redirect} from "next/navigation";
import MenuItemForm from "@/components/layout/MenuItemForm";

export default function NewMenuItemPage(){

    const {loading, data} = UseProfile();
    const [redirectToItmes, setRedirectToItmes] = useState(false);

    if(loading){
        return 'Loading user info';
    }

    if(!data.admin){
        return 'Not an admin';
    }



    async function handleFormSubmit(ev, data){
        ev.preventDefault();
        const savingPromise = new Promise(async (resolve, reject) =>{
            const response = await fetch('/api/menu-items', {
                method: 'POST',
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
            <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
        </section>
    )
}