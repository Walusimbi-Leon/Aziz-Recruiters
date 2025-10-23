function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(String(phone));
}

function validateRequiredField(field) {
    return field.trim() !== '';
}

function validateApplicationForm(form) {
    const email = form.email.value;
    const phone = form.phone.value;
    const name = form.name.value;

    if (!validateRequiredField(name)) {
        return { valid: false, message: "Name is required." };
    }
    if (!validateEmail(email)) {
        return { valid: false, message: "Invalid email format." };
    }
    if (!validatePhoneNumber(phone)) {
        return { valid: false, message: "Invalid phone number format." };
    }
    return { valid: true, message: "Validation successful." };
}