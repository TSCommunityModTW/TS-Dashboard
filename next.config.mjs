/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: false,
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				pathname: "**"
			},
			{
				protocol: "http",
				hostname: "s3api.tshosts.com",
				pathname: "**"
			}
		]
	}
};

export default nextConfig;
