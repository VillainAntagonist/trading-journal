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
    result: 'Win' | 'Loss';
    risk: number;
    type: 'Long' | 'Short';
    expectedRRR: number;
    actualRRR: number;
    screenshot: string;
    comments: string;
    retrospective: string;
    pips: number;
    net: number
}
