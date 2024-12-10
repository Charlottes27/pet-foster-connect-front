const regexPatterns = {
    notNumber: /^[^0-9]+$/,
    frenchPhone: /^(?:\+33|0)[1-9](?:\d{8})$/,
    postalCode: /^\d{5}$/,
    presenceLetters: /^(?=(?:.*[a-zA-Z]){2}).*$/,
    validEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    rnaNumber: /^W\d{9}$/,
    strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/,
};
type RegexKey = keyof typeof regexPatterns;

const valideInput = (value: string, type: RegexKey) => {
    const regex = regexPatterns[type]
    return regex.test(value)
};


export default valideInput;