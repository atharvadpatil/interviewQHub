'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";


import Form from "@components/Form";


export default function EditQue() {
    const router = useRouter();

    const { status } = useSession();

    if (status === "loading") {
      return <div></div>
  }

  if (status === 'unauthenticated') {
      router.push('/');
      return <div></div>
  }

    const searchParams = useSearchParams();
    const queId = searchParams.get("id");

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        que: '',
        tag: '',
    });

    useEffect(() => {
        const getQueDetails = async () => {
            const response = await fetch(`/api/que/${queId}`);
            const data = await response.json();

            setPost({
                que: data.que,
                tag: data.tag,
            });
        };

        if (queId) getQueDetails();
    }, [queId]);


    const updateQue = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        if (!queId) return alert("Missing QueId!");
    
        try {
          const response = await fetch(`/api/que/${queId}`, {
            method: "PATCH",
            body: JSON.stringify({
              que: post.que,
              tag: post.tag,
            }),
          });
    
          if (response.ok) {
            router.push("/profile");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsSubmitting(false);
        }
      };

    return (
        <Form
            type='Edit'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updateQue}
        />
    )
}
