import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupSchema, signinSchema } from "@sidonweb/medium-clone-zod";


const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

userRoute.post('/signup', async (c) => {
    // Connect to Prisma
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return c.json({error: 'Invalid Request'});
    }

    // zod the body and hash the password
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name || null,
            }
        });

        //Generate JWT Token
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        // Return JWT token
        return c.json({ jwt: token });

    } catch (error) {

        console.log(error);
        return c.json({ error: 'Error creating user' });

    } finally {
        // Close Prisma connection
        await prisma.$disconnect();
    }
});

userRoute.post('/signin', async (c) => {
    // Connect to Prisma
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return c.json({error: 'Invalid Request'});
    }

    // zod the body and hash the password
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            }
        });

        if (!user) {
            c.status(403);
            return c.json({ error: "Invalid Credentials" });
        }

        //Generate JWT Token
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);

        // Return JWT token
        return c.json({ jwt: token });

    } catch (error) {

        console.log(error);
        return c.json({ error: 'Error creating user' });

    } finally {
        // Close Prisma connection
        await prisma.$disconnect();
    }
});

export default userRoute;