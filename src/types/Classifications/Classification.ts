
export type Classification = { id: number, name: string }
export type Segment = { id: number, name: string, classification_id: number }
export type Activity = { id: number, name: string, segment_id: number }
export type Mix = {
    classification_id: number;
    classification: string;
    segment_id: number | null;
    segment: string | null; 
    activity_id: number | null;
    activity: string | null;
};