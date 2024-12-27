import type { Report } from '../types';

export function validateReport(data: Partial<Report>): string[] {
  const errors: string[] = [];

  if (!data.rub_amet?.title?.trim()) {
    errors.push('Title is required');
  }

  if (!data.melekia?.trim()) {
    errors.push('Department is required');
  }

  if (!data.receiver?.trim()) {
    errors.push('Receiver is required');
  }

  if (!data.gib?.trim()) {
    errors.push('GIB is required');
  }

  return errors;
}