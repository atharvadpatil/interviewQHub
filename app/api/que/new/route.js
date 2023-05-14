import { connectToDB } from "@utils/database";
import Que from "@models/que";


export const POST = async (req) => {
    const { userId, que, tag } = await req.json();

    try {
        await connectToDB();
        const newQue = new Que({ creator: userId, que, tag });

        await newQue.save();
        return new Response(JSON.stringify(newQue), { status: 201 })

    } catch (error) {
        return new Response("Failed to create a new Question", { status: 500 });
    }
}