import * as joi from 'joi';

export function getErrorResponse(
    errorDetails: joi.ValidationErrorItem[],
): Pick<joi.ValidationErrorItem, 'message' | 'path'>[] {
    return errorDetails.map(({ path, message }) => {
        return { path, message };
    });
}
