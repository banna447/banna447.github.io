import { useState } from "react";
import { FileText, Download, Printer, Calendar, Users, UserCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ReportGeneratorProps {
  reportType: "players" | "coaches" | "verification" | "general";
  data?: any[];
  title?: string;
}

const ReportGenerator = ({ reportType, data = [], title = "Laporan Data" }: ReportGeneratorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportOptions, setReportOptions] = useState({
    includeHeader: true,
    includeFooter: true,
    includeDate: true,
    includeLogo: true,
    format: "pdf"
  });

  const generateReport = () => {
    const reportSettings = JSON.parse(localStorage.getItem('reportSettings') || '{}');
    const headerSettings = JSON.parse(localStorage.getItem('headerSettings') || '{}');
    
    // Create a new window for the report
    const reportWindow = window.open('', '_blank', 'width=800,height=600');
    if (!reportWindow) return;

    const reportContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #16a34a; 
              padding-bottom: 20px; 
              margin-bottom: 30px;
            }
            .header h1 { 
              color: #16a34a; 
              margin: 0;
              font-size: 24px;
            }
            .header h2 { 
              color: #666; 
              margin: 5px 0;
              font-size: 18px;
            }
            .date { 
              text-align: right; 
              color: #666; 
              margin-bottom: 20px;
            }
            .content { 
              margin: 20px 0;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 20px 0;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th { 
              background-color: #f5f5f5; 
              font-weight: bold;
            }
            .footer { 
              margin-top: 50px; 
              padding-top: 20px; 
              border-top: 1px solid #ddd; 
              text-align: center; 
              color: #666;
            }
            .summary { 
              background-color: #f8f9fa; 
              padding: 15px; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            @media print {
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          ${reportOptions.includeHeader ? `
            <div class="header">
              <h1>${reportSettings.headerText || 'LAPORAN DATA KLUB SEPAK BOLA'}</h1>
              <h2>${headerSettings.clubName || 'Album Sepak Bola Maisa 27'}</h2>
            </div>
          ` : ''}
          
          ${reportOptions.includeDate ? `
            <div class="date">
              Tanggal: ${new Date().toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          ` : ''}
          
          <div class="content">
            <h3>${title}</h3>
            
            <div class="summary">
              <strong>Ringkasan:</strong><br>
              Total Data: ${data.length}<br>
              ${reportType === 'players' ? `
                Pemain Aktif: ${data.filter((item: any) => item.status === 'active').length}<br>
                Pemain Pending: ${data.filter((item: any) => item.status === 'pending').length}
              ` : ''}
            </div>
            
            <table>
              <thead>
                <tr>
                  ${reportType === 'players' ? `
                    <th>No</th>
                    <th>Nama</th>
                    <th>Usia</th>
                    <th>Kategori</th>
                    <th>Posisi</th>
                    <th>Status</th>
                    <th>Tanggal Bergabung</th>
                  ` : reportType === 'verification' ? `
                    <th>No</th>
                    <th>Nama Pemain</th>
                    <th>Kategori</th>
                    <th>Status Verifikasi</th>
                    <th>Tanggal Submit</th>
                  ` : `
                    <th>No</th>
                    <th>Item</th>
                    <th>Detail</th>
                    <th>Status</th>
                  `}
                </tr>
              </thead>
              <tbody>
                ${data.map((item: any, index: number) => `
                  <tr>
                    <td>${index + 1}</td>
                    ${reportType === 'players' ? `
                      <td>${item.name}</td>
                      <td>${item.age} tahun</td>
                      <td>${item.category}</td>
                      <td>${item.position}</td>
                      <td>${item.status === 'active' ? 'Aktif' : item.status === 'pending' ? 'Pending' : 'Tidak Aktif'}</td>
                      <td>${new Date(item.joinDate).toLocaleDateString('id-ID')}</td>
                    ` : reportType === 'verification' ? `
                      <td>${item.playerName}</td>
                      <td>${item.category}</td>
                      <td>${item.overallStatus === 'approved' ? 'Disetujui' : item.overallStatus === 'pending' ? 'Pending' : 'Ditolak'}</td>
                      <td>${new Date(item.submissionDate).toLocaleDateString('id-ID')}</td>
                    ` : `
                      <td>${item.name || 'N/A'}</td>
                      <td>${item.detail || 'N/A'}</td>
                      <td>${item.status || 'N/A'}</td>
                    `}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          ${reportOptions.includeFooter ? `
            <div class="footer">
              <p>Laporan ini dibuat secara otomatis oleh sistem</p>
              <p>${headerSettings.clubName || 'Album Sepak Bola Maisa 27'}</p>
            </div>
          ` : ''}
          
          <div class="no-print" style="margin-top: 30px; text-align: center;">
            <button onclick="window.print()" style="background: #16a34a; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-right: 10px;">
              Cetak Laporan
            </button>
            <button onclick="window.close()" style="background: #6b7280; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
              Tutup
            </button>
          </div>
        </body>
      </html>
    `;

    reportWindow.document.write(reportContent);
    reportWindow.document.close();
  };

  const getReportIcon = () => {
    switch (reportType) {
      case 'players': return <Users className="h-5 w-5" />;
      case 'coaches': return <UserCheck className="h-5 w-5" />;
      case 'verification': return <FileText className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Cetak Laporan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getReportIcon()}
            Generate Laporan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium">Opsi Laporan</h4>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeHeader"
                  checked={reportOptions.includeHeader}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, includeHeader: !!checked }))
                  }
                />
                <Label htmlFor="includeHeader">Sertakan Header</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeDate"
                  checked={reportOptions.includeDate}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, includeDate: !!checked }))
                  }
                />
                <Label htmlFor="includeDate">Sertakan Tanggal</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeFooter"
                  checked={reportOptions.includeFooter}
                  onCheckedChange={(checked) => 
                    setReportOptions(prev => ({ ...prev, includeFooter: !!checked }))
                  }
                />
                <Label htmlFor="includeFooter">Sertakan Footer</Label>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={generateReport}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Printer className="h-4 w-4 mr-2" />
              Generate & Cetak
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Batal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportGenerator;
