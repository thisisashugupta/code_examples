import React from 'react';
// import { PrismaClient } from '@prisma/client'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '../api/auth/[...nextauth]/options'
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(2).max(75),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>; // extract the inferred type

export default function CreateUserPage () {
  
  // Server Action
  
  async function addUser(e: FormData) {
    'use server';
    // const session = await getServerSession(authOptions);
    const name = "session?.user?.name";
    const email = "session?.user?.email";
    if (!email || !name) return;
    const parsedUser = UserSchema.safeParse({name, email});
    if (!parsedUser.success) return;
    try {
      const newUser = "saveToDb"; // await prisma.user.create({ data: { name, email } });
    } catch (error) {
        console.error(error);
    } finally {
        // prisma.$disconnect();
    }  
  }

  return (
  <div>
    <h1>Create New User</h1>
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <form action={addUser}>
        <button type='submit'>Add</button>
      </form>
    </div>
  </div>
  );
}