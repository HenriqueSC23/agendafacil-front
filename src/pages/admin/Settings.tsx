import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Clock, MessageSquare, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [sendReminders, setSendReminders] = useState(true);

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 ml-64">
        <AdminHeader title="Configurações" />
        
        <main className="p-6 space-y-6 max-w-4xl">
          {/* Perfil do Profissional */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <User className="h-5 w-5" />
                Perfil do Profissional
              </CardTitle>
              <CardDescription>Informações básicas do seu negócio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" />
                  <AvatarFallback>CS</AvatarFallback>
                </Avatar>
                <Button variant="outline">Alterar Foto</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" defaultValue="Carlos Silva" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business">Tipo de Negócio</Label>
                  <Input id="business" defaultValue="Barbearia" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 99999-8888" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="carlos@email.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" defaultValue="Rua das Flores, 123 - São Paulo, SP" />
              </div>
            </CardContent>
          </Card>

          {/* Horários de Atendimento */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horários de Atendimento
              </CardTitle>
              <CardDescription>Defina seus horários de funcionamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day, index) => (
                <div key={day} className="flex items-center gap-4">
                  <div className="w-24">
                    <Label>{day}</Label>
                  </div>
                  <Switch defaultChecked={index < 6} />
                  <div className="flex items-center gap-2 flex-1">
                    <Input type="time" defaultValue="09:00" className="w-32" />
                    <span className="text-muted-foreground">até</span>
                    <Input type="time" defaultValue="18:00" className="w-32" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Mensagens Automáticas */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Mensagens Automáticas
              </CardTitle>
              <CardDescription>Personalize as mensagens enviadas aos clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">Confirmação de Agendamento</p>
                  <p className="text-sm text-muted-foreground">Enviada após o cliente agendar</p>
                </div>
                <Switch checked={autoConfirm} onCheckedChange={setAutoConfirm} />
              </div>

              {autoConfirm && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="confirmation">Mensagem de Confirmação</Label>
                  <Textarea
                    id="confirmation"
                    rows={4}
                    defaultValue="Olá {nome}! Seu agendamento foi confirmado para {data} às {horario}. Até breve!"
                  />
                  <p className="text-xs text-muted-foreground">
                    Use: {'{nome}'}, {'{data}'}, {'{horario}'}, {'{servico}'}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <p className="font-medium">Lembrete de Agendamento</p>
                  <p className="text-sm text-muted-foreground">Enviada 24h antes do horário</p>
                </div>
                <Switch checked={sendReminders} onCheckedChange={setSendReminders} />
              </div>

              {sendReminders && (
                <div className="space-y-2 animate-fade-in">
                  <Label htmlFor="reminder">Mensagem de Lembrete</Label>
                  <Textarea
                    id="reminder"
                    rows={4}
                    defaultValue="Olá {nome}! Lembramos que você tem um agendamento amanhã às {horario}. Nos vemos em breve!"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botão Salvar */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSave} size="lg">
              <Save className="h-4 w-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
