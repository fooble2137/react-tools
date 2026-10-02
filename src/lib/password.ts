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

export const calculatePasswordStrength = (password: string): number => {
  if (!password || password.length == 0) return 0;

  let score = 0;

  const length = password.length;
  if (length >= 16) score += 35;
  else if (length >= 14) score += 30;
  else if (length >= 12) score += 25;
  else if (length >= 10) score += 18;
  else if (length >= 8) score += 12;
  else if (length >= 6) score += 6;
  else score += 2;

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password);

  let characterTypes = 0;
  if (hasLowercase) {
    score += 5;
    characterTypes++;
  }
  if (hasUppercase) {
    score += 5;
    characterTypes++;
  }
  if (hasNumbers) {
    score += 5;
    characterTypes++;
  }
  if (hasSymbols) {
    score += 10;
    characterTypes++;
  }

  if (characterTypes >= 4 && length >= 10) score += 15;
  else if (characterTypes >= 3 && length >= 8) score += 10;
  else if (characterTypes >= 2 && length >= 6) score += 5;

  const uniqueChars = new Set(password).size;
  const uniqueCharRatio = uniqueChars / length;
  if (uniqueCharRatio >= 0.9 && length >= 8) score += 10;
  else if (uniqueCharRatio >= 0.7 && length >= 6) score += 5;

  const hasRepeatedChars = /(.)\1{2,}/.test(password);
  const hasSequentialChars =
    /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(
      password,
    );
  const hasKeyboardPatterns = /(qwerty|asdfgh|zxcvbn)/i.test(password);

  if (hasRepeatedChars) score -= 15;
  if (hasSequentialChars) score -= 10;
  if (hasKeyboardPatterns) score -= 25;

  score = Math.max(0, Math.min(100, score));

  const maxScorePosibble = 85;
  const normalizedScore = (score / maxScorePosibble) * 100;

  return Math.round(normalizedScore);
};
