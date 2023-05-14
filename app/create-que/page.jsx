'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";


export default function CreateQue() {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        que: '',
        tag: '',
    })

    const createQue = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/que/new", {
                method: "POST",
                body: JSON.stringify({
                    que: post.que,
                    userId: session?.user.id,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form
            type='Add'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createQue}
        />
    )
}
