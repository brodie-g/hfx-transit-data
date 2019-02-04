import {Geometry} from './Geometry';
import * as geojson from 'geojson';

export class TransitRoute extends Geometry {
    id: string = '';
    name?: string;
    label?: string;
    ridershipData?: object;

    constructor(id: string, feature: geojson.Feature) {
        super(feature);

        this.id = id;
        this.name = feature.properties.TITLE;

        if (this.name) {
            this.label = `${this.id} - ${this.name}`;
        }
    }

    addRidershipData(ridershipData) {
        this.ridershipData = ridershipData;
    }
}
