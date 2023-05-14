import Que from "@models/que";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const ques = await Que.find({}).populate('creator')

        return new Response(JSON.stringify(ques), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all questions", { status: 500 })
    }
} 