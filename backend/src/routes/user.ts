import { Hono } from "hono";
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { signupSchema, signinSchema } from "@sidonweb/medium-clone-zod";


const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    
    }
}>();


userRoute.use("/profile", async(c, next) => {
    const jwttoken =  c.req.header('Authorization');
    if(!jwttoken){
        c.status(401);
        return c.json({message: "Unauthorized"})
    }
    const token = jwttoken.split(" ")[1];
    try {
        const payload = await verify(token, c.env.JWT_SECRET);
        console.log("kvjhffi", payload)
        if(payload){
            c.set('userId', payload.id);
            await next();
        }
    } catch (error: any) {
        c.status(401);
		return c.json({error: error.message})
    }

} )

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
                name: body.name || "Anonymous",
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
        return c.json({ error: 'Error signing in user' });

    } finally {
        // Close Prisma connection
        await prisma.$disconnect();
    }
});

userRoute.get("/profile", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');

    try {
        // Fetch user info along with their blog posts
        const userProfile = await prisma.user.findUnique({
            where: {
                id: userId // Assuming you have the user's ID available in the request context
            },
            include: {
                posts: true // Include all posts related to this user
            }
        });
        // Return the user profile along with their posts
        return c.json(userProfile);
    } catch (error) {
        // Handle errors
        console.error("Error fetching user profile:", error);
        c.status(500);
        c.json({ error: "Internal server error" });
    } finally {
        await prisma.$disconnect(); // Disconnect from the Prisma client
    }
});

export default userRoute;