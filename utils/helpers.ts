export const getURL = (path: string = "") => {
	let url;
	// Check if we're in a Vercel environment
	if (process.env.VERCEL_ENV) {
		// Use VERCEL_URL if we're in preview/development, or the actual domain for production
		url = process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: process.env.NEXT_PUBLIC_SITE_URL;
	} else {
		// For local development
		url = "http://localhost:3000";
	}

	// Clean up the path
	const cleanPath = path.replace(/^\/+/, "");
	return `${url}${cleanPath ? `/${cleanPath}` : ""}`;
};
