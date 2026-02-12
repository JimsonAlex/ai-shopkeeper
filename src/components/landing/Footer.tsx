const Footer = () => (
  <footer className="bg-primary border-t border-primary-foreground/5 py-12">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2">
          <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">
            Nexus
          </span>
          <p className="text-primary-foreground/30 text-sm mt-3 max-w-xs leading-relaxed">
            AI-powered accounting for chaotic retail. Record sales your way — the AI handles the rest.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground text-sm mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/30">
            <li><a href="#features" className="hover:text-primary-foreground transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
            <li><a href="#pricing" className="hover:text-primary-foreground transition-colors">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground text-sm mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/30">
            <li><a href="#" className="hover:text-primary-foreground transition-colors">About</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/5 pt-6 text-center text-xs text-primary-foreground/20">
        © {new Date().getFullYear()} Nexus. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
