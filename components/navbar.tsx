import { getCategories } from '@/actions';
import React from 'react';
import Container from './ui/container';
import Link from 'next/link';
import MainNav from './main-navbar';
import NavbarActions from './navbar-actions';

const Navbar = async () => {
    const categories = await getCategories();
    return (
        <div className="border-b">
            <Container>
                <div className="flex justify-between relative px-4 sm:px-6 lg:px-8  h-16 items-center">
                    <div className=" flex">
                        <Link href="/" className="ml-4 lg:ml-0 gap-x-2 flex">
                            <p className="font-bold text-xl">STORE</p>
                        </Link>
                        <MainNav data={categories} />
                    </div>
                    <NavbarActions />
                </div>
            </Container>
        </div>
    );
};

export default Navbar;
