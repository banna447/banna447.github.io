
import { Users, UserCheck, Trophy, FileText, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Pemain",
      value: "127",
      description: "Semua kategori usia",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Pelatih & Staf",
      value: "15",
      description: "Tim pelatihan aktif",
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Kompetisi Aktif",
      value: "8",
      description: "Berbagai kategori",
      icon: Trophy,
      color: "text-yellow-600"
    },
    {
      title: "Pengumuman",
      value: "5",
      description: "Pengumuman terbaru",
      icon: FileText,
      color: "text-purple-600"
    }
  ];

  const recentActivities = [
    { id: 1, activity: "Pemain baru terdaftar: Ahmad Rizki (U-12)", time: "2 jam lalu", type: "registration" },
    { id: 2, activity: "Jadwal latihan U-15 diperbarui", time: "5 jam lalu", type: "schedule" },
    { id: 3, activity: "Verifikasi dokumen: 3 pemain pending", time: "1 hari lalu", type: "verification" },
    { id: 4, activity: "Kompetisi Liga Junior dimulai", time: "2 hari lalu", type: "competition" }
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di sistem manajemen Album Sepak Bola Maisa 27</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>
              Pantau aktivitas terkini di sistem
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.activity}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Aksi Cepat
            </CardTitle>
            <CardDescription>
              Akses fitur utama dengan cepat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <Users className="h-6 w-6 text-blue-600 mb-2" />
                <div className="font-medium text-sm">Tambah Pemain</div>
                <div className="text-xs text-gray-500">Daftarkan pemain baru</div>
              </button>
              <button className="p-4 text-left bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <Trophy className="h-6 w-6 text-green-600 mb-2" />
                <div className="font-medium text-sm">Kompetisi</div>
                <div className="text-xs text-gray-500">Kelola kompetisi</div>
              </button>
              <button className="p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <FileText className="h-6 w-6 text-purple-600 mb-2" />
                <div className="font-medium text-sm">Pengumuman</div>
                <div className="text-xs text-gray-500">Buat pengumuman</div>
              </button>
              <button className="p-4 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors">
                <UserCheck className="h-6 w-6 text-yellow-600 mb-2" />
                <div className="font-medium text-sm">Verifikasi</div>
                <div className="text-xs text-gray-500">Verifikasi data</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
