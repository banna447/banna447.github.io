
import { useState } from "react";
import { Trophy, Calendar, Users, MapPin, Clock, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Competitions = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  const competitions = {
    ongoing: [
      {
        id: 1,
        name: "Liga Junior Jakarta",
        category: "U-15",
        status: "ongoing",
        startDate: "2024-06-01",
        endDate: "2024-08-30",
        location: "Jakarta",
        teams: 16,
        matches: { played: 8, total: 15 },
        position: 2,
        points: 21
      },
      {
        id: 2,
        name: "Piala Harapan Bangsa",
        category: "U-13",
        status: "ongoing",
        startDate: "2024-06-15",
        endDate: "2024-07-20",
        location: "Tangerang",
        teams: 12,
        matches: { played: 4, total: 8 },
        position: 1,
        points: 12
      }
    ],
    upcoming: [
      {
        id: 3,
        name: "Turnamen Ramadan Cup",
        category: "U-12",
        status: "upcoming",
        startDate: "2024-07-01",
        endDate: "2024-07-15",
        location: "Bekasi",
        teams: 8,
        registrationDeadline: "2024-06-25"
      },
      {
        id: 4,
        name: "Festival Sepak Bola Anak",
        category: "U-10",
        status: "upcoming",
        startDate: "2024-08-10",
        endDate: "2024-08-12",
        location: "Depok",
        teams: 20,
        registrationDeadline: "2024-07-20"
      }
    ],
    completed: [
      {
        id: 5,
        name: "Liga Pelajar 2024",
        category: "U-14",
        status: "completed",
        startDate: "2024-03-01",
        endDate: "2024-05-30",
        location: "Jakarta",
        teams: 14,
        finalPosition: 1,
        achievement: "Juara 1"
      },
      {
        id: 6,
        name: "Piala Nusantara Youth",
        category: "U-15",
        status: "completed",
        startDate: "2024-01-15",
        endDate: "2024-03-20",
        location: "Surabaya",
        teams: 24,
        finalPosition: 3,
        achievement: "Juara 3"
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ongoing":
        return <Badge className="bg-green-100 text-green-800">Berlangsung</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Akan Datang</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Selesai</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) {
      return <Badge className="bg-yellow-100 text-yellow-800"><Star className="h-3 w-3 mr-1" />Posisi 1</Badge>;
    } else if (position <= 3) {
      return <Badge className="bg-orange-100 text-orange-800">Posisi {position}</Badge>;
    } else {
      return <Badge variant="outline">Posisi {position}</Badge>;
    }
  };

  const tabs = [
    { key: "ongoing", label: "Berlangsung", count: competitions.ongoing.length },
    { key: "upcoming", label: "Akan Datang", count: competitions.upcoming.length },
    { key: "completed", label: "Selesai", count: competitions.completed.length }
  ];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kompetisi</h1>
          <p className="text-gray-600">Kelola partisipasi klub dalam berbagai kompetisi</p>
        </div>
        
        <Button className="bg-green-600 hover:bg-green-700 hover-scale">
          <Trophy className="h-4 w-4 mr-2" />
          Daftar Kompetisi Baru
        </Button>
      </div>

      {/* Tabs */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competition Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitions[activeTab as keyof typeof competitions].map((competition) => (
          <Card key={competition.id} className="hover-scale">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{competition.name}</CardTitle>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline">{competition.category}</Badge>
                    {getStatusBadge(competition.status)}
                  </div>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Mulai:</p>
                    <p className="font-medium">{new Date(competition.startDate).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Selesai:</p>
                    <p className="font-medium">{new Date(competition.endDate).toLocaleDateString('id-ID')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Lokasi:</p>
                    <p className="font-medium">{competition.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-gray-600">Tim:</p>
                    <p className="font-medium">{competition.teams} tim</p>
                  </div>
                </div>
              </div>

              {/* Status-specific content */}
              {competition.status === "ongoing" && "matches" in competition && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progress Pertandingan:</span>
                    <span className="text-sm font-medium">{competition.matches.played}/{competition.matches.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(competition.matches.played / competition.matches.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between">
                    {"position" in competition && getPositionBadge(competition.position)}
                    {"points" in competition && (
                      <div className="text-sm">
                        <span className="text-gray-600">Poin: </span>
                        <span className="font-bold text-green-600">{competition.points}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {competition.status === "upcoming" && "registrationDeadline" in competition && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Deadline Pendaftaran: {new Date(competition.registrationDeadline).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              )}

              {competition.status === "completed" && "achievement" in competition && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">{competition.achievement}</span>
                    </div>
                    {"finalPosition" in competition && getPositionBadge(competition.finalPosition)}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Lihat Detail
                </Button>
                {competition.status === "ongoing" && (
                  <Button size="sm" className="flex-1">
                    Update Progress
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {competitions[activeTab as keyof typeof competitions].length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada kompetisi {activeTab === "ongoing" ? "yang sedang berlangsung" : activeTab === "upcoming" ? "yang akan datang" : "yang telah selesai"}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Competitions;
