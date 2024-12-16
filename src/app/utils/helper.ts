export function isNullOrEmptyString(value: string | null | undefined): boolean {
    return value == null || value.trim() === '';
}

export function isNullOrInvalidNumber(value: number | null | undefined): boolean {
    return value == null || isNaN(value);
}