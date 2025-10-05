import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { statsData, chartData, appointmentsData } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const upcomingAppointments = appointmentsData.slice(0, 5);

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Dashboard" />
        
        <main className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Atendimentos da Semana"
              value={statsData.weeklyAppointments}
              icon={Calendar}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Clientes Totais"
              value={statsData.totalClients}
              icon={Users}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Faturamento Mensal"
              value={`R$ ${statsData.monthlyRevenue.toFixed(2)}`}
              icon={DollarSign}
              trend={{ value: 15, isPositive: true }}
            />
            <StatCard
              title="Taxa de Ocupação"
              value={`${statsData.occupancyRate}%`}
              icon={TrendingUp}
              trend={{ value: 5, isPositive: true }}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Agendamentos por Dia</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="appointments" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Próximos Atendimentos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{appointment.clientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.serviceName}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')}
                        </p>
                        <div className="flex items-center gap-2 justify-end">
                          <p className="text-sm text-muted-foreground">{appointment.time}</p>
                          <Badge 
                            variant={
                              appointment.status === 'confirmed' ? 'default' :
                              appointment.status === 'completed' ? 'secondary' :
                              appointment.status === 'cancelled' ? 'destructive' :
                              'outline'
                            }
                          >
                            {appointment.status === 'confirmed' ? 'Confirmado' :
                             appointment.status === 'completed' ? 'Concluído' :
                             appointment.status === 'cancelled' ? 'Cancelado' :
                             'Pendente'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
