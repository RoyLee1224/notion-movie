// 管理員權限檢查
export const protectAdmin = async (req, res, next) => {
	try {
		// 使用先前的 protectRoute 中間件驗證是否為已登入用戶
		if (!req.user) {
			return res.status(401).json({ success: false, message: "Unauthorized" });
		}

		// 驗證用戶是否為管理員
		if (!req.user.isAdmin) {
			return res.status(403).json({ success: false, message: "Forbidden - Not an Admin" });
		}

		// 如果是管理員，繼續下一個中間件或處理程序
		next();
	} catch (error) {
		console.log("Error in protectAdmin middleware: ", error.message);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};