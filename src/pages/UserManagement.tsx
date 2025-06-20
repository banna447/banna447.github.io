import { useState } from "react";
import { Search, Plus, Filter, Shield, User, UserCheck, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import UserForm from "@/components/UserForm";
import UserDetailsModal from "@/components/UserDetailsModal";
import QuickActionsDropdown from "@/components/QuickActionsDropdown";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const users = [
    {
      id: 1,
      name: "Admin System",
      email: "admin@maisa27.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-06-20T10:30:00",
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      name: "Pelatih Utama",
      email: "pelatih1@maisa27.com",
      role: "coach",
      status: "active",
      lastLogin: "2024-06-19T15:45:00",
      createdAt: "2024-02-15"
    },
    {
      id: 3,
      name: "Staff Administrasi",
      email: "staff@maisa27.com",
      role: "staff",
      status: "active",
      lastLogin: "2024-06-18T09:20:00",
      createdAt: "2024-03-01"
    },
    {
      id: 4,
      name: "Orang Tua Pemain",
      email: "orangtua1@email.com",
      role: "parent",
      status: "pending",
      lastLogin: null,
      createdAt: "2024-06-15"
    }
  ];

  const roles = [
    { value: "all", label: "Semua Role" },
    { value: "admin", label: "Administrator" },
    { value: "coach", label: "Pelatih" },
    { value: "staff", label: "Staff" },
    { value: "parent", label: "Orang Tua" }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800"><Shield className="h-3 w-3 mr-1" />Admin</Badge>;
      case "coach":
        return <Badge className="bg-blue-100 text-blue-800"><UserCheck className="h-3 w-3 mr-1" />Pelatih</Badge>;
      case "staff":
        return <Badge className="bg-green-100 text-green-800"><User className="h-3 w-3 mr-1" />Staff</Badge>;
      case "parent":
        return <Badge className="bg-purple-100 text-purple-800"><User className="h-3 w-3 mr-1" />Orang Tua</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Tidak Aktif</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleEditUser = (user: any) => {
    console.log("Edit user:", user);
    // TODO: Open edit form with user data
  };

  const handleDeleteUser = (user: any) => {
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna ${user.name}?`)) {
      console.log("Delete user:", user);
      // TODO: Implement delete functionality
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Pengguna</h1>
          <p className="text-gray-600">Kelola pengguna dan hak akses sistem</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
            </DialogHeader>
            <UserForm onClose={() => setIsFormOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pengguna</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <User className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</p>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pelatih</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === 'coach').length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{users.filter(u => u.status === 'pending').length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-600 text-sm font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari nama atau email pengguna..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Pengguna</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Login Terakhir</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {user.lastLogin 
                        ? new Date(user.lastLogin).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'Belum pernah login'
                      }
                    </td>
                    <td className="py-4 px-4">
                      <QuickActionsDropdown
                        onView={() => handleViewUser(user)}
                        onEdit={() => handleEditUser(user)}
                        onDelete={() => handleDeleteUser(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Tidak ada pengguna yang ditemukan</p>
                <p className="text-sm">Coba ubah filter pencarian Anda</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <UserDetailsModal
        user={selectedUser}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default UserManagement;
