import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Mail, Phone, Calendar, User } from 'lucide-react';
import { clientsData, appointmentsData } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<typeof clientsData[0] | null>(null);

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientHistory = (clientId: string) => {
    return appointmentsData.filter(apt => apt.clientId === clientId);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Clientes" />
        
        <main className="p-6">
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, telefone ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredClients.map((client) => (
              <Card 
                key={client.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200"
                onClick={() => setSelectedClient(client)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-heading font-semibold text-lg">{client.name}</h3>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{client.email}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium">{client.totalAppointments} agendamentos</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>

      <Dialog open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Perfil do Cliente</DialogTitle>
            <DialogDescription>Histórico e informações detalhadas</DialogDescription>
          </DialogHeader>
          
          {selectedClient && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Nome</p>
                  <p className="font-medium">{selectedClient.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
                  <p className="font-medium">{selectedClient.totalAppointments}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">{selectedClient.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium">{selectedClient.email}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-heading font-semibold mb-4">Histórico de Atendimentos</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {getClientHistory(selectedClient.id).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-3 rounded-lg border border-border flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{appointment.serviceName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                        </p>
                      </div>
                      <span className="text-sm px-2 py-1 rounded bg-muted">
                        {appointment.status === 'confirmed' ? 'Confirmado' :
                         appointment.status === 'completed' ? 'Concluído' :
                         appointment.status === 'cancelled' ? 'Cancelado' :
                         'Pendente'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
