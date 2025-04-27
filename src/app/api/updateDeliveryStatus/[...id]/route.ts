import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { getUserId } from "@/action/user";
import axios from "axios";
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string[] } }
) {
  try {
    const { status } = await req.json();
    const [deliveryId, orderId] = params.id;

    console.log('deliveryid and orderId', deliveryId, orderId);
    console.log('status is ', status);

    const agentId = await getUserId();
    if (status==='PICKED_UP') {
      const updateDelivery = await prisma.delivery.update({
        where: {
          id: deliveryId
        },
        data: {
          deliveryAgentId: agentId,
          status
        }
      });     
    }
    //It is execute when delivery agent a marked a order delivered or cancelled

    else{
      const agentId=await getUserId()
      if (!agentId) {
        throw new Error('Unauthenticated Agent is try to update dat')
      }
      const updateTotalDeliveries = await prisma.deliveryAgent.update({
        where: {
          id: agentId,  // The delivery agent's ID
        },
        data: {
          totalDeliveries: {
            increment: 1,  // Increment totalDeliveries by 1
          },
          totalEarnings: {
            increment: 40,  // Add 40 to totalEarnings
          },
        },
      });      

      const updateDelivery = await prisma.delivery.update({
        where: {
          id: deliveryId
        },
        data: {
          status
        }
      }); 
      console.log('updateDelivery is Deliverd at',updateDelivery)
    }

    let orderStatus='';
    switch (status) {
      case 'PICKED_UP':
        orderStatus='OutForDelivery'
        break;
      case 'DELIVERED':
        orderStatus='COMPLETED'
        break;
      case 'FAILED':
      orderStatus='CANCELLED'
        break;
      case 'RETURNED':
      orderStatus='RETURNED'
        break;
      default:
        break;
    }

    const ecommerceResponse = await axios.post(`${process.env.ECOMMERCE_API_URL}/api/update-order-status`, {
      orderId,
      deliveryAgentId:agentId,
      orderStatus
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ECOMMERCE_API_KEY}`
      }
    });
    if (ecommerceResponse.status!==200) {
      return NextResponse.json({ message: 'Failed unable to update Data' }, { status: 401 });
    }

    console.log('ecommerceResponse is ',ecommerceResponse);

    return NextResponse.json({ message: 'Status is updated' }, { status: 201 });
  } catch (error) {
    console.error('Error updating delivery:', error);
    return NextResponse.json({ message: 'Failed unable to update Data' }, { status: 401 });
  }
}