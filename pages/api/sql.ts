import type { NextApiRequest, NextApiResponse } from "next";
import { DbContext } from "@/logic/db_context";

export default async function handler(req:NextApiRequest,res:NextApiResponse)
{
    let db_context = new DbContext()

    let query:string = req.query.query+"";
    let pw:string = req.query.pw+"";



    if(!pw)
    {
        res.status(200).json({'error':'You should not pass!!!'})
        return
    }
    
    if(pw !== process.env.password)
    {
        res.status(200).json({'error':'Wrong Password'})
        return
    }

    if(!query)
    {
        res.status(200).json({'error':'Where is the SQL Query?'})
        return
    }

    if (query.toLowerCase().includes('drop'))
    {
        res.status(200).json({'error':'Drop is forbidden!'})
        return
    }
    
    if(query === '')
        return {'error':'Empty Query'}
    
    db_context.db?.all(query, (err: any, result: any) => {
            if (result)
                res.status(200).json({'result': result})
            else if (err)
                res.status(200).json({'error': err.message})
        });
    db_context.db?.close()
}