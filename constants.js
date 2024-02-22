module.exports = {
  USER: {
    THEME_PREFERENCE: {
      DARK: "dark",
      LIGHT: "light",
    },
  },
  SESSION: {
    STATUS: {
      CURRENT: "current",
      EXPIRED: "expired",
    },
  },
  ERROR_MESSAGES: {
    USER: {
      INVALID_EMAIL_FORMAT: "Invalid email format.",
      USER_ALREADY_EXIST: "User already exists.",
      USER_NOT_FOUND_WITH_EMAIL: "User not found with entered email.",
      INVALID_PASSWORD: "Invalid password.",
      UNAUTHORIZED: "Unauthorized.",
      USER_NOT_FOUND: "User not found."
    },
    SESSION: {
      SESSION_NOT_FOUND: "Session not found."
    },
    LIST: {
      LIST_NOT_FOUND: "List not found.",
      LIST_ALREADY_ARCHIVED: "List already archived.",
      LIST_ALREADY_UN_ARCHIVED: "List already un-archived."
    }
  },
  SUCCESS_MESSAGES: {
    USER: {
      USER_CREATED_SUCCESSFULLY: "User created successfully.",
      USER_LOGIN_SUCCESSFULLY: "Login successful."
    },
    LIST: {
      LIST_CREATED_SUCCESSFULLY: "List created successfully.",
      LIST_UPDATED_SUCCESSFULLY: "List updated successfully.",
      LIST_FETCHED_SUCCESSFULLY: "List fetched successfully. "
    }
  },
};
