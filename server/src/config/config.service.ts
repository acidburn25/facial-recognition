import { Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

export class ConfigService {
    private logger = new Logger('ConfigService', { timestamp: true });
    private readonly envConfig: any;
    private readAWSConfig: boolean;

    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }

        if (this.envConfig.AWS_ACTIVE == 'true') {
            this.readAWSConfig = true;
        } else {
            this.readAWSConfig = false;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public async getPortConfig() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }
        return this.get('PORT');
    }

    public async getEnvironment(): Promise<string> {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }

        return this.get('ENVIRONMENT');
    }

    public async getDevAPI() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }

        return this.get('DEV_API');
    }

    public async getMongoConfig() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }

        return {
            uri: 'mongodb://' + this.get('MONGO_USER') + ':' + this.get('MONGO_PASSWORD') + '@' + this.get('MONGO_HOST') + '/' + this.get('MONGO_DATABASE'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }

    public async getMySqlConfig() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }
        return {
            type: this.get('TYPEORM_CONNECTION'),
            host: this.get('TYPEORM_HOST'),
            port: this.get('TYPEORM_PORT'),
            username: this.get('TYPEORM_USERNAME'),
            password: this.get('TYPEORM_PASSWORD'),
            database: this.get('TYPEORM_DATABASE'),
            entities: [__dirname + this.get('TYPEORM_ENTITIES')],
            synchronize: false,
        };
    }

    public async getDataSourceOptions() {
        const dataSourceOptions: any = {
            type: this.get('TYPEORM_CONNECTION'),
            host: this.get('TYPEORM_HOST'),
            port: this.get('TYPEORM_PORT'),
            username: this.get('TYPEORM_USERNAME'),
            password: this.get('TYPEORM_PASSWORD'),
            database: this.get('TYPEORM_DATABASE'),
            entities: [__dirname + this.get('TYPEORM_ENTITIES')],
            synchronize: false,
        };

        return dataSourceOptions;
    }

    public async upAWSConfig() {
        let error: any;
        let region;
        let secretName;

        if (this.envConfig.AWS_REGION && this.envConfig.AWS_SECRET_NAME) {
            region = this.envConfig.AWS_REGION;
            secretName = this.envConfig.AWS_SECRET_NAME;
        } else {
            throw new Error('Missed AWS_REGION or AWS_SECRET_NAME');
        }
        const client = new AWS.SecretsManager({
            region: region,
        });

        const secrets = await client
            .getSecretValue({ SecretId: secretName })
            .promise()
            .catch((err: any) => (error = err));
        console.log(secretName);
        if (error) {
            if (error.code === 'DecryptionFailureException') {
                this.logger.error("AWS Secrets Manager - Secrets Manager can't decrypt the protected secret text using the provided KMS key.");
                throw new Error("AWS Secrets Manager can't decrypt the protected secret text using the provided KMS key.");
            } else if (error.code === 'InternalServiceerrorException') {
                this.logger.error('AWS Secrets Manager - An error occurred on the server side.');
                throw new Error('AWS Secrets Manager - The Secrets Manager action failed because the service encountered an error: ' + error.message);
            } else if (error.code === 'InvalidParameterException') {
                this.logger.error('AWS Secrets Manager - You provided an invalid value for a parameter.');
                throw new Error('AWS Secrets Manager - You provided an invalid value for a parameter: ' + error.message);
            } else if (error.code === 'InvalidRequestException') {
                this.logger.error('AWS Secrets Manager - You provided a parameter value that is not valid for the current state of the resource.');
                throw new Error('AWS Secrets Manager - You provided a parameter value that is not valid for the current state of the resource: ' + error.message);
            } else if (error.code === 'ResourceNotFoundException') {
                this.logger.error("AWS Secrets Manager - We can't find the resource that you asked for.");
                throw new Error("AWS Secrets Manager - We can't find the resource that you asked for: " + error.message);
            }
        }

        this.readAWSConfig = false;
        this.logger.log('Connected! Secrets Ok!');

        const resultSecrets = JSON.parse(secrets.SecretString);
        for (const key in resultSecrets) {
            this.envConfig[key] = resultSecrets[key];
        }
    }

    public async getServerJwtConfig() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }
        return {
            secret: this.get('SERVER_KEY'),
            signOptions: { expiresIn: '1h' },
        };
    }

    public async getServerKey() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }
        return this.get('SERVER_KEY');
    }

    public async getMicroserviceBaseUrl(): Promise<string> {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }

        return this.get('MICROSERVICE_BASE_URL');
    }

    public async getS3BucketConfig() {
        if (this.readAWSConfig) {
            await this.upAWSConfig();
        }

        return {
            bucketName: this.get('AWS_S3_BUCKET_NAME'),
            accessKey: this.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: this.get('AWS_SECRET_ACCESS_KEY'),
            s3BucketUrl: this.get('S3_BUCKET'),
        };
    }
}
