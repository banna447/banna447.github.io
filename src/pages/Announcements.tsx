
import { useState } from "react";
import { Plus, Calendar, Eye, Edit, Trash2, Bell, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Announcements = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const announcements = [
    {
      id: 1,
      title: "Jadwal Latihan Minggu Ini",
      content: "Latihan untuk semua kategori akan dimulai pukul 16:00 WIB. Harap datang tepat waktu dan membawa perlengkapan lengkap.",
      category: "Latihan",
      priority: "normal",
      targetAudience: "Semua Pemain",
      publishDate: "2024-06-20T08:00:00",
      author: "Pelatih Utama",
      status: "published",
      views: 45
    },
    {
      id: 2,
      title: "Pembayaran Iuran Bulanan",
      content: "Reminder untuk pembayaran iuran bulan Juni. Batas waktu pembayaran adalah tanggal 25 Juni 2024.",
      category: "Keuangan",
      priority: "high",
      targetAudience: "Orang Tua",
      publishDate: "2024-06-18T10:30:00",
      author: "Staff Administrasi",
      status: "published",
      views: 23
    },
    {
      id: 3,
      title: "Turnamen Ramadan Cup 2024",
      content: "Pendaftaran turnamen Ramadan Cup telah dibuka. Tim U-12 dan U-15 akan berpartisipasi.",
      category: "Kompetisi",
      priority: "high",
      targetAudience: "Pemain U-12, U-15",
      publishDate: "2024-06-17T14:00:00",
      author: "Manager Tim",
      status: "published",
      views: 67
    },
    {
      id: 4,
      title: "Medical Check-up Wajib",
      content: "Semua pemain diwajibkan melakukan medical check-up sebelum mengikuti kompetisi Liga Junior.",
      category: "Kesehatan",
      priority: "urgent",
      targetAudience: "Semua Pemain",
      publishDate: "2024-06-16T09:00:00",
      author: "Dokter Tim",
      status: "published",
      views: 89
    },
    {
      id: 5,
      title: "Rapat Orang Tua",
      content: "Rapat koordinasi dengan orang tua pemain akan diadakan hari Sabtu, 22 Juni 2024 pukul 10:00 WIB.",
      category: "Rapat",
      priority: "normal",
      targetAudience: "Orang Tua",
      publishDate: "2024-06-15T16:00:00",
      author: "Ketua Klub",
      status: "draft",
      views: 0
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">Tinggi</Badge>;
      case "normal":
        return <Badge className="bg-blue-100 text-blue-800">Normal</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Dipublikasi</Badge>;
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Terjadwal</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Latihan": "bg-blue-50 text-blue-700 border-blue-200",
      "Keuangan": "bg-green-50 text-green-700 border-green-200",
      "Kompetisi": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "Kesehatan": "bg-red-50 text-red-700 border-red-200",
      "Rapat": "bg-purple-50 text-purple-700 border-purple-200"
    };
    return colors[category as keyof typeof colors] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengumuman</h1>
          <p className="text-gray-600">Kelola dan publikasikan pengumuman untuk klub</p>
        </div>
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 hover-scale">
              <Plus className="h-4 w-4 mr-2" />
              Buat Pengumuman
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Buat Pengumuman Baru</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 p-4">
              <p>Form pengumuman akan ditambahkan di sini</p>
              <Button onClick={() => setIsFormOpen(false)}>Tutup</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pengumuman</p>
                <p className="text-2xl font-bold">{announcements.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dipublikasi</p>
                <p className="text-2xl font-bold">{announcements.filter(a => a.status === 'published').length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold">{announcements.filter(a => a.status === 'draft').length}</p>
              </div>
              <Edit className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{announcements.reduce((sum, a) => sum + a.views, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="hover-scale">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{announcement.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getCategoryColor(announcement.category)}`}>
                          {announcement.category}
                        </span>
                        {getPriorityBadge(announcement.priority)}
                        {getStatusBadge(announcement.status)}
                      </div>
                    </div>
                  </div>
                  
                  <CardDescription className="text-base mb-4">
                    {announcement.content}
                  </CardDescription>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(announcement.publishDate).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{announcement.targetAudience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>{announcement.views} views</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm text-gray-500">
                    Oleh: <span className="font-medium">{announcement.author}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3 mr-1" />
                    Lihat
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      {announcements.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Belum ada pengumuman</p>
              <p className="text-sm">Buat pengumuman pertama Anda</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Announcements;
