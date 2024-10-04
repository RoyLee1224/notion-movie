// 同步 NotionDB 到 MongoDB
// List1
// List2
// List3

export async function syncNotionMoviesToDB(req, res) {
	try {
		await syncNotionMovies();
		res.status(200).json({ success: true, message: "Movies synced from Notion successfully." });
	} catch (error) {
		res.status(500).json({ success: false, message: "Failed to sync movies from Notion.", error: error.message });
	}
}