import { Button } from "@/components/ui/button";
import { AlertCircle, Home, Search } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center p-6 py-16">
      <div className="w-full max-w-2xl">
        <div className="game-card p-12 text-center space-y-8 animate-bounce-in">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-destructive/20 to-primary/20 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-destructive" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 animate-ping"></div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-foreground">
              Página não encontrada
            </h2>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Oops! A página que você está procurando não existe ou foi movida para outro lugar.
            </p>
            <p className="text-sm text-muted-foreground font-mono bg-muted/50 px-3 py-2 rounded-lg inline-block">
              Rota: {location.pathname}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="btn-primary flex items-center space-x-2 px-6 py-3"
            >
              <Link to="/">
                <Home className="w-5 h-5" />
                <span>Voltar ao Jogo</span>
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="flex items-center space-x-2 px-6 py-3 hover:bg-secondary/20"
            >
              <Link to="/">
                <Search className="w-5 h-5" />
                <span>Explorar</span>
              </Link>
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center space-x-2 pt-4">
            <div className="w-3 h-3 rounded-full bg-primary/60 animate-bounce [animation-delay:0s]"></div>
            <div className="w-3 h-3 rounded-full bg-secondary/60 animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 rounded-full bg-accent/60 animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
