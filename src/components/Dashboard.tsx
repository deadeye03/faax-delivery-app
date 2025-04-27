'use client'

import React, { useState, useEffect } from 'react'
import { Bell, Home, Package, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from '@/hooks/use-toast'
import UnassignedOrder from './UnassignedOrder'

type agentProps={
  agent:{
    id:string,
    name:string,
    email:String,
    isAvailable:boolean,
    totalDeliveries:number,
    totalEarnings:number,
    ratings:number
  };
}

export default function Dashboard({agent}:agentProps) {
  const [agentName, setAgentName] = useState("John Doe")
  const [totalEarnings, setTotalEarnings] = useState(1250)


  // useEffect(() => {
  //   socketInitializer()

  //   return () => {
  //     if (socket) socket.disconnect()
  //   }
  // }, [])

  // const socketInitializer = async () => {
  //   await fetch('/api/socket')
  //   socket = io()

  //   socket.on('connect', () => {
  //     console.log('Connected to WebSocket')
  //   })

  //   socket.on('orderUpdate', handleOrderUpdate)
  //   socket.on('statsUpdate', handleStatsUpdate)
  // }

 
  return (
    <div className="flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder-avatar.jpg" alt={agentName} />
            <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">{agent.name}</h1>
            <p className="text-sm text-gray-500">Delivery Agent</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Earnings</p>
          <p className="text-lg font-semibold">${agent.totalEarnings}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 space-y-4 overflow-y-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{agent.totalDeliveries}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Today's Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">0</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${agent.totalEarnings}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Today Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${agent.totalEarnings}</p>
            </CardContent>
          </Card>
        </div>

        {/* Unassigned Orders */}

      </main>

     
    </div>
  )
}