import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useIsCallerAdmin } from '@/hooks/useQueries';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { BRAND } from '@/constants/brand';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Partner Support', href: '/partner-support' },
  { name: 'Insurance Services', href: '/insurance-services' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Page 2', href: '/page-2' },
  { name: 'Page 3', href: '/page-3' },
  { name: 'Page 4', href: '/page-4' },
  { name: 'Page 5', href: '/page-5' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  const showAdminLinks = !!identity && isAdmin;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={BRAND.logo.path}
            alt={BRAND.logo.alt}
            width={BRAND.logo.displaySize.width}
            height={BRAND.logo.displaySize.height}
            className="h-10 w-10"
          />
          <span className="text-xl font-bold text-primary">{BRAND.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-1">
          {navigation.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button
                variant={currentPath === item.href ? 'default' : 'ghost'}
                className="text-sm font-medium"
              >
                {item.name}
              </Button>
            </Link>
          ))}
          {showAdminLinks && (
            <>
              <Link to="/admin">
                <Button
                  variant={currentPath === '/admin' ? 'default' : 'ghost'}
                  className="text-sm font-medium"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              </Link>
              <Link to="/whatsapp">
                <Button
                  variant={currentPath === '/whatsapp' ? 'default' : 'ghost'}
                  className="text-sm font-medium"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navigation.map((item) => (
                <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={currentPath === item.href ? 'default' : 'ghost'}
                    className="w-full justify-start text-base"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
              {showAdminLinks && (
                <>
                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                    <Button
                      variant={currentPath === '/admin' ? 'default' : 'ghost'}
                      className="w-full justify-start text-base"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                  <Link to="/whatsapp" onClick={() => setIsOpen(false)}>
                    <Button
                      variant={currentPath === '/whatsapp' ? 'default' : 'ghost'}
                      className="w-full justify-start text-base"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
