export const responseFactory = {
  returnGet(res, data, message = "OK") {
    return res.status(200).json({ success: true, message, data });
  },
  returnCreated(res, data, message = "Created") {
    return res.status(201).json({ success: true, message, data });
  },
  returnDeleted(res, message = "Deleted") {
    return res.status(200).json({ success: true, message });
  },
  returnUpdated(res, data, message = "Updated") {
    return res.status(200).json({ success: true, message, data });
  },
};

export const errorFactory = {
  unauthorized(res, message = "Unauthorized") {
    return res.status(401).json({ success: false, error: message });
  },
  invalid(res, message = "Invalid request") {
    return res.status(400).json({ success: false, error: message });
  },
  serverError(res, err) {
    return res
      .status(500)
      .json({ success: false, error: err?.message || "Internal Server Error" });
  },
};
