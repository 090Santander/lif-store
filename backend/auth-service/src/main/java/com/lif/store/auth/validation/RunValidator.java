package com.lif.store.auth.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Locale;

public class RunValidator implements ConstraintValidator<RunValido, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) return true;
        String run = value.replaceAll("[.\\-\\s]", "").toUpperCase(Locale.ROOT);
        if (!run.matches("[0-9]{7,8}[0-9K]")) return false;

        String numbers = run.substring(0, run.length() - 1);
        char verifier = run.charAt(run.length() - 1);
        int sum = 0;
        int multiplier = 2;
        for (int index = numbers.length() - 1; index >= 0; index--) {
            sum += Character.digit(numbers.charAt(index), 10) * multiplier;
            multiplier = multiplier == 7 ? 2 : multiplier + 1;
        }
        int calculated = 11 - (sum % 11);
        char expected = calculated == 11 ? '0' : calculated == 10 ? 'K' : (char) ('0' + calculated);
        return verifier == expected;
    }
}
