import { comments } from "./data";

export async function GET() {
    return  Response.json(comments)
}


export async function POST(request: Request) {
    const comments = await request.json();
    const newComment = {
        id: comments.length+1,
        name: comments.name,
        email: comments.email,
        age: comments.age,
    }
    comments.push(newComment)

    return new Response(JSON.stringify(newComment), {
        headers: {
            "Content-type":"application/json",
        },
        status: 201,
    })
}