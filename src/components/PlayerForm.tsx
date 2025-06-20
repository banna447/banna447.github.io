
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Calendar, User, MapPin, FileText } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

interface PlayerFormProps {
  onClose: () => void;
}

const PlayerForm = ({ onClose }: PlayerFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    nickName: "",
    birthDate: "",
    birthPlace: "",
    address: "",
    phone: "",
    parentName: "",
    parentPhone: "",
    position: "",
    previousClub: "",
    medicalInfo: "",
    photo: null as string | null
  });

  const [documents, setDocuments] = useState({
    birthCertificate: null as File | null,
    diploma: null as File | null,
    medicalCertificate: null as File | null
  });

  const positions = [
    "Penjaga Gawang",
    "Bek Kanan",
    "Bek Tengah",
    "Bek Kiri",
    "Gelandang Bertahan",
    "Gelandang Tengah",
    "Gelandang Serang",
    "Sayap Kanan",
    "Sayap Kiri",
    "Penyerang"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoChange = (photo: string | null) => {
    setFormData(prev => ({
      ...prev,
      photo
    }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setDocuments(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Documents:", documents);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Photo Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Foto Pemain
          </CardTitle>
          <CardDescription>
            Upload foto pemain untuk identifikasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PhotoUpload
            currentPhoto={formData.photo || undefined}
            onPhotoChange={handlePhotoChange}
          />
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Informasi Pribadi
          </CardTitle>
          <CardDescription>
            Data pribadi pemain yang akan didaftarkan
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="nickName">Nama Panggilan</Label>
            <Input
              id="nickName"
              value={formData.nickName}
              onChange={(e) => handleInputChange("nickName", e.target.value)}
              placeholder="Nama panggilan (opsional)"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="birthDate">Tanggal Lahir *</Label>
            <Input
              id="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleInputChange("birthDate", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="birthPlace">Tempat Lahir *</Label>
            <Input
              id="birthPlace"
              value={formData.birthPlace}
              onChange={(e) => handleInputChange("birthPlace", e.target.value)}
              placeholder="Kota kelahiran"
              required
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="address">Alamat Lengkap *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Alamat tempat tinggal"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Informasi Kontak
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">No. Telepon Pemain</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="08xx-xxxx-xxxx"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parentName">Nama Orang Tua/Wali *</Label>
            <Input
              id="parentName"
              value={formData.parentName}
              onChange={(e) => handleInputChange("parentName", e.target.value)}
              placeholder="Nama orang tua atau wali"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parentPhone">No. Telepon Orang Tua *</Label>
            <Input
              id="parentPhone"
              value={formData.parentPhone}
              onChange={(e) => handleInputChange("parentPhone", e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Football Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-yellow-600" />
            Informasi Sepak Bola
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="position">Posisi *</Label>
            <select
              id="position"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              required
            >
              <option value="">Pilih posisi</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="previousClub">Klub Sebelumnya</Label>
            <Input
              id="previousClub"
              value={formData.previousClub}
              onChange={(e) => handleInputChange("previousClub", e.target.value)}
              placeholder="Nama klub sebelumnya (jika ada)"
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="medicalInfo">Informasi Medis</Label>
            <textarea
              id="medicalInfo"
              value={formData.medicalInfo}
              onChange={(e) => handleInputChange("medicalInfo", e.target.value)}
              placeholder="Riwayat cedera, alergi, atau kondisi medis lainnya"
              className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            Upload Dokumen
          </CardTitle>
          <CardDescription>
            Upload dokumen pendukung yang diperlukan
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: "birthCertificate", label: "Akta Kelahiran *", required: true },
            { key: "diploma", label: "Ijazah/Surat Keterangan Sekolah", required: false },
            { key: "medicalCertificate", label: "Surat Keterangan Sehat", required: false },
            { key: "photo", label: "Pas Foto 3x4", required: false }
          ].map((doc) => (
            <div key={doc.key} className="space-y-2">
              <Label>{doc.label}</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <div className="text-sm text-gray-600">
                  <label className="cursor-pointer text-blue-600 hover:text-blue-700">
                    Klik untuk upload
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                    />
                  </label>
                  <p className="text-xs mt-1">PDF, JPG, PNG (max 5MB)</p>
                </div>
                {documents[doc.key as keyof typeof documents] && (
                  <p className="text-xs text-green-600 mt-2">
                    ✓ {documents[doc.key as keyof typeof documents]?.name}
                  </p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Submit Buttons */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          Simpan Data Pemain
        </Button>
      </div>
    </form>
  );
};

export default PlayerForm;
