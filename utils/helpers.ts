export const getURL = (path: string = "") => {
	// Get the URL from environment variables
	const url =
		process.env.NEXT_PUBLIC_SITE_URL ||
		process.env.NEXT_PUBLIC_VERCEL_URL ||
		"http://localhost:3000";

	// Make sure to include `https://` when not localhost.
	const protocol = url.includes("localhost") ? "http:" : "https:";
	const host = url.replace(/^https?:\/\//, "");
	const cleanPath = path.replace(/^\/+/, "");

	return `${protocol}//${host}${cleanPath ? `/${cleanPath}` : ""}`;
};
