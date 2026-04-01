import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ContactPage from "./pages/ContactPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import HomePage from "./pages/HomePage";
import InsuranceServicesPage from "./pages/InsuranceServicesPage";
import OfflineQuotePage from "./pages/OfflineQuotePage";
import PartnerOnboardingPage from "./pages/PartnerOnboardingPage";
import PartnerSupportPage from "./pages/PartnerSupportPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import WhatsAppDashboardPage from "./pages/WhatsAppDashboardPage";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const partnerSupportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner-support",
  component: PartnerSupportPage,
});

const insuranceServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/insurance-services",
  component: InsuranceServicesPage,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: () => {
    window.location.href = "/insurance-services";
    return null;
  },
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner-onboarding",
  component: PartnerOnboardingPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboardPage,
});

const whatsappRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/whatsapp",
  component: WhatsAppDashboardPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms-of-use",
  component: TermsOfUsePage,
});

const disclaimerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/disclaimer",
  component: DisclaimerPage,
});

const offlineQuoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offline-quote",
  component: OfflineQuotePage,
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
  offlineQuoteRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
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
