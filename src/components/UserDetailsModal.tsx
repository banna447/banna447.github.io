
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Shield, Calendar } from "lucide-react";

interface UserDetailsModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal = ({ user, isOpen, onClose }: UserDetailsModalProps) => {
  if (!user) return null;

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-red-100 text-red-800">Administrator</Badge>;
      case "coach":
        return <Badge className="bg-blue-100 text-blue-800">Pelatih</Badge>;
      case "staff":
        return <Badge className="bg-green-100 text-green-800">Staff</Badge>;
      case "parent":
        return <Badge className="bg-purple-100 text-purple-800">Orang Tua</Badge>;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detail Pengguna</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">{user.name}</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  {getRoleBadge(user.role)}
                  {getStatusBadge(user.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Informasi Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Activity Info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Aktivitas</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bergabung:</span>
                <span>{new Date(user.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Login Terakhir:</span>
                <span>
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
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
