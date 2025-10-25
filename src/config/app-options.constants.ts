import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from "cache-manager-redis-store";

@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                const store = await redisStore({
                    socket: {
                        host: configService.get("REDIS_HOST"),
                        port: parseInt(configService.get("REDIS_PORT")!),
                    },
                });
                return { store }
            },
            inject: [ConfigService]
        }),
    ],
})

export class RedisModule { }
