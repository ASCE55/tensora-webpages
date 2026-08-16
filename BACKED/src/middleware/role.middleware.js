import { sendError } from '../utils/response.js';

export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 'Unauthorized. Please log in.', 401);
    }

    const userRole = req.user.role || 'user';
    if (!allowedRoles.includes(userRole) && userRole !== 'admin') {
      return sendError(
        res,
        `Access denied. Requires one of the following roles: [${allowedRoles.join(', ')}]`,
        403
      );
    }

    next();
  };
};
