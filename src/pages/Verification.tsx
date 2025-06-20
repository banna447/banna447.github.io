import { useState } from "react";
import { CheckCircle, XCircle, Clock, FileText, Download, Eye, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ReportGenerator from "@/components/ReportGenerator";

const Verification = () => {
  const [filter, setFilter] = useState("all");

  const verificationItems = [
    {
      id: 1,
      playerName: "Ahmad Rizki Pratama",
      category: "U-12",
      documents: {
        birthCertificate: { status: "approved", uploadDate: "2024-06-15", filename: "akta_ahmad.pdf" },
        diploma: { status: "pending", uploadDate: "2024-06-16", filename: "ijazah_ahmad.pdf" },
        medicalCert: { status: "rejected", uploadDate: "2024-06-14", filename: "medical_ahmad.pdf", reason: "Dokumen tidak jelas" },
        photo: { status: "approved", uploadDate: "2024-06-15", filename: "foto_ahmad.jpg" }
      },
      overallStatus: "pending",
      submissionDate: "2024-06-15T10:30:00"
    },
    {
      id: 2,
      playerName: "Muhammad Fajar",
      category: "U-15",
      documents: {
        birthCertificate: { status: "approved", uploadDate: "2024-06-10", filename: "akta_fajar.pdf" },
        diploma: { status: "approved", uploadDate: "2024-06-10", filename: "ijazah_fajar.pdf" },
        medicalCert: { status: "approved", uploadDate: "2024-06-11", filename: "medical_fajar.pdf" },
        photo: { status: "approved", uploadDate: "2024-06-10", filename: "foto_fajar.jpg" }
      },
      overallStatus: "approved",
      submissionDate: "2024-06-10T14:20:00"
    },
    {
      id: 3,
      playerName: "Budi Santoso",
      category: "U-12",
      documents: {
        birthCertificate: { status: "pending", uploadDate: "2024-06-18", filename: "akta_budi.pdf" },
        diploma: { status: "pending", uploadDate: "2024-06-18", filename: "ijazah_budi.pdf" },
        medicalCert: { status: "pending", uploadDate: "2024-06-18", filename: "medical_budi.pdf" },
        photo: { status: "pending", uploadDate: "2024-06-18", filename: "foto_budi.jpg" }
      },
      overallStatus: "pending",
      submissionDate: "2024-06-18T09:15:00"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Disetujui</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Ditolak</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getDocumentIcon = (docType: string) => {
    return <FileText className="h-4 w-4 text-gray-400" />;
  };

  const getDocumentLabel = (docType: string) => {
    const labels = {
      birthCertificate: "Akta Kelahiran",
      diploma: "Ijazah/Surat Sekolah",
      medicalCert: "Surat Keterangan Sehat",
      photo: "Pas Foto"
    };
    return labels[docType as keyof typeof labels] || docType;
  };

  const handleViewDocument = (filename: string) => {
    console.log("Viewing document:", filename);
    // TODO: Implement document viewing functionality
    alert(`Membuka dokumen: ${filename}`);
  };

  const handleDownloadDocument = (filename: string) => {
    console.log("Downloading document:", filename);
    // TODO: Implement document download functionality
    alert(`Mengunduh dokumen: ${filename}`);
  };

  const handleApproveDocument = (itemId: number, docType: string) => {
    console.log("Approving document:", itemId, docType);
    // TODO: Implement approve functionality
    alert(`Menyetujui dokumen ${docType} untuk item ${itemId}`);
  };

  const handleRejectDocument = (itemId: number, docType: string) => {
    const reason = prompt("Alasan penolakan:");
    if (reason) {
      console.log("Rejecting document:", itemId, docType, reason);
      // TODO: Implement reject functionality
      alert(`Menolak dokumen ${docType} untuk item ${itemId}. Alasan: ${reason}`);
    }
  };

  const handleApproveAll = (itemId: number) => {
    if (confirm("Apakah Anda yakin ingin menyetujui semua dokumen?")) {
      console.log("Approving all documents for item:", itemId);
      // TODO: Implement approve all functionality
      alert(`Menyetujui semua dokumen untuk item ${itemId}`);
    }
  };

  const handleRejectSubmission = (itemId: number) => {
    const reason = prompt("Alasan penolakan submisi:");
    if (reason) {
      console.log("Rejecting submission:", itemId, reason);
      // TODO: Implement reject submission functionality
      alert(`Menolak submisi untuk item ${itemId}. Alasan: ${reason}`);
    }
  };

  const filteredItems = verificationItems.filter(item => {
    if (filter === "all") return true;
    return item.overallStatus === filter;
  });

  const stats = {
    total: verificationItems.length,
    pending: verificationItems.filter(item => item.overallStatus === "pending").length,
    approved: verificationItems.filter(item => item.overallStatus === "approved").length,
    rejected: verificationItems.filter(item => item.overallStatus === "rejected").length
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verifikasi Data</h1>
          <p className="text-gray-600">Verifikasi dokumen dan data pemain yang telah disubmit</p>
        </div>
        
        <ReportGenerator 
          reportType="verification" 
          data={verificationItems} 
          title="Laporan Verifikasi Data" 
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Submisi</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Disetujui</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ditolak</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "Semua" },
              { key: "pending", label: "Pending" },
              { key: "approved", label: "Disetujui" },
              { key: "rejected", label: "Ditolak" }
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setFilter(option.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === option.key
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Items */}
      <div className="space-y-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover-scale">
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <CardTitle className="text-xl">{item.playerName}</CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-2">
                    <span>Kategori: {item.category}</span>
                    <span>•</span>
                    <span>Disubmit: {new Date(item.submissionDate).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(item.overallStatus)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Dokumen yang Disubmit:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(item.documents).map(([docType, doc]) => (
                    <div key={docType} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(docType)}
                          <span className="font-medium text-sm">{getDocumentLabel(docType)}</span>
                        </div>
                        {getStatusBadge(doc.status)}
                      </div>
                      
                      <div className="text-xs text-gray-600 mb-3">
                        <p>File: {doc.filename}</p>
                        <p>Upload: {new Date(doc.uploadDate).toLocaleDateString('id-ID')}</p>
                      </div>
                      
                      {doc.status === "rejected" && 'reason' in doc && doc.reason && (
                        <div className="bg-red-50 text-red-800 text-xs p-2 rounded mb-3">
                          <strong>Alasan Ditolak:</strong> {doc.reason}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewDocument(doc.filename)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Lihat
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadDocument(doc.filename)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        {doc.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveDocument(item.id, docType)}
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleRejectDocument(item.id, docType)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {item.overallStatus === "pending" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleApproveAll(item.id)}
                    >
                      Setujui Semua
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleRejectSubmission(item.id)}
                    >
                      Tolak Submisi
                    </Button>
                    <div className="flex-1">
                      <Input placeholder="Catatan verifikasi (opsional)" className="w-full" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Tidak ada data verifikasi yang ditemukan</p>
              <p className="text-sm">Coba ubah filter untuk melihat data lainnya</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Verification;
