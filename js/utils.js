export function getNormCalories(age, height, weight, isWoman, coef) {
    let N = (10 * weight) + (6.25 *height) - (5 * age);
    return coef * ((isWoman) ? N - 161 : N + 5);
}


export const coefs = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.725,
    max: 1.9
}