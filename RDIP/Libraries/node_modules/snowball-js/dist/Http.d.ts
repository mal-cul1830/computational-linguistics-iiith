declare class Http {
    private static request;
    static get<T>(url: string): Promise<T>;
    static post<T, S>(url: string, body: T): Promise<S>;
    static postWithoutBody<T>(url: string): Promise<T>;
    static patch<T, S>(url: string, body: T): Promise<S>;
    static delete<T>(url: string): Promise<T>;
}
export default Http;
//# sourceMappingURL=Http.d.ts.map