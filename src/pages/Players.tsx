
import { useState } from "react";
import { Search, Plus, Filter, Download, Eye, Edit, Trash2, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PlayerForm from "@/components/PlayerForm";
import ReportGenerator from "@/components/ReportGenerator";
import PlayerDetailsModal from "@/components/PlayerDetailsModal";
import QuickActionsDropdown from "@/components/QuickActionsDropdown";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const players = [
    {
      id: 1,
      name: "Ahmad Rizki Pratama",
      age: 12,
      category: "U-12",
      position: "Striker",
      joinDate: "2024-01-15",
      status: "active",
      documents: { birthCert: true, diploma: true, medical: false },
      photo: "/placeholder.svg?height=128&width=128&text=AR",
      phone: "081234567890",
      address: "Jl. Mawar No. 15, Jakarta"
    },
    {
      id: 2,
      name: "Muhammad Fajar",
      age: 14,
      category: "U-15",
      position: "Midfielder",
      joinDate: "2024-02-20",
      status: "active",
      documents: { birthCert: true, diploma: false, medical: true },
      photo: "/placeholder.svg?height=128&width=128&text=MF",
      phone: "081234567891",
      address: "Jl. Melati No. 22, Bandung"
    },
    {
      id: 3,
      name: "Budi Santoso",
      age: 11,
      category: "U-12",
      position: "Defender",
      joinDate: "2024-03-10",
      status: "pending",
      documents: { birthCert: false, diploma: true, medical: false },
      photo: null,
      phone: "081234567892",
      address: "Jl. Anggrek No. 8, Surabaya"
    }
  ];

  const categories = ["all", "U-10", "U-11", "U-12", "U-13", "U-14", "U-15"];

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || player.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleViewPlayer = (player: any) => {
    setSelectedPlayer(player);
    setIsDetailsOpen(true);
  };

  const handleEditPlayer = (player: any) => {
    console.log("Edit player:", player);
    // TODO: Open edit form with player data
  };

  const handleDeletePlayer = (player: any) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data pemain ${player.name}?`)) {
      console.log("Delete player:", player);
      // TODO: Implement delete functionality
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Pemain</h1>
          <p className="text-gray-600">Kelola data pemain klub sepak bola</p>
        </div>
        
        <div className="flex gap-2">
          <ReportGenerator 
            reportType="players" 
            data={filteredPlayers} 
            title="Laporan Data Pemain" 
          />
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Pemain
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Pemain Baru</DialogTitle>
              </DialogHeader>
              <PlayerForm onClose={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari nama pemain..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "Semua Kategori" : category}
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

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlayers.map((player) => (
          <Card key={player.id} className="hover-scale">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {player.photo ? (
                      <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{player.name}</CardTitle>
                    <CardDescription>
                      {player.position} • {player.category}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(player.status)}
                  <QuickActionsDropdown
                    onView={() => handleViewPlayer(player)}
                    onEdit={() => handleEditPlayer(player)}
                    onDelete={() => handleDeletePlayer(player)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Usia:</span>
                  <span className="font-medium">{player.age} tahun</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Bergabung:</span>
                  <span className="font-medium">{new Date(player.joinDate).toLocaleDateString('id-ID')}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Dokumen:</span>
                  <span className="font-medium">{getDocumentStatus(player.documents)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada pemain yang ditemukan</p>
              <p className="text-sm">Coba ubah filter pencarian Anda</p>
            </div>
          </CardContent>
        </Card>
      )}

      <PlayerDetailsModal
        player={selectedPlayer}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />
    </div>
  );
};

export default Players;
