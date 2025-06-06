import React, { useState } from 'react'
import UserNav from './UserNav'

export default function UserProfile() {
    const [user,setuser]=useState('');

    return (
        <>
            <UserNav />
            <div style={{padding:50}}>
                <h2>User Profile</h2>

            </div>
        </>
    )
}
