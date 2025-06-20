
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Shield, Phone } from "lucide-react";

interface UserFormProps {
  onClose: () => void;
}

const UserForm = ({ onClose }: UserFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

  const roles = [
    { value: "admin", label: "Administrator", description: "Akses penuh ke semua fitur sistem" },
    { value: "coach", label: "Pelatih", description: "Dapat mengelola pemain dan latihan" },
    { value: "staff", label: "Staff", description: "Akses terbatas untuk administrasi" },
    { value: "parent", label: "Orang Tua", description: "Dapat melihat data anak dan pengumuman" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }
    
    console.log("User Data:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Informasi Pengguna
          </CardTitle>
          <CardDescription>
            Data dasar pengguna baru
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nama Lengkap *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="user@example.com"
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">No. Telepon</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="08xx-xxxx-xxxx"
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Hak Akses
          </CardTitle>
          <CardDescription>
            Pilih role dan tingkat akses pengguna
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label>Role Pengguna *</Label>
            {roles.map((role) => (
              <div
                key={role.value}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  formData.role === role.value
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleInputChange("role", role.value)}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="text-green-600"
                  />
                  <div>
                    <div className="font-medium text-gray-900">{role.label}</div>
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Keamanan</CardTitle>
          <CardDescription>
            Buat password untuk akun pengguna
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Minimal 8 karakter"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              placeholder="Ulangi password"
              required
            />
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Password minimal 8 karakter</p>
            <p>• Gunakan kombinasi huruf besar, kecil, dan angka</p>
            <p>• Hindari menggunakan informasi pribadi</p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Buat Pengguna
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
