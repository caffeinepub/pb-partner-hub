import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PartnerSupportPage from './pages/PartnerSupportPage';
import InsuranceServicesPage from './pages/InsuranceServicesPage';
import ContactPage from './pages/ContactPage';
import PartnerOnboardingPage from './pages/PartnerOnboardingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import WhatsAppDashboardPage from './pages/WhatsAppDashboardPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import DisclaimerPage from './pages/DisclaimerPage';
import Page2Page from './pages/Page2Page';
import Page3Page from './pages/Page3Page';
import Page4Page from './pages/Page4Page';
import Page5Page from './pages/Page5Page';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const partnerSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner-support',
  component: PartnerSupportPage,
});

const insuranceServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/insurance-services',
  component: InsuranceServicesPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services',
  component: () => {
    window.location.href = '/insurance-services';
    return null;
  },
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/partner-onboarding',
  component: PartnerOnboardingPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboardPage,
});

const whatsappRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/whatsapp',
  component: WhatsAppDashboardPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms-of-use',
  component: TermsOfUsePage,
});

const disclaimerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/disclaimer',
  component: DisclaimerPage,
});

const page2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/page-2',
  component: Page2Page,
});

const page3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/page-3',
  component: Page3Page,
});

const page4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/page-4',
  component: Page4Page,
});

const page5Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/page-5',
  component: Page5Page,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  partnerSupportRoute,
  insuranceServicesRoute,
  servicesRoute,
  contactRoute,
  onboardingRoute,
  adminRoute,
  whatsappRoute,
  privacyRoute,
  termsRoute,
  disclaimerRoute,
  page2Route,
  page3Route,
  page4Route,
  page5Route,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
