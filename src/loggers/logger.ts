import * as express from 'express';
import * as winston from 'winston';
import * as stream from 'stream';

export const requestLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { method, url, params, body } = req;
    const start = Date.now();
    next();

    stream.finished(res, () => {
        const executionTime = Date.now() - start;
        const { statusCode } = res;
        const args = { ...body, ...params };
        logger.info(
            `Method: ${method}, Status Code: ${statusCode}, URL: ${url}, Arguments: ${JSON.stringify(
                args,
            )}, Execution time: ${executionTime}ms`,
        );
    });
};

const format = winston.format.printf(({ level, message }) => {
    return `${level}: ${message}`;
});

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.colorize(), format),
    transports: [new winston.transports.Console()],
});
