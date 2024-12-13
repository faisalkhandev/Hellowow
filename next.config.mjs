/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: "10mb", // Set the limit to 10 MB or adjust as needed
        },
      },
   
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'via.placeholder.com',
            },
            {
                protocol: 'https', 
                hostname: 'lh3.googleusercontent.com',
            },
            //for external links
            {
                protocol: "https",
                hostname: "**",
              },

        ],
    },
};

export default nextConfig;
