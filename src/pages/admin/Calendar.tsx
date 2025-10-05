import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Clock, User, Edit, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { appointmentsData } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Calendar() {
  const [selectedAppointment, setSelectedAppointment] = useState<typeof appointmentsData[0] | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleReschedule = () => {
    toast.success('Funcionalidade de reagendamento será implementada');
    setSelectedAppointment(null);
  };

  const handleCancel = () => {
    toast.success('Agendamento cancelado com sucesso');
    setSelectedAppointment(null);
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointmentsData.filter(apt => 
      isSameDay(new Date(apt.date), date)
    );
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setViewMode('week');
  };

  const handleBackToMonth = () => {
    setViewMode('month');
    setSelectedDate(null);
  };

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekStart = selectedDate ? startOfWeek(selectedDate, { locale: ptBR }) : startOfWeek(currentDate, { locale: ptBR });
  const weekEnd = selectedDate ? endOfWeek(selectedDate, { locale: ptBR }) : endOfWeek(currentDate, { locale: ptBR });
  const daysInWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Calendário de Agendamentos" />
        
        <main className="p-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading">
                  {viewMode === 'month' ? 'Visão Mensal' : 'Visão Semanal'}
                </CardTitle>
                {viewMode === 'week' && (
                  <Button onClick={handleBackToMonth} variant="outline" size="sm">
                    Voltar ao Mês
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'month' ? (
                <div>
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <Button onClick={previousMonth} variant="ghost" size="icon">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <h3 className="text-xl font-semibold capitalize">
                      {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                    </h3>
                    <Button onClick={nextMonth} variant="ghost" size="icon">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Month Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                      <div key={day} className="text-center font-semibold text-sm text-muted-foreground p-2">
                        {day}
                      </div>
                    ))}
                    
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: monthStart.getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ))}
                    
                    {/* Days of the month */}
                    {daysInMonth.map(day => {
                      const appointments = getAppointmentsForDate(day);
                      const isToday = isSameDay(day, new Date());
                      
                      return (
                        <div
                          key={day.toISOString()}
                          onClick={() => handleDayClick(day)}
                          className={`
                            aspect-square p-2 rounded-lg border cursor-pointer
                            transition-all duration-200 hover:border-primary hover:shadow-md
                            ${isToday ? 'border-primary bg-primary/5' : 'border-border'}
                          `}
                        >
                          <div className="text-sm font-medium mb-1">
                            {format(day, 'd')}
                          </div>
                          {appointments.length > 0 && (
                            <div className="flex items-center justify-center">
                              <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">
                                {appointments.length}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Week View */}
                  <div className="mb-6 text-center">
                    <h3 className="text-lg font-semibold">
                      {format(weekStart, 'd MMM', { locale: ptBR })} - {format(weekEnd, 'd MMM yyyy', { locale: ptBR })}
                    </h3>
                  </div>

                  <div className="grid grid-cols-7 gap-4">
                    {daysInWeek.map(day => {
                      const appointments = getAppointmentsForDate(day);
                      const isSelected = selectedDate && isSameDay(day, selectedDate);
                      const isToday = isSameDay(day, new Date());
                      
                      return (
                        <div
                          key={day.toISOString()}
                          className={`
                            border rounded-lg p-3 min-h-[300px]
                            ${isSelected ? 'border-primary bg-primary/5' : 'border-border'}
                            ${isToday ? 'ring-2 ring-primary/20' : ''}
                          `}
                        >
                          <div className="text-center mb-3 pb-2 border-b">
                            <div className="text-xs text-muted-foreground capitalize">
                              {format(day, 'EEE', { locale: ptBR })}
                            </div>
                            <div className={`text-lg font-semibold ${isToday ? 'text-primary' : ''}`}>
                              {format(day, 'd')}
                            </div>
                          </div>

                          <div className="space-y-2">
                            {appointments.map(appointment => (
                              <div
                                key={appointment.id}
                                onClick={() => setSelectedAppointment(appointment)}
                                className="p-2 rounded-lg bg-muted hover:bg-muted/70 cursor-pointer transition-colors text-sm"
                              >
                                <div className="font-medium text-xs mb-1 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {appointment.time}
                                </div>
                                <div className="font-semibold text-sm truncate">
                                  {appointment.clientName}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                  {appointment.serviceName}
                                </div>
                                <Badge 
                                  className="mt-1"
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
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
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
