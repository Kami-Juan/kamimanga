import { z } from 'zod';
import { singupValidator } from '../../validations';

export type SignupDTO = z.infer<typeof singupValidator>;
