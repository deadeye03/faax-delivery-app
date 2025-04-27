import prisma from "@/lib/db/prisma";
export async function getUnassignedOrders() {
    const getAllOrders=await prisma.delivery.findMany({
        where: {
            status: 'ASSIGNED',
          },
    })
    return getAllOrders;
}