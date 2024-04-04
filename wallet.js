"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var web3_js_1 = require("@solana/web3.js");
// Create a readline interface for user input
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Connect to the Solana devnet
var connection = new web3_js_1.Connection('https://api.devnet.solana.com', 'confirmed');
// Get the wallet balance
function getBalance(publicKey) {
    return __awaiter(this, void 0, void 0, function () {
        var balance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.getBalance(publicKey)];
                case 1:
                    balance = _a.sent();
                    console.log("Wallet balance: ".concat(balance / web3_js_1.LAMPORTS_PER_SOL, " SOL"));
                    return [2 /*return*/, balance];
            }
        });
    });
}
// Send SOL from the wallet to another address
function sendSol(fromKeypair, toPublicKey, amount) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, senderBalanceBefore, receiverBalanceBefore, signature, confirmationStatus, transactionDetails, senderBalanceAfter, receiverBalanceAfter;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
                        fromPubkey: fromKeypair.publicKey,
                        toPubkey: toPublicKey,
                        lamports: amount * web3_js_1.LAMPORTS_PER_SOL,
                    }));
                    return [4 /*yield*/, getBalance(fromKeypair.publicKey)];
                case 1:
                    senderBalanceBefore = _c.sent();
                    return [4 /*yield*/, getBalance(toPublicKey)];
                case 2:
                    receiverBalanceBefore = _c.sent();
                    return [4 /*yield*/, (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [fromKeypair])];
                case 3:
                    signature = _c.sent();
                    return [4 /*yield*/, connection.confirmTransaction(signature)];
                case 4:
                    confirmationStatus = (_c.sent()).value;
                    return [4 /*yield*/, connection.getTransaction(signature)];
                case 5:
                    transactionDetails = _c.sent();
                    return [4 /*yield*/, getBalance(fromKeypair.publicKey)];
                case 6:
                    senderBalanceAfter = _c.sent();
                    return [4 /*yield*/, getBalance(toPublicKey)];
                case 7:
                    receiverBalanceAfter = _c.sent();
                    // Display the transaction details
                    console.log('Transaction Details:');
                    console.log('- Signature:', signature);
                    console.log('- Confirmation Status:', confirmationStatus);
                    console.log('- Timestamp:', transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.blockTime);
                    console.log('- Slot:', transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.slot);
                    console.log('- Recent Blockhash:', transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.transaction.message.recentBlockhash);
                    console.log('- Fee (in SOL):', ((_b = (_a = transactionDetails === null || transactionDetails === void 0 ? void 0 : transactionDetails.meta) === null || _a === void 0 ? void 0 : _a.fee) !== null && _b !== void 0 ? _b : 0) / web3_js_1.LAMPORTS_PER_SOL);
                    console.log('- Amount Sent (in SOL):', amount);
                    console.log('- Sender\'s Balance Before (in SOL):', senderBalanceBefore / web3_js_1.LAMPORTS_PER_SOL);
                    console.log('- Sender\'s Balance After (in SOL):', senderBalanceAfter / web3_js_1.LAMPORTS_PER_SOL);
                    console.log('- Receiver\'s Balance Before (in SOL):', receiverBalanceBefore / web3_js_1.LAMPORTS_PER_SOL);
                    console.log('- Receiver\'s Balance After (in SOL):', receiverBalanceAfter / web3_js_1.LAMPORTS_PER_SOL);
                    return [2 /*return*/];
            }
        });
    });
}
// Prompt the user for the sender's wallet private key
rl.question("Enter the sender's wallet private key: ", function (senderPrivateKey) { return __awaiter(void 0, void 0, void 0, function () {
    var senderKeypair;
    return __generator(this, function (_a) {
        senderKeypair = web3_js_1.Keypair.fromSecretKey(Buffer.from(JSON.parse(senderPrivateKey)));
        console.log("Sender's wallet public key: ".concat(senderKeypair.publicKey.toBase58()));
        // Prompt the user for the recipient's public key
        rl.question("Enter the recipient's public key: ", function (recipientPublicKey) { return __awaiter(void 0, void 0, void 0, function () {
            var amount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Get the sender's wallet balance
                    return [4 /*yield*/, getBalance(senderKeypair.publicKey)];
                    case 1:
                        // Get the sender's wallet balance
                        _a.sent();
                        // Get the updated sender's wallet balance
                        return [4 /*yield*/, getBalance(senderKeypair.publicKey)];
                    case 2:
                        // Get the updated sender's wallet balance
                        _a.sent();
                        amount = 10;
                        return [4 /*yield*/, sendSol(senderKeypair, new web3_js_1.PublicKey(recipientPublicKey), amount)];
                    case 3:
                        _a.sent();
                        // Get the updated sender's wallet balance
                        return [4 /*yield*/, getBalance(senderKeypair.publicKey)];
                    case 4:
                        // Get the updated sender's wallet balance
                        _a.sent();
                        rl.close();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
