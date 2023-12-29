'use client';
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";


export default function Header(){
    const session = useSession();
    console.log(session);
    const status = session?.status;
    const userData = session.data?.user;
    let userName =  userData?.name || userData?.email;
    console.log(userName);
    if(userName && userName.includes(' ')) {
        userName = userName.split(' ')[0];
    }
    if(status==="authenticated"){
        return (
            <header className="flex items-center justify-between">
                <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                    <Link className="text-primary font-bold text-2xl" href="/">GLOVERSE</Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={''}>Menu</Link>
                    <Link href={''}>About</Link>
                    <Link href={''}>Contact</Link>
                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold">

                    <Link href={'/profile'}
                          className="text-primary whitespace-nowrap">
                        Hello, {userName}
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="bg-primary rounded-full text-white px-8 py-2">Logout</button>

                </nav>
            </header>
        );
    }else{
        return (
            <header className="flex items-center justify-between">
                <nav className="flex items-center gap-8 text-gray-500 font-semibold">
                    <Link className="text-primary font-bold text-2xl" href="/">GLOVERSE</Link>
                    <Link href={'/'}>Home</Link>
                    <Link href={''}>Menu</Link>
                    <Link href={''}>About</Link>
                    <Link href={''}>Contact</Link>

                </nav>
                <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                    <Link href={"/login"}>Login</Link>
                    <Link href={"/register"} className="bg-primary rounded-full text-white px-8 py-2">Register</Link>


                </nav>

            </header>
        );
    }
}