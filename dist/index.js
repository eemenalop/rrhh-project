"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccounts = getAccounts;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const js_sha512_1 = require("js-sha512");
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const accountRoutes_1 = __importDefault(require("./endpoints/account/accountRoutes"));
const positionRoutes_1 = __importDefault(require("./endpoints/position/positionRoutes"));
const app = (0, express_1.default)();
const PORT = 4000;
app.use(express_1.default.json());
app.use('/account', accountRoutes_1.default);
app.use('/position', positionRoutes_1.default);
app.use('/dist', express_1.default.static('dist'));
app.use(express_1.default.static("public"));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
dotenv_1.default.config();
const genToken = (userdata) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined");
    }
    const tokenJWT = jsonwebtoken_1.default.sign({
        userid: userdata.id,
        username: userdata.username,
        password: userdata.password
    }, secretKey, { expiresIn: "3s" });
    const token = {
        userId: userdata.id,
        token: tokenJWT
    };
    return token;
};
function getAccounts() {
    try {
        const data = fs_1.default.readFileSync('./data/accounts.json', 'utf-8');
        const parsedData = JSON.parse(data);
        const account = parsedData;
        return account;
    }
    catch (error) {
        console.log('Error reading file JSON:', error);
        return [];
    }
}
const dataAccounts = getAccounts();
const getTokens = () => {
    try {
        const data = fs_1.default.readFileSync('./data/listOfTokens.json', 'utf-8');
        const tokenData = JSON.parse(data);
        return tokenData.listOfTokens;
    }
    catch (error) {
        console.log('Error reading file JSON:', error);
        return [];
    }
};
const dataListOfTokens = getTokens();
app.get('/', (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.sendFile(path_1.default.join(__dirname, '..', 'public', 'login.html'));
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.sendFile(path_1.default.join(__dirname, 'public', 'login.html'));
        }
        res.status(200).json({ success: true, message: 'Welcome to the HOME page' });
    });
});
// Account login
app.post('/account/login', (req, res) => {
    const username = String(req.body.username);
    const password = String(req.body.password);
    if (!username) {
        res.status(400).json({
            sucess: false,
            message: "Username is required"
        });
        return;
    }
    const user = dataAccounts.find((u) => u.username === username);
    if (!user) {
        res.status(404).json({
            sucess: false,
            message: `Incorrect credential`
        });
        return;
    }
    if (!user.active) {
        res.status(404).json({
            sucess: false,
            message: 'Please contact with TI manager'
        });
        return;
    }
    if (user.password !== password) {
        res.status(404).json({
            sucess: false,
            message: 'Incorrect credential'
        });
        return;
    }
    const hashedPassword = (0, js_sha512_1.sha512)(password);
    const token = genToken({
        id: user.id,
        username: username,
        password: hashedPassword
    });
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
    const saveToken = (token) => {
        const newToken = {
            tokenId: dataListOfTokens.length + 1,
            userId: token.userId,
            token: token.token,
            creationDate: Date.now().toString(),
            expiresIn: "3s",
            active: true
        };
        dataListOfTokens.push(newToken);
        const tokensData = { listOfTokens: dataListOfTokens };
        fs_1.default.writeFileSync('./data/listOfTokens.json', JSON.stringify(tokensData, null, 2));
    };
    saveToken(token);
    res.status(200).json({
        success: true,
        message: "Access Granted!",
        token: token.token
    });
});
