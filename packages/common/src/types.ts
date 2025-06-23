import {z} from "zod"

 export const UserRequiredbody = z.object({
        name:z.string(),
        username: z.string().email(),
        password: z.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
    });

     export const SigninRequiredbody = z.object({
        username: z.string().email(),
        password: z.string().min(4, { message: "Password must be at least 4 characters" }).max(10, { message: "Password must be at most 10 characters" })
    });
 export const RoomRequiredbody = z.object({
        name:z.string()
    });