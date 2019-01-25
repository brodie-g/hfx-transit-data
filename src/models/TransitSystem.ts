import {TransitRoute} from '@/models/TransitRoute';
import {TransitStop} from '@/models/TransitStop';

interface TransitRouteLookup {
    [key: number]: TransitRoute;
}

interface TransitStopLookup {
    [key: number]: TransitStop;
}

export class TransitSystem {
    city: string = '';
    systemGeoJSON: object = {};
    transitRoutes: TransitRouteLookup = {};
    transitStops: TransitStopLookup = {};
}
