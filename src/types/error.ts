export interface AppError extends Error {
    message: string;
    status?: number;
    code?: string;
}

export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

export function isAppError(error: unknown): error is AppError {
    return error instanceof Error && 'message' in error;
}