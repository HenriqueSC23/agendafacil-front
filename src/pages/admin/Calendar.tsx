import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, User, Edit, X } from 'lucide-react';
import { appointmentsData } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function Calendar() {
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointmentsData[0] | null>(null);

  const handleReschedule = () => {
    toast.success('Funcionalidade de reagendamento será implementada');
    setSelectedAppointment(null);
  };

  const handleCancel = () => {
    toast.success('Agendamento cancelado com sucesso');
    setSelectedAppointment(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Calendário de Agendamentos" />
        
        <main className="p-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-heading">Agendamentos do Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointmentsData.map((appointment) => (
                  <div
                    key={appointment.id}
                    onClick={() => setSelectedAppointment(appointment)}
                    className="p-4 rounded-xl border border-border hover:border-primary hover:bg-muted/50 cursor-pointer transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <CalendarIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{appointment.clientName}</p>
                          <p className="text-sm text-muted-foreground">{appointment.serviceName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">
                            {new Date(appointment.date).toLocaleDateString('pt-BR')}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                            <Clock className="h-3 w-3" />
                            {appointment.time}
                          </p>
                        </div>
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
        </main>
      </div>

      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Detalhes do Agendamento</DialogTitle>
            <DialogDescription>Informações completas do atendimento</DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                    <p className="font-medium">{selectedAppointment.clientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Serviço</p>
                    <p className="font-medium">{selectedAppointment.serviceName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <CalendarIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="font-medium">
                        {new Date(selectedAppointment.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Horário</p>
                      <p className="font-medium">{selectedAppointment.time}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleReschedule} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Reagendar
                </Button>
                <Button onClick={handleCancel} variant="destructive" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
