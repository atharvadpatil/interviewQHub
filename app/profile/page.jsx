'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

export default function MyProfile() {

    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div></div>
    }

    if (status === 'unauthenticated') {
        router.push('/');
        return <div></div>
    }

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();

            setMyPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-que?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this question?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/que/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = myPosts.filter((item) => item._id !== post._id);

                setMyPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Profile
            name='My'
            desc='Welcome to your profile page. Share your interview questions to help job seekers to land their dream job.'
            data={myPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
