import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostSchema, updatePostSchema } from "@sidonweb/medium-clone-zod";

const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    
    }
}>();

blogRoute.use("/*", async(c, next) => {
    const jwttoken =  c.req.header('Authorization');
    if(!jwttoken){
        c.status(401);
        return c.json({message: "Unauthorized"})
    }
    const token = jwttoken.split(" ")[1];
    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        if(payload){
            c.set('userId', payload.id);
            await next();
        }
    } catch (error: any) {
        c.status(401);
		return c.json({error: error.message})
    }

} )


blogRoute.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createPostSchema.safeParse(body);
    if (!success) {
        return c.json({ error: 'Invalid Request' });
    }
    const userId = c.get('userId');
    console.log(userId);
    // Connect to Prisma
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });

        return c.json(post);

    } catch (error) {
        console.log(error);
        return c.json({ error: 'Error creating post' });
    }
});

blogRoute.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updatePostSchema.safeParse(body);
    if (!success) {
        return c.json({ error: 'Invalid Request' });
    }
    // Connect to Prisma
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                authorId: "1"
            }
        });

        return c.json(post);

    } catch (error) {
        console.log(error);
        return c.json({ error: 'Error updating post' });
    }
});


// we've to add pagination here
blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany();
        return c.json(posts);
    } catch (error) {
        console.log(error);
        return c.json({ error: 'Error fetching posts' });
    }
})

blogRoute.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: id
            }
        });
        return c.json(blog);
    } catch (error) {
        console.log(error);
        return c.json({ error: 'Error fetching post' });
    }
})




export default blogRoute;