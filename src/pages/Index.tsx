import { Link } from 'react-router-dom';
import { Calendar, Clock, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl animate-scale-in">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
              AgendeFácil
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              O sistema de agendamento inteligente para profissionais autônomos e empresas. 
              Simplifique sua gestão e conquiste mais clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link to="/agendar">
                <Button size="lg" className="text-lg px-8">
                  Agendar Horário
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Área do Profissional
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4">Por que escolher o AgendeFácil?</h2>
          <p className="text-muted-foreground">Recursos completos para transformar seu negócio</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-primary transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Agendamento Online</h3>
              <p className="text-sm text-muted-foreground">
                Seus clientes agendam 24/7 de forma simples e rápida
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center">
                <Clock className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Gestão de Tempo</h3>
              <p className="text-sm text-muted-foreground">
                Controle total sobre sua agenda e horários disponíveis
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Base de Clientes</h3>
              <p className="text-sm text-muted-foreground">
                Mantenha histórico completo de todos os seus clientes
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-all duration-200 hover:shadow-lg">
            <CardContent className="p-6 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold">Relatórios</h3>
              <p className="text-sm text-muted-foreground">
                Acompanhe seu faturamento e crescimento em tempo real
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-secondary text-white border-0">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl font-heading font-bold">
              Pronto para revolucionar seu negócio?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Comece gratuitamente e descubra como é fácil gerenciar seus agendamentos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/login">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
