import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {sha512} from 'js-sha512';
import fs from 'fs';
import { UserData, Token, Account, TokenResponse, TokenWithDetails } from './types';
import dotenv from 'dotenv'
import path from 'path';
import accountRouter from './endpoints/account/accountRoutes';
import positionsRouter from './endpoints/position/positionRoutes';

const app = express();
const PORT = 4000;

app.use(express.json());
app.use('/account', accountRouter);
app.use('/position', positionsRouter);

app.use('/dist', express.static('dist'));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '../public')));
app.listen(PORT, ()=>{
    console.log(`Server listening at port ${PORT}`)
});

dotenv.config();

const genToken = (userdata: UserData): Token => {
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined");
    }
    const tokenJWT: string = jwt.sign({
        userid: userdata.id,
        username: userdata.username,
        password: userdata.password
    },secretKey, {expiresIn: "3s"});

    const token: Token = {
        userId: userdata.id,
        token: tokenJWT
    };

    return token;
};

export function getAccounts (){
    try {
        const data = fs.readFileSync('./data/accounts.json', 'utf-8');
        const parsedData = JSON.parse(data);
        const account: Account[] = parsedData;
        return account;
    } catch (error) {
        console.log('Error reading file JSON:', error);
        return []
    }
}
const dataAccounts = getAccounts();

const getTokens = () =>{
    try {
        const data = fs.readFileSync('./data/listOfTokens.json', 'utf-8');
        const tokenData: TokenResponse = JSON.parse(data);
        return tokenData.listOfTokens;
    } catch (error) {
        console.log('Error reading file JSON:', error);
        return []
    }
}
const dataListOfTokens = getTokens();

app.get('/', (req: Request, res: Response) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.sendFile(path.join(__dirname, '..','public','login.html'));
    }

    jwt.verify(token as string, process.env.SECRET_KEY as string, (err, decoded) => {
        if (err) {
            return res.sendFile(path.join(__dirname, 'public', 'login.html'));
        }
        res.status(200).json({ success: true, message: 'Welcome to the HOME page'})
        
    });
});

// Account login

app.post('/account/login', (req: Request, res: Response) => {
    const username : string =  String (req.body.username);
    const password : string =  String (req.body.password);

    if(!username){
        res.status(400).json({
            sucess: false,
            message: "Username is required"
        });
        return;
    }

    const user = dataAccounts.find((u: Account) => u.username === username);
    if(!user){
        res.status(404).json({
            sucess: false,
            message: `Incorrect credential`
        });
        return;
    }

    if(!user.active){
        res.status(404).json({
            sucess: false,
            message: 'Please contact with TI manager'
        })
        return;
    }
    if(user.password !== password){
        res.status(404).json({
            sucess: false,
            message: 'Incorrect credential'
        })
        return;
    }
    const hashedPassword = sha512(password);
    const token = genToken({
        id: user.id,
        username: username,
        password: hashedPassword
    })

    //Clear sesion

    /**const funcSessionData = () =>{
        sessionStorage.clear();
        sessionStorage.setItem("username", user.username);
        sessionStorage.setItem("name", user.name);
        sessionStorage.setItem("token", token.token);
    };

    funcSessionData();

    const setCookie = (name: string, value: string, expired: number)=>{
        let newDate = new Date();
        newDate.setTime(newDate.getTime() + (expired * 24 * 60 * 60 * 1000));
        const caducidad = 'caducidad =' + newDate.toUTCString();
        document.cookie = `${name} + "=" + ${value} + ";" + ${caducidad}`
    }

    const getCookie = () =>{
        console.log(document.cookie);
    }

    getCookie();*/

    const saveToken = (token: Token) => {

        const newToken: TokenWithDetails = {
            tokenId: dataListOfTokens.length + 1,
            userId: token.userId,
            token: token.token,
            creationDate: Date.now().toString(),
            expiresIn: "3s",
            active: true
        };
        dataListOfTokens.push(newToken);
        const tokensData: TokenResponse = { listOfTokens: dataListOfTokens };
        fs.writeFileSync('./data/listOfTokens.json', JSON.stringify(tokensData, null, 2));
    };
    saveToken(token);
    
    res.status(200).json({
        success: true,
        message: "Access Granted!",
        token: token.token
    })
});
