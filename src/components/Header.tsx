
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "./UserMenu";

const Header = () => {
  const [headerSettings, setHeaderSettings] = useState({
    clubName: "Album Sepak Bola Maisa 27",
    subtitle: "Sistem Manajemen Klub Sepak Bola",
    backgroundColor: "#16a34a"
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('headerSettings');
    if (savedSettings) {
      setHeaderSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <header 
      className="shadow-sm border-b"
      style={{ backgroundColor: headerSettings.backgroundColor }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-xl">M27</span>
          </div>
          <div className="text-white">
            <h1 className="font-bold text-lg">{headerSettings.clubName}</h1>
            <p className="text-sm opacity-90">{headerSettings.subtitle}</p>
          </div>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
