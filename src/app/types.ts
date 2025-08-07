export type TableColDisplayProperties =  'description' | 'category' | 'certainty' | 'effective' | 'severity' | 'urgency' | 'senderName';

export type TableColDisplayProps = "text" | "date" | "badge" | "name";

export type SchemeProps = -1 | 0 | 1 | 2 | 3;

export type TableColProps = {
  title: string;
  property: TableColDisplayProperties;
  sort: boolean;
  display: TableColDisplayProps;
  width?: string;
};

export type FeatureProps = {
  id: string;
  type: string;
  geometry: unknown;
  properties: {
    affectedZones: string[];
    areaDesc: string;
    category: string;
    certainty: string;
    code: string;
    description: string;
    effective: Date;
    ends: Date;
    event: string;
    eventCode: unknown;
    expires: Date;
    geocode: unknown;
    headline: string;
    id: string;
    instruction: string;
    language: string;
    messageType: string;
    onset: Date;
    parameters: unknown;
    references: unknown[];
    response: string;
    scope: string;
    sender: string;
    senderName: string;
    sent: Date;
    severity: string;
    status: string;
    urgency: string;
    web: string;
    [key: string]: string | unknown;
  }
};