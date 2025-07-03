import { ApiError } from '@/types/commons.types';

export const isApiError = (error: unknown): error is ApiError => {
  if (typeof error === 'object' && error !== null && 'status' in error && 'message' in error) {
    const e = error as { status: unknown; message: unknown };
    return typeof e.status === 'number' && typeof e.message === 'string';
  }

  return false;
};
