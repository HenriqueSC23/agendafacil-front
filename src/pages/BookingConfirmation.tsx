import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, date, time, name } = location.state || {};

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardContent className="pt-12 pb-8 px-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full flex items-center justify-center shadow-xl animate-pulse">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Agendamento Confirmado!
              </h1>
              <p className="text-muted-foreground">
                Seu horário foi reservado com sucesso
              </p>
            </div>

            <div className="bg-muted/50 rounded-xl p-6 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Cliente</p>
                  <p className="font-medium">{name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Serviço</p>
                  <p className="font-medium">{service}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Data</p>
                  <p className="font-medium">{date ? formatDate(date) : '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Horário</p>
                  <p className="font-medium">{time}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(service || '')}&dates=${date?.replace(/-/g, '')}T${time?.replace(':', '')}00/${date?.replace(/-/g, '')}T${time?.replace(':', '')}00`, '_blank')}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Adicionar ao Google Calendar
              </Button>

              <Button 
                variant="outline" 
                className="w-full" 
                size="lg"
                onClick={() => navigate('/agendar')}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
