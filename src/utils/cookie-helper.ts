interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
): void => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === "number") {
      const date = new Date();
      date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
      options.expires = date;
    }
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `;path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `;domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += ";secure";
  }

  document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");
  const decodedName = encodeURIComponent(name);

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(`${decodedName}=`) === 0) {
      return decodeURIComponent(
        cookie.substring(decodedName.length + 1, cookie.length),
      );
    }
  }

  return null;
};
