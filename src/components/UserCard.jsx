'use client'
import { useSession } from 'next-auth/react';
import React from 'react';

const UserCard = () => {
    const session=useSession();
    console.log(session);
    return (
        <div className='flex flex-col items-center'>
            <h2 className='font-bold text-3xl'>User - Client</h2>
            <div className='border-2 p-3'>{JSON.stringify(session)} </div>
        </div>
    );
};

export default UserCard;