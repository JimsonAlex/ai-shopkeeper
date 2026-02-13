const Footer = () => (
  <footer className="bg-primary border-t border-primary-foreground/[0.06] py-20">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16">
        <div className="col-span-2 md:col-span-2">
          <span className="font-display text-2xl font-bold text-primary-foreground tracking-tight">
            Nexus
          </span>
          <p className="text-primary-foreground/20 text-sm mt-5 max-w-xs leading-relaxed">
            AI-powered accounting for chaotic retail. Record sales your way — the AI handles the rest.
          </p>
        </div>
        <div>
          <h4 className="font-display font-bold text-primary-foreground/50 text-[11px] uppercase tracking-[0.15em] mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-primary-foreground/25">
            <li><a href="#features" className="hover:text-primary-foreground/60 transition-colors duration-300">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-primary-foreground/60 transition-colors duration-300">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-primary-foreground/60 transition-colors duration-300">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-primary-foreground/50 text-[11px] uppercase tracking-[0.15em] mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-primary-foreground/25">
            <li><a href="#" className="hover:text-primary-foreground/60 transition-colors duration-300">About</a></li>
            <li><a href="#" className="hover:text-primary-foreground/60 transition-colors duration-300">Contact</a></li>
            <li><a href="#" className="hover:text-primary-foreground/60 transition-colors duration-300">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/[0.06] pt-10 text-center text-xs text-primary-foreground/12 tracking-wide">
        © {new Date().getFullYear()} Nexus. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
