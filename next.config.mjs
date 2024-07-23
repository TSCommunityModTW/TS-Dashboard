/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			// {
			// 	protocol: "https",
			// 	hostname: "github.com",
			// 	pathname: "**"
			// },
			// {
			// 	protocol: "https",
			// 	hostname: "i.ibb.co",
			// 	pathname: "**"
			// },
			// {
			// 	protocol: "https",
			// 	hostname: "s3-alpha-sig.figma.com",
			// 	pathname: "**"
			// },
			// {
			// 	protocol: "https",
			// 	hostname: "static.wixstatic.com",
			// 	pathname: "**"
			// },
			{
				protocol: "https",
				hostname: "**",
				pathname: "**"
			},
			{
				protocol: "http",
				hostname: "s3api.bdstw.org",
				pathname: "**"
			}
		]
	}
};

export default nextConfig;
