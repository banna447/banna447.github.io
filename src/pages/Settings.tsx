
import { useState } from "react";
import { Save, RefreshCw, Download, Upload, Image, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const [headerSettings, setHeaderSettings] = useState({
    clubName: "Album Sepak Bola Maisa 27",
    subtitle: "Sistem Manajemen Klub Sepak Bola",
    logo: "",
    backgroundColor: "#16a34a"
  });

  const [footerSettings, setFooterSettings] = useState({
    description: "Sistem manajemen klub sepak bola yang membantu mengelola data pemain, pelatih, dan kompetisi dengan mudah dan efisien.",
    contact: {
      email: "info@maisa27.com",
      phone: "+62 123 456 789",
      address: "Jakarta, Indonesia"
    },
    copyright: "© 2024 Album Sepak Bola Maisa 27. All rights reserved."
  });

  const [reportSettings, setReportSettings] = useState({
    headerText: "LAPORAN DATA KLUB SEPAK BOLA",
    includeDate: true,
    includeLogo: true,
    reportFormat: "pdf"
  });

  const handleSaveHeader = () => {
    localStorage.setItem('headerSettings', JSON.stringify(headerSettings));
    alert('Pengaturan header berhasil disimpan!');
  };

  const handleSaveFooter = () => {
    localStorage.setItem('footerSettings', JSON.stringify(footerSettings));
    alert('Pengaturan footer berhasil disimpan!');
  };

  const handleSaveReport = () => {
    localStorage.setItem('reportSettings', JSON.stringify(reportSettings));
    alert('Pengaturan laporan berhasil disimpan!');
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pengaturan Sistem</h1>
        <p className="text-gray-600">Kelola pengaturan tampilan dan laporan aplikasi</p>
      </div>

      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="report">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-green-600" />
                Pengaturan Header
              </CardTitle>
              <CardDescription>
                Atur tampilan header aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clubName">Nama Klub</Label>
                <Input
                  id="clubName"
                  value={headerSettings.clubName}
                  onChange={(e) => setHeaderSettings(prev => ({ ...prev, clubName: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={headerSettings.subtitle}
                  onChange={(e) => setHeaderSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="backgroundColor">Warna Background</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={headerSettings.backgroundColor}
                  onChange={(e) => setHeaderSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo (URL)</Label>
                <Input
                  id="logo"
                  value={headerSettings.logo}
                  onChange={(e) => setHeaderSettings(prev => ({ ...prev, logo: e.target.value }))}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <Button onClick={handleSaveHeader} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Simpan Header
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Footer</CardTitle>
              <CardDescription>
                Atur tampilan footer aplikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={footerSettings.description}
                  onChange={(e) => setFooterSettings(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={footerSettings.contact.email}
                    onChange={(e) => setFooterSettings(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, email: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    value={footerSettings.contact.phone}
                    onChange={(e) => setFooterSettings(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, phone: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Alamat</Label>
                  <Input
                    id="address"
                    value={footerSettings.contact.address}
                    onChange={(e) => setFooterSettings(prev => ({ 
                      ...prev, 
                      contact: { ...prev.contact, address: e.target.value }
                    }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="copyright">Copyright</Label>
                <Input
                  id="copyright"
                  value={footerSettings.copyright}
                  onChange={(e) => setFooterSettings(prev => ({ ...prev, copyright: e.target.value }))}
                />
              </div>
              
              <Button onClick={handleSaveFooter} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Simpan Footer
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Pengaturan Laporan
              </CardTitle>
              <CardDescription>
                Atur format dan tampilan laporan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="headerText">Header Laporan</Label>
                <Input
                  id="headerText"
                  value={reportSettings.headerText}
                  onChange={(e) => setReportSettings(prev => ({ ...prev, headerText: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Opsi Laporan</Label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reportSettings.includeDate}
                      onChange={(e) => setReportSettings(prev => ({ ...prev, includeDate: e.target.checked }))}
                    />
                    <span>Sertakan tanggal</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={reportSettings.includeLogo}
                      onChange={(e) => setReportSettings(prev => ({ ...prev, includeLogo: e.target.checked }))}
                    />
                    <span>Sertakan logo</span>
                  </label>
                </div>
              </div>
              
              <Button onClick={handleSaveReport} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Simpan Pengaturan
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
