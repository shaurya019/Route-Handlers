import { comments } from "../comments/data";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const comment = comments.find((x) => x.id === parseInt(params.id));
    return Response.json(comment);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    const { name, email, age } = body;
    
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    const idx = comments.findIndex((x) => x.id === id);
    if (idx === -1) {
        return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
    }

    comments[idx].name = name;
    comments[idx].email = email;
    comments[idx].age = age;

    return new Response(JSON.stringify(comments[idx]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    const { name, email, age } = body;
    
    const id = parseInt(params.id);
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "Invalid ID" }), { status: 400 });
    }

    const idx = comments.findIndex((x) => x.id === id);
    if (idx === -1) {
        return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
    }

    const deleteComment = comments[idx];
    comments.splice(idx, 1);
    return Response.json(deleteComment);
}