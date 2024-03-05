declare class Database {
    constructor();
    connect(): Promise<void>;
    static getInstance(): any;
}
declare const _default: typeof Database.getInstance;
export default _default;
