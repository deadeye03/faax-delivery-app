import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db/prisma";

export const checkUser = async () => {
    const user = await currentUser();
  
    if (!user) {
      return null;
    }
  
    try {
      const loggedInUser = await prisma.deliveryAgent.findUnique({
        where: {
          clerkId: user.id,
        },
      });
  
      if (loggedInUser) {
        return loggedInUser;
      }
  
      const name = `${user.firstName} ${user.lastName}`;
  
      const newUser = await prisma.deliveryAgent.create({
        data: {
          clerkId: user.id,
          name,
          email: user.emailAddresses[0].emailAddress,
          phoneNumber:user.phoneNumbers[0].phoneNumber
        },
      });
  
      return newUser;
    } catch (error:any) {
      console.log(error.message);
    }
  };