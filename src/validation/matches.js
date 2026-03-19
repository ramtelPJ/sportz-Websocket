import { z } from 'zod';

// Schema for validating query parameters for listing matches
export const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

// Constant for match statuses
export const MATCH_STATUS = {
  scheduled: 'scheduled',
  live: 'live',
  finished: 'finished',
};

// Schema for validating match ID parameter
export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Schema for creating a match
export const createMatchSchema = z.object({
  sport: z.string().nonempty(),
  homeTeam: z.string().nonempty(),
  awayTeam: z.string().nonempty(),
  startTime: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    { message: 'startTime must be a valid ISO date string' }
  ),
  endTime: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    { message: 'endTime must be a valid ISO date string' }
  ),
  homeScore: z.coerce.number().int().nonnegative().optional(),
  awayScore: z.coerce.number().int().nonnegative().optional(),
}).superRefine((data, ctx) => {
  if (new Date(data.endTime) <= new Date(data.startTime)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'endTime must be after startTime',
      path: ['endTime'],
    });
  }
});

// Schema for updating match scores
export const updateScoreSchema = z.object({
  homeScore: z.coerce.number().int().nonnegative(),
  awayScore: z.coerce.number().int().nonnegative(),
});