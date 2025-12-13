import { z } from 'zod';

const EnvSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    PORT: z.coerce.number().default(8080),
});

try {
    EnvSchema.parse(Bun.env);
} catch (error) {
    if (error instanceof z.ZodError) {
        console.error('Invalid environment variables:');
        console.error(error.flatten().fieldErrors);
    } else {
        console.error(error);
    }
    process.exit(1);
}

export const env = EnvSchema.parse(Bun.env);
