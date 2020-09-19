declare class Secret {
    static parseUtf8ToString(text: string): string;
    static getRandomString(): string;
    static encryptAES(message: string, secretPassphrase: string): string;
    static decryptAES(encryptedMessage: string, secretPassphrase: string): string;
}
export default Secret;
//# sourceMappingURL=Secret.d.ts.map