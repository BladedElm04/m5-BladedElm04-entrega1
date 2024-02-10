export class AppErrors extends Error {
    status: number;
    constructor(message: string, status: number = 400) {
        super(message);
        this.status = status;
    }
}