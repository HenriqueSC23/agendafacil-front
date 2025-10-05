import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/contexts/SidebarContext';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg md:text-2xl font-heading font-bold text-foreground">{title}</h1>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium">Carlos Silva</p>
              <p className="text-xs text-muted-foreground">Barbeiro</p>
            </div>
            <Avatar className="h-8 w-8 md:h-10 md:w-10">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos" />
              <AvatarFallback>CS</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
