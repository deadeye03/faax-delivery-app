import { getUnassignedOrders } from "@/action/order";
import { getUser } from "@/action/user";
import Dashboard from "@/components/Dashboard";
import UnassignedOrder from "@/components/UnassignedOrder";
import { checkUser } from "@/lib/checkUser";
import prisma from "@/lib/db/prisma";

export default async function Home() {
  const user=await checkUser();
  const agent= await getUser();
  const getAllUnassignedOrder=await getUnassignedOrders();
  console.log('all unassigned order is ',getAllUnassignedOrder)
  if (!agent) {
    return <div>No Elivery agent found here</div>
  }
  return (
    <>
      {agent ? <Dashboard agent={agent} /> : <div>No agent found</div>}
      {getAllUnassignedOrder.length>0 ? <div className="p-4"> <UnassignedOrder getAllorders={getAllUnassignedOrder} /></div>: <div className="text-center p-24 text-xl ">Current Not have Any Orders</div> }
    </>
  );
}
