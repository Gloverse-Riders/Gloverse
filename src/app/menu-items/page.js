'use client';
import UserTabs from "@/components/layout/UserTabs";
import {UseProfile} from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import {useState} from "react";
import {toast} from "react-hot-toast";
import Link from "next/link";
import Right from "@/components/icons/Right";
export default function MenuItemsPage(){
    const {loading, data} = UseProfile();
    const [menuItems, setMenuItems] = useState([]);

    useState(() =>{
        fetch('/api/manu-items').then(res =>{
            res.json().then(menuItems =>{
                setMenuItems(menuItems);
            });
        });
    }, [])

    if(loading)
    {
        return 'Loading user info';
    }
    if(!data.admin){
        return 'Not an admin';
    }
    return(
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}>
                    Create new menu item    <Right /></Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 mt-4">Edit menu item</h2>
                {menuItems?.length > 0 && menuItems.map(item => (
                    <button className="mb-1">
                        {item.name}
                    </button>
                    ))}
            </div>
        </section>
    )
}