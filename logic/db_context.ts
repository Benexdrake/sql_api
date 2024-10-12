import { Database } from 'sqlite3';

export class DbContext
{
    public db:Database | undefined;

    constructor()
    {
        this.db = new Database('techstarter.db')
    }
}