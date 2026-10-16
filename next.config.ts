import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Les articles du dépôt et la copie du Sheet sont lus sur le disque : on les embarque dans les fonctions serveur.
  outputFileTracingIncludes: { "/**": ["./content/**/*", "./js/**/*"] },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "saint-joseph.saint-arnoux.fr" },
    ],
  },
  async redirects() {
    // Anciennes pages / ancres du site v1 qui ont une nouvelle destination.
    return [
      { source: "/don", destination: "/soutenir#autres-moyens", permanent: true },
      { source: "/budget", destination: "/articles/budget", permanent: true },
      { source: "/equipe", destination: "/articles/qui-sommes-nous", permanent: true },
      { source: "/faq", destination: "/articles/questions-frequentes", permanent: true },
      { source: "/rejoindre", destination: "/articles/rejoindre-les-benevoles", permanent: true },
      { source: "/avancement", destination: "/#avancement", permanent: true },
      { source: "/valeurs", destination: "/#valeurs", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
