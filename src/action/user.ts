"use server"
// ./actions/user.js


import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/db/prisma';

export async function syncUser() {
    console.log('synch user')
    const { userId } = auth()
    if (!userId) {
        console.log("Not authenticated");
        return null;
    }

    const user = await currentUser();
    if (!user) {
        console.log("User not found");
        return null;
    }
    const name = `${user.firstName} ${user.lastName}`.trim();
    const emails = user.emailAddresses[0].emailAddress;
    const phoneNumbers = user.phoneNumbers[0].phoneNumber;
    console.log('emails aare ', emails)
    const users = await prisma.deliveryAgent.upsert({
        where: { clerkId: userId },
        update: {
            name: name,
            email: emails,
            phoneNumber: phoneNumbers,
        },
        create: {
            clerkId: userId,
            name: name,
            phoneNumber: phoneNumbers,
            email: emails,
        },
    });
    console.log('my users', users)
    return users;
}

export async function getUserId() {
    const { userId } = auth()
    if (!userId) {
        console.log("Not authenticated");
        return null;
    }
    try {
        const user = await prisma.deliveryAgent.findFirst({
            where: {
                clerkId: userId
            }
        })
        // console.log(user)
        if (!user) {
            throw new Error('user not found');
        }
        return user.id;

    } catch (error: any) {
        console.log('unabel to get id', error);
        throw new Error('unable to get id', error)
    }
}

export async function getUser() {
    const { userId } = auth()
    console.log('User id is',userId)
    if (!userId) {
        console.log("Not authenticated");
        return null;
    }
    try {
        const user = await prisma.deliveryAgent.findFirst({
            where: {
                clerkId: userId
            }
        })
        // console.log(user)
        if (!user) {
            throw new Error('user not found');
        }
        return user;

    } catch (error: any) {
        console.log('unabel to get id', error.message);
        throw new Error('unable to get id', error)
    }
}