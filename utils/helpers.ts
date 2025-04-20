export const getURL = (path: string = "") => {
	// Get the URL from environment variables
	const url =
		process.env.NEXT_PUBLIC_SITE_URL ||
		process.env.NEXT_PUBLIC_VERCEL_URL ||
		"http://localhost:3000";

	// Check if it's localhost
	const isLocalhost = url.includes("localhost");

	// Use http for localhost, https for everything else
	const protocol = isLocalhost ? "http:" : "https:";
	const host = url.replace(/^https?:\/\//, "");
	const cleanPath = path.replace(/^\/+/, "");

	return `${protocol}//${host}${cleanPath ? `/${cleanPath}` : ""}`;
};
