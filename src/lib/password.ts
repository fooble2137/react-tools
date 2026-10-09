type PasswordStrength =
  "Very Weak" | "Weak" | "Fair" | "Good" | "Strong" | "Excellent";

type PasswordStrengthResult = {
  score: number;
  strength: PasswordStrength;
};

const COMMON_PASSWORDS = new Set([
  "password",
  "password123",
  "123456",
  "12345678",
  "123456789",
  "qwerty",
  "qwerty123",
  "admin",
  "letmein",
  "welcome",
  "iloveyou",
  "abc123",
]);

const KEYBOARD_PATTERNS = [
  "qwerty",
  "qwertz",
  "asdfgh",
  "zxcvbn",
  "1qaz",
  "12345",
];

export const generatePassword = (options: {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  whitespace: boolean;
  minimizeDuplicates: boolean;
}): string => {
  if (
    !options.lowercase &&
    !options.uppercase &&
    !options.numbers &&
    !options.symbols
  ) {
    return "";
  }

  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~";
  const whitespaceChars = " ";

  let characterPool = "";
  if (options.lowercase) characterPool += lowercaseChars;
  if (options.uppercase) characterPool += uppercaseChars;
  if (options.numbers) characterPool += numberChars;
  if (options.symbols) characterPool += symbolChars;
  if (options.whitespace) characterPool += whitespaceChars;

  let password = "";
  const maxLength = options.minimizeDuplicates
    ? characterPool.length
    : options.length;
  const actualLength = Math.min(options.length, maxLength);

  for (let i = 0; i < actualLength; i++) {
    let randomChar =
      characterPool[Math.floor(Math.random() * characterPool.length)];

    if (options.minimizeDuplicates) {
      if (!password.includes(randomChar)) {
        password += randomChar;
      } else {
        if (password.length >= characterPool.length) {
          break;
        }

        i--;
      }
    } else {
      password += randomChar;
    }
  }

  return password;
};

function containsSequence(password: string): boolean {
  const value = password.toLowerCase();

  for (let i = 0; i <= value.length - 3; i++) {
    const a = value.charCodeAt(i);
    const b = value.charCodeAt(i + 1);
    const c = value.charCodeAt(i + 2);

    if (
      b - a === 1 &&
      c - b === 1 &&
      ((a >= 48 && c <= 57) || (a >= 97 && c <= 122))
    ) {
      return true;
    }

    if (
      b - a === -1 &&
      c - b === -1 &&
      ((a <= 57 && a >= 48 && c >= 48 && c <= 57) ||
        (a <= 122 && a >= 97 && c >= 97 && c <= 122))
    ) {
      return true;
    }
  }

  return false;
}

export const calculatePasswordStrength = (
  password: string,
): PasswordStrengthResult => {
  const chars = Array.from(password);
  const length = chars.length;

  if (length === 0) {
    return {
      score: 0,
      strength: "Very Weak",
    };
  }

  let score = 0;

  if (length >= 20) score += 65;
  else if (length >= 16) score += 55;
  else if (length >= 12) score += 45;
  else if (length >= 8) score += 30;
  else if (length >= 5) score += 15;
  else score += 5;

  const hasLowercase = /\p{Ll}/u.test(password);
  const hasUppercase = /\p{Lu}/u.test(password);
  const hasNumbers = /\p{N}/u.test(password);
  const hasSymbols = /[^\p{L}\p{N}\s]/u.test(password);
  const hasWhitespace = /\s/u.test(password);

  const characterTypes = [
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
  ].filter(Boolean).length;

  score += characterTypes * 5;

  if (characterTypes >= 3 && length >= 12) score += 5;

  const uniqueChars = new Set(chars).size;
  const uniqueRatio = uniqueChars / length;

  if (uniqueRatio >= 0.9 && length >= 8) score += 15;
  else if (uniqueRatio >= 0.7 && length >= 8) score += 10;
  else if (uniqueRatio >= 0.5 && length >= 6) score += 5;

  if (/(.)\1{2,}/u.test(password)) score -= 15;

  if (/(.{2,})\1+/u.test(password)) score -= 15;

  if (containsSequence(password)) score -= 10;

  const normalized = password.toLowerCase();

  if (KEYBOARD_PATTERNS.some((pattern) => normalized.includes(pattern))) {
    score -= 20;
  }

  if (COMMON_PASSWORDS.has(normalized)) {
    score -= 50;
  }

  if (
    (hasLowercase || hasUppercase) &&
    !hasNumbers &&
    !hasSymbols &&
    !hasWhitespace &&
    length < 12
  ) {
    score -= 5;
  }

  if (/^\s+$/u.test(password)) score = 0;

  score = Math.max(0, Math.min(100, score));
  score = Math.round(score);

  let strength: PasswordStrength;

  if (score >= 90) strength = "Excellent";
  else if (score >= 75) strength = "Strong";
  else if (score >= 60) strength = "Good";
  else if (score >= 40) strength = "Fair";
  else if (score >= 20) strength = "Weak";
  else strength = "Very Weak";

  return {
    score,
    strength,
  };
};
