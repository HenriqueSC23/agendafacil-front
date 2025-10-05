import { useState } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AdminHeader } from '@/components/AdminHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Clock, DollarSign } from 'lucide-react';
import { servicesData } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function Services() {
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    toast.success('Serviço salvo com sucesso!');
    setOpen(false);
  };

  const handleDelete = (serviceName: string) => {
    toast.success(`Serviço "${serviceName}" excluído com sucesso!`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      
      <div className="flex-1 lg:ml-64">
        <AdminHeader title="Gerenciamento de Serviços" />
        
        <main className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">Gerencie os serviços oferecidos</p>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Serviço
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-heading">Novo Serviço</DialogTitle>
                  <DialogDescription>Adicione um novo serviço ao catálogo</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Serviço</Label>
                    <Input id="name" placeholder="Ex: Corte Masculino" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea id="description" placeholder="Descreva o serviço..." rows={3} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duração (min)</Label>
                      <Input id="duration" type="number" placeholder="30" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Valor (R$)</Label>
                      <Input id="price" type="number" placeholder="45.00" step="0.01" />
                    </div>
                  </div>

                  <Button onClick={handleSave} className="w-full">
                    Salvar Serviço
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <Card key={service.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-heading text-xl">{service.name}</CardTitle>
                    <Badge variant={service.active ? 'default' : 'secondary'}>
                      {service.active ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{service.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-semibold">
                        <DollarSign className="h-4 w-4 text-success" />
                        <span>R$ {service.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(service.name)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
