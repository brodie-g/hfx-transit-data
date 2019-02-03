import {FeatureCollection} from 'geojson';


export interface CRS {
    type: string,
    properties: {
        name: string,
    }
}

export interface FeatureCollectionCRS extends FeatureCollection {
    crs: CRS,
}
