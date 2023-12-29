'use client';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";
import Image from 'next/image';
import {useEffect, useState} from "react";
import Link from "next/link";
import UserTabs from "@/components/layout/UserTabs";

export default function ProfilePage(){
    const session = useSession();
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState('');
    const [saved,setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [phone, setPhone] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [number, setNumber] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const {status} = session;

    useEffect(()=>{
        if(status === 'authenticated'){
            setUserName(session.data.user.name);
            setImage(session.data.user.image);
             fetch('/api/profile').then((response) =>{
                 response.json().then(data => {
                     setCity(data.city);
                     setPhone(data.phone);
                     setNumber(data.number);
                     setPostalCode(data.postalCode);
                     setStreetAddress(data.streetAddress);
                     setIsAdmin(data.admin);
                 })
             });
        }
    } ,[session, status]);

    async function handleProfileInfoUpdate(ev){
        ev.preventDefault();
        setSaved(false);
        setIsSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: userName,
                phone,
                image,
                streetAddress,
                postalCode,
                city,
                number,
            } ),
        });
        setIsSaving(false);
        if(response.ok){
            setSaved(true);
        }
    }

    async function handleFileChange(ev) {
        const files = ev?.target.files;
        if(files?.length === 1)
        {
            const data = new FormData;
            data.set('file', files[0]);
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: data,
            });
            const link = await response.json();
            setImage(link);
        }
    }

    if(status === 'loading'){
        return 'Loading...';
    }

    if(status === 'unauthenticated'){
        return redirect('/login');
    }


    return(
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <h1 className="text-center text-primary text-4xl font-bold"></h1>
            <div className="max-w-md mx-auto mt-8">
                {saved && (
                    <h2 className="text-center p-2 text-primary">Profile saved.</h2>
                )}
                {isSaving && (
                    <h2 className="text-center p-2 text-blue-800">Saving in process.</h2>
                )}
                <div className="flex gap-4">
                    <div>
                        <div className=" p-2 rounded-lg relative max-w-[120px]">
                            {image && (
                                <Image className="rounded-lg h-full w-full mb-4"
                                       src={image} width={250} height={250} alt={'avatar'} />
                            )}
                            <label>
                                <input type="file" className="hidden" onChange={handleFileChange}/>
                                <span className="block border rounded-lg
                                p-2 mt-4 text-center text-primary font-semibold
                                cursor-pointer">
                                    Change photo</span>
                            </label>
                        </div>
                    </div>
                    <form className="grow" onSubmit={handleProfileInfoUpdate}>
                        <label>Name</label>
                    <input type="text" placeholder="First name and last name"
                        value={userName} onChange={ev => setUserName(ev.target.value)}/>
                        <label>Email</label>
                        <input type="email" disabled={true} value={session.data.user.email} />
                        <label>Phone Number</label>
                        <input type="tel" placeholder="Phone number" value={phone} onChange={ev => setPhone(ev.target.value)} />
                        <label>Street</label>
                        <input type="text" placeholder="Street address" value={streetAddress} onChange={ev => setStreetAddress(ev.target.value)}/>
                        <label>Number</label>
                        <input type="number" placeholder="No" value={number} onChange={ev => setNumber(ev.target.value)} />
                        <div className="flex gap-2">
                            <div>
                            <label>Postal Code</label>
                            <input style={{'margin':'0'}} type="text" placeholder="Postal Code" value={postalCode} onChange={ev => setPostalCode(ev.target.value)}/>
                            </div>
                            <div>
                                <label>City</label>
                                <input style={{'margin':'0'}} type="text" placeholder="City" value={city} onChange={ev => setCity(ev.target.value)}/>
                            </div>
                            </div>
                        <button type="submit" className="mt-2">Save</button>
                    </form>
                </div>
            </div>
        </section>   )
}
