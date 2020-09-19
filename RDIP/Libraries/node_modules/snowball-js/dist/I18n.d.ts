declare enum I18nLanguages {
    KO = "ko",
    EN = "en"
}
interface I18nText {
    [key: string]: {
        ko: string;
        en: string;
    };
}
declare class I18n {
    private readonly texts;
    constructor(texts: I18nText);
    static getUserLanguage(): I18nLanguages;
    text(key: string): string;
}
export { I18n, I18nLanguages, I18nText };
//# sourceMappingURL=I18n.d.ts.map