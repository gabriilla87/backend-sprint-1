import {NextFunction, Request, Response} from "express";

export const basicAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send('Authorization required');
        return
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    const validUsername = 'admin';
    const validPassword = 'password123';

    if (username === validUsername && password === validPassword) {
        next(); // Пользователь аутентифицирован
    } else {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send('Invalid credentials');
    }
};