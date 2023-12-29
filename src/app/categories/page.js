'use client';
import UserTabs from "@/components/layout/UserTabs";
import {useEffect, useState} from "react";
import {UseProfile} from "@/components/UseProfile";
import {toast} from "react-hot-toast";


export default function CategoriesPage(){

    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState('');
    const {loading:profileLoading, data:profileData} = UseProfile();
    const [editedCategory, setEditedCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    function fetchCategories(){
        fetch('/api/categories').then(res =>{
            res.json().then(categories => {
                setCategories(categories);
            });
        });
    }

    async function handleCategorySubmit(ev){
        ev.preventDefault();
        const creationPromise = new Promise(async (resolve, reject) => {
            const data = {name:categoryName};
            if(editedCategory){
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory? 'PUT':'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data),
            });
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if(response.ok)
                resolve();
            else reject();
        });
        await toast.promise(creationPromise, {
            loading: editedCategory? 'Updating category':'Creating new category...',
            success: editedCategory? 'Category updated':'Category created',
            error: 'Error',
        })
    }

    async function handleDeleteClick(_id){
        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/categories?_id='+_id, {
                method:'DELETE',
            });
            if(response.ok) resolve(); else reject();
        });

        await toast.promise(promise, {
            loading: 'loading',
            success: 'deleted',
            error: 'error',
        });
        fetchCategories();
    }

    if(profileLoading){
        return 'Loading info...';
    }

    if(!profileData.admin){
        return 'Not an admin';
    }
    return(
        <section className="mt-8 max-w-md mx-auto">
            <UserTabs isAdmin={true} />
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editedCategory ? 'Update category':'New category name'}
                            {editedCategory && (
                                <>: <b>{editedCategory.name}</b> </>
                            )}
                            </label>
                        <input type="text"
                        value={categoryName}
                        onChange={ev => setCategoryName(ev.target.value)}/>
                    </div>
                    <div className="pb-2">
                        <button className="border border-primary"
                            type="submit">
                            {editedCategory ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div
                        className="bg-gray-200 text-primary font-semibold rounded-xl p-2 px-4 flex gap-1 mb-2">
                        <div className="grow">{c.name}</div>
                        <div className="flex gap-1">
                            <button type="button" onClick={() => {
                                setEditedCategory(c);
                                setCategoryName(c.name);
                            }}>Edit</button>
                            <button
                                onClick={() => handleDeleteClick(c._id)}
                                type="button">Delete</button>
                        </div>

                    </div>
                ))
                }
            </div>
        </section>
    );
}