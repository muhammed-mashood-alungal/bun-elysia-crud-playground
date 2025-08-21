interface IPosts {
  id: string;
  text: string;
}

const posts: IPosts[] = [];

const server = Bun.serve({
  port: 3000,

  routes: {
    "/api/posts": {
      GET: () => {
        return Response.json(posts);
      },
      POST: async (req) => {
        const { text }: Omit<IPosts, "id"> = (await req.json()) as IPosts;

        const id = crypto.randomUUID();

        const newPost = { id, text };
        posts.push(newPost);
        return Response.json(newPost, { status: 201 });
      },
    },
  },
  fetch(req) {
    return new Response("hello World 2!");
  },
});

console.log(`Listening on http://localhost:${server.port} ......`);
