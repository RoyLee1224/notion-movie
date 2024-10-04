export const protectAdmin = (req, res, next) => {
    // 確保 req.user 已經存在，這表明 JWT 已經在 protectRoute 中被解碼
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized - No User Information" });
    }

    // 檢查 isAdmin 欄位，確保用戶是管理員
    if (!req.user.isAdmin) {
        return res.status(403).json({ success: false, message: "Forbidden - Not an Admin" });
    }

    // 如果通過檢查，允許繼續進行請求
    next();
};