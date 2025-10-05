import { Link, useLocation } from 'react-router-dom';
import { Calendar, LayoutDashboard, Scissors, Users, DollarSign, Settings, LogOut, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: CalendarDays, label: 'Calendário', path: '/admin/calendario' },
  { icon: Scissors, label: 'Serviços', path: '/admin/servicos' },
  { icon: Users, label: 'Clientes', path: '/admin/clientes' },
  { icon: DollarSign, label: 'Faturamento', path: '/admin/faturamento' },
  { icon: Settings, label: 'Configurações', path: '/admin/configuracoes' },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-card z-50 flex flex-col">
      <div className="p-6 border-b border-border">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <Calendar className="h-8 w-8 text-primary" />
          <span className="text-xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AgendeFácil
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground font-medium shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair</span>
        </Link>
      </div>
    </aside>
  );
}
