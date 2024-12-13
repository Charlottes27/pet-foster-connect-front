const regexPatterns = {
    nameRegex: /^[a-zA-Z\s-]+$/,
    frenchPhone: /^(?:\+33|0)[1-9](?:\d{8})$/,
    postalCode: /^\d{5}$/,
    presenceLetters: /^(?=(?:.*[a-zA-Z]){2}).*$/,
    validEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    rnaNumber: /^W\d{9}$/,
    strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/,
};
type RegexKey = keyof typeof regexPatterns;

const valideInput = (value: string | undefined, type: RegexKey) => {
    if (value === undefined) return false
    const regex = regexPatterns[type];
    return regex.test(value);
};


export default valideInput;