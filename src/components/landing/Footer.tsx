const Footer = () => (
  <footer className="bg-primary border-t border-primary-foreground/[0.04] py-16">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12">
        <div className="col-span-2 md:col-span-2">
          <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">
            Nexus
          </span>
          <p className="text-primary-foreground/25 text-sm mt-4 max-w-xs leading-relaxed">
            AI-powered accounting for chaotic retail. Record sales your way — the AI handles the rest.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground/60 text-xs uppercase tracking-widest mb-5">Product</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/30">
            <li><a href="#features" className="hover:text-primary-foreground transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-primary-foreground transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground/60 text-xs uppercase tracking-widest mb-5">Company</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/30">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/[0.04] pt-8 text-center text-xs text-primary-foreground/15">
        © {new Date().getFullYear()} Nexus. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
