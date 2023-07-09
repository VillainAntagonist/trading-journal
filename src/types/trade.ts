export interface ITrade {
    _id: string;
    size: number;
    symbol: string;
    strategy: string;
    entry: number;
    exit: number;
    stopLoss: number;
    takeProfit: number;
    entryDateTime: Date;
    exitDateTime: Date;
    status: string;
    net: number
    risk: number;
    expectedRRR: number;
    actualRRR: number;
    screenshot: string;
    comments: string;
    retrospective: string;
}
