import { Board, Card, List } from "@prisma/client";

export type ListWithCards = List & { board: Board } & { cards: Card[] };
export type CardWithList = Card & { list: List };
