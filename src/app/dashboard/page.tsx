import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Mic, Users } from "lucide-react"
import DashboardLayout from "./layout"
import { EventsTable } from "@/components/EventTablet"
import { SermonsTable } from "@/components/SermonesTablet"
import { UsersTable } from "@/components/UserTablet"
import { BlogsTable } from "@/components/BlogTablet"


export default function DashboardPage() {
  return (
   
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Blogs" value="24" description="Total de entradas" icon={<FileText className="h-5 w-5" />} />
          <StatsCard
            title="Eventos"
            value="12"
            description="Próximos eventos"
            icon={<Calendar className="h-5 w-5" />}
          />
          <StatsCard title="Sermones" value="36" description="Total de sermones" icon={<Mic className="h-5 w-5" />} />
          <StatsCard
            title="Usuarios"
            value="128"
            description="Usuarios registrados"
            icon={<Users className="h-5 w-5" />}
          />
        </div>

        {/* Content Management Tabs */}
        <Tabs defaultValue="blogs">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
            <TabsTrigger value="sermons">Sermones</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
          </TabsList>
          <TabsContent value="blogs" className="mt-4">
            <BlogsTable />
          </TabsContent>
          <TabsContent value="events" className="mt-4">
            <EventsTable />
          </TabsContent>
          <TabsContent value="sermons" className="mt-4">
            <SermonsTable />
          </TabsContent>
          <TabsContent value="users" className="mt-4">
            <UsersTable />
          </TabsContent>
        </Tabs>
      </div>
    
  )
}

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

