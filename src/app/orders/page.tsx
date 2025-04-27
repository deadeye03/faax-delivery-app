import React from 'react'
import prisma from '@/lib/db/prisma'
import { getUserId } from '@/action/user'
import DeliveryAgentOrders from '@/components/DeliveryAgentOrders';
async function page() {
    const agent=await getUserId();
    const activeOrders= await prisma.delivery.findMany({
        where:{
            deliveryAgentId:agent,
            status:'PICKED_UP'
        }
    })
    const completedOrders= await prisma.delivery.findMany({
        where:{
            deliveryAgentId:agent,
            status:{
                in:['DELIVERED','FAILED','RETURNED']
            }
        }
    })
    console.log('completed up order is ',completedOrders)
  return (
    <>
    <DeliveryAgentOrders activeOrders={activeOrders} completedOrders={completedOrders} />
    </>
  )
}

export default page
