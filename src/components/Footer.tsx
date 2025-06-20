
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Album Sepak Bola Maisa 27</h3>
            <p className="text-gray-300">
              Sistem manajemen klub sepak bola yang membantu mengelola data pemain, 
              pelatih, dan kompetisi dengan mudah dan efisien.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <div className="text-gray-300 space-y-2">
              <p>📧 info@maisa27.com</p>
              <p>📞 +62 123 456 789</p>
              <p>📍 Jakarta, Indonesia</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Kategori Usia</h3>
            <div className="text-gray-300 space-y-1">
              <p>• U-10 (Dibawah 10 tahun)</p>
              <p>• U-11 (Dibawah 11 tahun)</p>
              <p>• U-12 (Dibawah 12 tahun)</p>
              <p>• U-13 (Dibawah 13 tahun)</p>
              <p>• U-14 (Dibawah 14 tahun)</p>
              <p>• U-15 (Dibawah 15 tahun)</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 Album Sepak Bola Maisa 27. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
