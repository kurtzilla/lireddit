import { MyContext } from '../types';
import { Show } from '../entities/Show';
declare class ShowInput {
    dateOfShow: string;
    performers: string;
    text: string;
}
declare class PaginatedShows {
    posts: Show[];
    hasMore: boolean;
}
export declare class ShowResolver {
    textSnippet(show: Show): any;
    creator(show: Show, { userLoader }: MyContext): any;
    shows(limit: number, cursor: string | null): Promise<PaginatedShows>;
    post(id: number): Promise<Show | undefined>;
    createShow(input: ShowInput, { req }: MyContext): Promise<Show>;
    updateShow(id: number, dateOfShow: string, performers: string, text: string, { req }: MyContext): Promise<Show | null>;
    deleteShow(id: number, { req }: MyContext): Promise<boolean>;
}
export {};
