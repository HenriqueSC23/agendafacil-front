import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { monthlyRevenueData, servicesData } from '@/data/mockData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

export default function Billing() {
  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = totalRevenue / monthlyRevenueData.length;

  const handleExport = () => {
    toast.success('Relatório exportado com sucesso!');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 lg:ml-64">
        <AdminHeader title="Faturamento & Relatórios" />
        
        <main className="p-4 md:p-6 space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">Análise financeira e relatórios</p>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>

          {/* Revenue Stats */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Faturado</p>
                    <p className="text-3xl font-heading font-bold">
                      R$ {totalRevenue.toFixed(2)}
                    </p>
                    <p className="text-sm text-success">+18% vs período anterior</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-success/10 to-success/5">
                    <DollarSign className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Média Mensal</p>
                    <p className="text-3xl font-heading font-bold">
                      R$ {avgRevenue.toFixed(2)}
                    </p>
                    <p className="text-sm text-primary">Últimos 6 meses</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Mês Atual</p>
                    <p className="text-3xl font-heading font-bold">
                      R$ {monthlyRevenueData[monthlyRevenueData.length - 1].revenue.toFixed(2)}
                    </p>
                    <p className="text-sm text-success">Melhor mês do ano</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-secondary/5">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Evolução do Faturamento</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`R$ ${value.toFixed(2)}`, 'Faturamento']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Services Revenue */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Faturamento por Serviço</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {servicesData.filter(s => s.active).map((service) => {
                  const estimate = service.price * Math.floor(Math.random() * 20 + 10);
                  return (
                    <div key={service.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">R$ {service.price.toFixed(2)} por sessão</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">R$ {estimate.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Este mês</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
