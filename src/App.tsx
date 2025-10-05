import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/contexts/SidebarContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ClientBooking from "./pages/ClientBooking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Dashboard from "./pages/admin/Dashboard";
import Calendar from "./pages/admin/Calendar";
import Services from "./pages/admin/Services";
import Clients from "./pages/admin/Clients";
import Billing from "./pages/admin/Billing";
import Settings from "./pages/admin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/agendar" element={<ClientBooking />} />
            <Route path="/confirmacao" element={<BookingConfirmation />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/calendario" element={<Calendar />} />
            <Route path="/admin/servicos" element={<Services />} />
            <Route path="/admin/clientes" element={<Clients />} />
            <Route path="/admin/faturamento" element={<Billing />} />
            <Route path="/admin/configuracoes" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
