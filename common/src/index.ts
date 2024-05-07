import z from 'zod';


export const signupSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6)
});
export type SignupInput = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});
export type SigninInput = z.infer<typeof signinSchema>;

export const createPostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
})
export type CreatePostInput = z.infer<typeof createPostSchema>;

export const updatePostSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string()
})
export type UpdatePostInput = z.infer<typeof updatePostSchema>;