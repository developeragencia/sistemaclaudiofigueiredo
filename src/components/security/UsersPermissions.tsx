
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { User, UserPlus, Search, UserCheck, UserX, ShieldCheck, Shield, Users, Pencil, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock roles data
const roles = [
  { id: 1, name: "Administrador", description: "Acesso completo ao sistema", users: 2 },
  { id: 2, name: "Auditor", description: "Acesso somente leitura a trilhas de auditoria", users: 3 },
  { id: 3, name: "Operador", description: "Acesso aos módulos operacionais", users: 5 },
  { id: 4, name: "Financeiro", description: "Acesso aos módulos financeiros", users: 4 },
];

// Mock users data
const usersData = [
  { id: 1, name: "Admin User", email: "admin@exemplo.com", role: "Administrador", status: "Ativo", lastLogin: "Hoje, 14:32" },
  { id: 2, name: "Auditor User", email: "auditor@exemplo.com", role: "Auditor", status: "Ativo", lastLogin: "Ontem, 18:45" },
  { id: 3, name: "Operator User", email: "operador@exemplo.com", role: "Operador", status: "Inativo", lastLogin: "10/10/2023, 09:21" },
  { id: 4, name: "Finance User", email: "financeiro@exemplo.com", role: "Financeiro", status: "Ativo", lastLogin: "Hoje, 10:15" },
];

// Mock permissions data for modules
const modulePermissions = [
  { id: 1, module: "Painel Administrativo", view: true, create: true, edit: true, delete: true },
  { id: 2, module: "Gestão de Clientes", view: true, create: true, edit: true, delete: false },
  { id: 3, module: "Créditos Tributários", view: true, create: false, edit: false, delete: false },
  { id: 4, module: "Relatórios", view: true, create: true, edit: false, delete: false },
  { id: 5, module: "Segurança & Auditoria", view: false, create: false, edit: false, delete: false },
];

const UsersPermissions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState<boolean>(false);
  const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState<boolean>(false);
  const [isEditPermissionsOpen, setIsEditPermissionsOpen] = useState<boolean>(false);

  // Form states for new user
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "active"
  });

  // Form states for new role
  const [newRole, setNewRole] = useState({
    name: "",
    description: ""
  });

  const [selectedPermissions, setSelectedPermissions] = useState(modulePermissions);

  const handleAddUser = () => {
    // In a real app, this would send a request to your backend
    toast({
      title: "Usuário Adicionado",
      description: `${newUser.name} (${newUser.email}) foi adicionado como ${newUser.role}.`,
      variant: "default",
    });
    setIsAddUserDialogOpen(false);
    setNewUser({ name: "", email: "", role: "", status: "active" });
  };

  const handleAddRole = () => {
    // In a real app, this would send a request to your backend
    toast({
      title: "Função Adicionada",
      description: `A função ${newRole.name} foi adicionada com sucesso.`,
      variant: "default",
    });
    setIsAddRoleDialogOpen(false);
    setNewRole({ name: "", description: "" });
  };

  const handleSavePermissions = () => {
    toast({
      title: "Permissões Atualizadas",
      description: "As permissões foram atualizadas com sucesso.",
      variant: "default",
    });
    setIsEditPermissionsOpen(false);
  };

  const handleTogglePermission = (moduleId: number, permission: 'view' | 'create' | 'edit' | 'delete') => {
    setSelectedPermissions(permissions => permissions.map(p => 
      p.id === moduleId ? { ...p, [permission]: !p[permission] } : p
    ));
  };

  const handleUserStatusChange = (userId: number, newStatus: string) => {
    const statusText = newStatus === "active" ? "ativado" : "desativado";
    toast({
      title: "Status Alterado",
      description: `O usuário foi ${statusText} com sucesso.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            <span>Funções</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            <span>Permissões</span>
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Users className="text-blue-600" />
                Gerenciamento de Usuários
              </CardTitle>
              <CardDescription>
                Adicione, edite e gerencie usuários do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Pesquisar usuários..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por função" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todas as funções</SelectItem>
                      {roles.map(role => (
                        <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Adicionar Usuário</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                      <DialogDescription>
                        Preencha os detalhes para adicionar um novo usuário ao sistema.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input 
                          id="name" 
                          value={newUser.name}
                          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Função</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma função" />
                          </SelectTrigger>
                          <SelectContent>
                            {roles.map(role => (
                              <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="status">Usuário Ativo</Label>
                          <Switch
                            id="status"
                            checked={newUser.status === "active"}
                            onCheckedChange={(checked) => 
                              setNewUser({...newUser, status: checked ? "active" : "inactive"})
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button className="bg-blue-600" onClick={handleAddUser}>
                        Adicionar Usuário
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Último Login</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.status === "Ativo" ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-green-700" />
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                            Inativo
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4 text-blue-600" />
                          </Button>
                          {user.status === "Ativo" ? (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleUserStatusChange(user.id, "inactive")}
                              className="h-8 w-8"
                            >
                              <UserX className="h-4 w-4 text-red-600" />
                            </Button>
                          ) : (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleUserStatusChange(user.id, "active")}
                              className="h-8 w-8"
                            >
                              <UserCheck className="h-4 w-4 text-green-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles Tab */}
        <TabsContent value="roles">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="text-blue-600" />
                Gerenciamento de Funções
              </CardTitle>
              <CardDescription>
                Defina funções e níveis de acesso para grupos de usuários
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar funções..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[250px]"
                  />
                </div>
                
                <Dialog open={isAddRoleDialogOpen} onOpenChange={setIsAddRoleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Nova Função</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Nova Função</DialogTitle>
                      <DialogDescription>
                        Defina uma nova função e suas permissões.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="role-name">Nome da Função</Label>
                        <Input 
                          id="role-name" 
                          value={newRole.name}
                          onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role-description">Descrição</Label>
                        <Input 
                          id="role-description" 
                          value={newRole.description}
                          onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Permissões iniciais</Label>
                        <div className="space-y-2">
                          {modulePermissions.map(module => (
                            <div key={module.id} className="flex items-center space-x-2">
                              <Checkbox id={`module-${module.id}`} />
                              <Label htmlFor={`module-${module.id}`} className="text-sm">
                                {module.module}
                              </Label>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Você poderá configurar permissões detalhadas após criar a função.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsAddRoleDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button className="bg-blue-600" onClick={handleAddRole}>
                        Adicionar Função
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Função</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>{role.users}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog open={isEditPermissionsOpen} onOpenChange={setIsEditPermissionsOpen}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <Key className="h-3.5 w-3.5" />
                                <span>Permissões</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Editar Permissões: {role.name}</DialogTitle>
                                <DialogDescription>
                                  Configure as permissões detalhadas para esta função.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="py-4">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Módulo</TableHead>
                                      <TableHead className="text-center">Visualizar</TableHead>
                                      <TableHead className="text-center">Criar</TableHead>
                                      <TableHead className="text-center">Editar</TableHead>
                                      <TableHead className="text-center">Excluir</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {selectedPermissions.map((module) => (
                                      <TableRow key={module.id}>
                                        <TableCell>{module.module}</TableCell>
                                        <TableCell className="text-center">
                                          <Checkbox 
                                            checked={module.view} 
                                            onCheckedChange={() => handleTogglePermission(module.id, 'view')}
                                          />
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <Checkbox 
                                            checked={module.create} 
                                            onCheckedChange={() => handleTogglePermission(module.id, 'create')}
                                          />
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <Checkbox 
                                            checked={module.edit} 
                                            onCheckedChange={() => handleTogglePermission(module.id, 'edit')}
                                          />
                                        </TableCell>
                                        <TableCell className="text-center">
                                          <Checkbox 
                                            checked={module.delete} 
                                            onCheckedChange={() => handleTogglePermission(module.id, 'delete')}
                                          />
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                              <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsEditPermissionsOpen(false)}>
                                  Cancelar
                                </Button>
                                <Button className="bg-blue-600" onClick={handleSavePermissions}>
                                  Salvar Permissões
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4 text-blue-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Permissions Tab */}
        <TabsContent value="permissions">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Shield className="text-blue-600" />
                Matriz de Permissões
              </CardTitle>
              <CardDescription>
                Visão geral das permissões por módulo e função
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Módulo</TableHead>
                      {roles.map(role => (
                        <TableHead key={role.id} className="text-center">{role.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {modulePermissions.map(module => (
                      <TableRow key={module.id}>
                        <TableCell className="font-medium">{module.module}</TableCell>
                        
                        {/* Permissions for Administrador */}
                        <TableCell className="text-center">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                            Acesso total
                          </span>
                        </TableCell>
                        
                        {/* Permissions for Auditor */}
                        <TableCell className="text-center">
                          {module.id === 5 ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                              Visualizar
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                              Sem acesso
                            </span>
                          )}
                        </TableCell>
                        
                        {/* Permissions for Operador */}
                        <TableCell className="text-center">
                          {module.id <= 3 ? (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                              Visualizar/Editar
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                              Sem acesso
                            </span>
                          )}
                        </TableCell>
                        
                        {/* Permissions for Financeiro */}
                        <TableCell className="text-center">
                          {module.id === 3 || module.id === 4 ? (
                            <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                              Visualizar/Editar
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                              Sem acesso
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setIsEditPermissionsOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Editar Permissões
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPermissions;
