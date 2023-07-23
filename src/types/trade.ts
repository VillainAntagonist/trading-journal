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
    result: string;
    risk: number;
    type: string;
    expectedRRR: number;
    actualRRR: number;
    screenshot: string;
    comments: string;
    retrospective: string;
    pips: number;
    net: number
}
