import { z } from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    PORT: z.coerce.number().default(8080),
});

export const env = EnvSchema.parse(Bun.env);
