
/**
 * Converts pounds to kilograms.
 * @param pounds The weight in pounds.
 * @returns The weight in kilograms.
 */
export const poundsToKilograms = (pounds: number): number => {
    return Math.round(pounds * 0.45359237); // 1 pound is approximately 0.45359237 kilograms
};

/**
 * Converts feet to centimeters.
 * @param feet The height in feet.
 * @param inches The height in inches.
 * @returns The height in centimeters.
 */
export const feetToCentimeters = (feet: number, inches: number = 0): number => {
    return (feet * 30.48) + (inches * 2.54); // 1 foot is 30.48 cm and 1 inch is 2.54 cm
};

/**
 * Converts feet and inches to centimeters if the input is a string in the format 'feet'inches'.
 * For example, '5'8' would be interpreted as 5 feet and 8 inches.
 * @param feetInches The height in the format 'feet'inches'.
 * @returns The height in centimeters.
 */
export const convertFeetInchesToCentimeters = (feetInches: string): number => {
    const [feet, inches] = feetInches.split("'").map((val) => parseInt(val, 10));
    return feetToCentimeters(feet, isNaN(inches) ? 0 : inches);
};
