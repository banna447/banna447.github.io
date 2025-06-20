
import { useState } from "react";
import { Search, Plus, Phone, Mail, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Coaches = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const coaches = [
    {
      id: 1,
      name: "Budi Setiawan",
      position: "Pelatih Kepala",
      category: "U-15, U-14",
      experience: "8 tahun",
      license: "Lisensi B AFC",
      phone: "081234567890",
      email: "budi@maisa27.com",
      joinDate: "2020-01-15",
      achievements: ["Juara Liga Junior 2023", "Runner-up Piala Nusantara 2022"]
    },
    {
      id: 2,
      name: "Ahmad Rizal",
      position: "Asisten Pelatih",
      category: "U-13, U-12",
      experience: "5 tahun",
      license: "Lisensi C AFC",
      phone: "081234567891",
      email: "ahmad@maisa27.com",
      joinDate: "2021-03-20",
      achievements: ["Pelatih Terbaik Regional 2023"]
    },
    {
      id: 3,
      name: "Siti Nurhaliza",
      position: "Pelatih Fisik",
      category: "Semua Kategori",
      experience: "6 tahun",
      license: "Sertifikat Kondisi Fisik",
      phone: "081234567892",
      email: "siti@maisa27.com",
      joinDate: "2021-08-10",
      achievements: ["Spesialis Kondisi Fisik Anak"]
    }
  ];

  const staff = [
    {
      id: 4,
      name: "Dr. Andi Pratama",
      position: "Dokter Tim",
      department: "Medis",
      phone: "081234567893",
      email: "dokter@maisa27.com",
      joinDate: "2022-01-15"
    },
    {
      id: 5,
      name: "Maya Sari",
      position: "Administrasi",
      department: "Keuangan & Admin",
      phone: "081234567894",
      email: "maya@maisa27.com",
      joinDate: "2020-05-20"
    }
  ];

  const filteredCoaches = coaches.filter(coach =>
    coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coach.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pelatih & Staf</h1>
          <p className="text-gray-600">Tim pelatihan dan staf pendukung klub</p>
        </div>
        
        <Button className="bg-green-600 hover:bg-green-700 hover-scale">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pelatih/Staf
        </Button>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari pelatih atau staf..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Coaches Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-6">
          <Award className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">Tim Pelatih</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCoaches.map((coach) => (
            <Card key={coach.id} className="hover-scale">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{coach.name}</CardTitle>
                    <CardDescription className="text-lg font-medium text-blue-600">
                      {coach.position}
                    </CardDescription>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    {coach.license}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Kategori:</span>
                    <p className="font-medium">{coach.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Pengalaman:</span>
                    <p className="font-medium">{coach.experience}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{coach.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{coach.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Bergabung: {new Date(coach.joinDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Prestasi:</p>
                  <div className="space-y-1">
                    {coach.achievements.map((achievement, index) => (
                      <div key={index} className="text-xs bg-green-50 text-green-800 px-2 py-1 rounded">
                        • {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Staff Section */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Award className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Staf Pendukung</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStaff.map((member) => (
            <Card key={member.id} className="hover-scale">
              <CardHeader>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.position}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Badge variant="outline">{member.department}</Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Bergabung: {new Date(member.joinDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coaches;
