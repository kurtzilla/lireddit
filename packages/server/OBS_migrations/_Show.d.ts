import { BaseEntity } from 'typeorm';
import { User } from './User';
import { enum_ShowTimeQualifierTEST } from './Enum';
export declare enum enum_ShowTimeQualifier {
    EARLY_SHOW = "early",
    MATINEE = "matinee",
    LATE_SHOW = "late show",
    CANCELLED = "cancelled",
    RESCHEDULED = "rescheduled",
    POSTPONED = "postponed"
}
export declare class Show extends BaseEntity {
    id: number;
    idx: string;
    generateUuid(): Promise<void>;
    dateOfShow: Date;
    showTimeQualifier: enum_ShowTimeQualifier;
    showTimeQualifierT: enum_ShowTimeQualifierTEST;
    performers: string;
    text: string;
    creatorId: number;
    creator: User;
    createdAt: Date;
    updatedAt: Date;
}
