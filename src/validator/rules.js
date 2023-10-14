import { body } from "express-validator";

const stringRule = (field, optional) =>
  body(field)
    .optional(optional || false)
    .isString()
    .withMessage(`Field ${field} must be a string`)
    .trim()
    .not()
    .isEmpty()
    .withMessage(`Field ${field} cannot be empty`);

const integerRule = (field, optional, minValue, maxValue) =>
  body(field)
    .optional(optional || false)
    .not()
    .isEmpty()
    .withMessage(`Field ${field} cannot be empty`)
    .isInt({
      ...(minValue !== undefined && { min: minValue }),
      ...(maxValue && { max: maxValue }),
    })
    .withMessage(
      `Field ${field} must be an Integer${
        minValue !== undefined ? ` greater than ${minValue - 1}` : ""
      }${minValue && maxValue ? " and " : ""}${
        maxValue ? ` less than ${maxValue + 1}` : ""
      }`
    );

const booleanRule = (field, optional) =>
  body(field)
    .optional(optional || false)
    .isBoolean()
    .withMessage(`Field ${field} must be a boolean`);

export { stringRule, integerRule, booleanRule };
