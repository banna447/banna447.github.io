
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, User, FileText } from "lucide-react";

interface PlayerDetailsModalProps {
  player: any;
  isOpen: boolean;
  onClose: () => void;
}

const PlayerDetailsModal = ({ player, isOpen, onClose }: PlayerDetailsModalProps) => {
  if (!player) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">Tidak Aktif</Badge>;
    }
  };

  const getDocumentStatus = (documents: any) => {
    const total = Object.keys(documents).length;
    const completed = Object.values(documents).filter(Boolean).length;
    return `${completed}/${total}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Pemain</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
              {player.photo ? (
                <img src={player.photo} alt={player.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <User className="h-16 w-16 text-gray-400" />
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{player.name}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span>Usia: {player.age} tahun</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>Posisi: {player.position}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{player.category}</Badge>
                </div>
                <div>
                  {getStatusBadge(player.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Informasi Kontak</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>No. HP: {player.phone || "Tidak tersedia"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Alamat: {player.address || "Tidak tersedia"}</span>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Status Dokumen</h3>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <span>Kelengkapan: {getDocumentStatus(player.documents)}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span>Akta Kelahiran:</span>
                <span className={player.documents.birthCert ? "text-green-600" : "text-red-600"}>
                  {player.documents.birthCert ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ijazah:</span>
                <span className={player.documents.diploma ? "text-green-600" : "text-red-600"}>
                  {player.documents.diploma ? "✓" : "✗"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Surat Sehat:</span>
                <span className={player.documents.medical ? "text-green-600" : "text-red-600"}>
                  {player.documents.medical ? "✓" : "✗"}
                </span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Tanggal Penting</h3>
            <div className="text-sm">
              <span>Bergabung: {new Date(player.joinDate).toLocaleDateString('id-ID')}</span>
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

export default PlayerDetailsModal;
