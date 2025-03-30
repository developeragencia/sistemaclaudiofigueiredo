
import React, { useState } from 'react';
import { Check, ChevronsUpDown, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useClient } from '@/contexts/ClientContext';
import { Client } from '@/types';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

interface ClientSwitcherProps {
  clients: Client[];
  className?: string;
}

const ClientSwitcher = ({ clients, className }: ClientSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const { activeClient, setActiveClient, loading } = useClient();
  const { toast } = useToast();

  // Handle client selection
  const selectClient = (client: Client) => {
    setActiveClient(client);
    setOpen(false);
    toast({
      title: "Cliente alterado",
      description: `${client.name} é agora o cliente ativo.`,
      variant: "default",
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecionar cliente ativo"
          className={cn(
            "w-60 justify-between overflow-hidden border-dashed border-muted bg-background/50 hover:bg-background/80 transition-all",
            className
          )}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="truncate">Carregando clientes...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 truncate">
                <Briefcase className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">
                  {activeClient ? activeClient.name : "Selecionar Cliente"}
                </span>
              </div>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Buscar cliente..." />
          <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {clients.map((client) => (
              <CommandItem
                key={client.id}
                value={client.name}
                onSelect={() => selectClient(client)}
                className="cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 w-full"
                >
                  {activeClient?.id === client.id && (
                    <Check className="mr-2 h-4 w-4 text-primary" />
                  )}
                  <span className={cn(
                    "truncate flex-1",
                    activeClient?.id === client.id ? "font-medium" : ""
                  )}>
                    {client.name}
                  </span>
                  <span className={cn(
                    "ml-auto text-xs rounded-full px-2 py-0.5",
                    client.status === 'active' ? "bg-green-100 text-green-800" :
                    client.status === 'inactive' ? "bg-red-100 text-red-800" : 
                    "bg-yellow-100 text-yellow-800"
                  )}>
                    {client.status === 'active' ? 'Ativo' : 
                     client.status === 'inactive' ? 'Inativo' : 'Pendente'}
                  </span>
                </motion.div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ClientSwitcher;
