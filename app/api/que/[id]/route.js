import Que from "@models/que";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const que = await Que.findById(params.id).populate("creator")
        if (!que) return new Response("Question Not Found", { status: 404 });

        return new Response(JSON.stringify(que), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { que, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing question by ID
        const existingQue = await Que.findById(params.id);

        if (!existingQue) {
            return new Response("Question not found", { status: 404 });
        }

        // Update the question with new data
        existingQue.que = que;
        existingQue.tag = tag;

        await existingQue.save();

        return new Response("Successfully updated the Question", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Question", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the question by ID and remove it
        await Que.findByIdAndRemove(params.id);

        return new Response("Question deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting question", { status: 500 });
    }
};