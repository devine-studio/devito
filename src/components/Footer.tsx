
const Footer = () => {
  return (
    <footer className="w-full mt-auto border-t border-border/20" style={{ background: 'var(--game-bg)' }}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="flex items-center justify-center space-x-2 group">
            <span className="text-sm text-muted-foreground">Feito por</span>
            <a
              href="https://devine-studio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm font-semibold text-foreground hover:text-primary transition-all duration-300"
            >
              <span className="bg-primary bg-clip-text text-transparent font-bold">
                Devine Studio
              </span>
            </a>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Devine Studio.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
