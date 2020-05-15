import {TransitRouteLookup, TransitSystem} from './TransitSystem';
import {FeatureCollection} from 'geojson';

test('initWithRoutes', () => {
    const geoJSON: FeatureCollection = {"type":"FeatureCollection","features":[{"type":"Feature","properties":{"OBJECTID":1,"ROUTE_NUM":370,"CLASS":"PEAK","TITLE":"PORTERS LAKE METROX","SOURCE":"TRANSIT","SACC":"IN","SDATE":"2013-11-18T00:00:00.000Z","DATE_ACT":"2013-11-18T00:00:00.000Z","DATE_REV":"2018-02-07T00:00:00.000Z","Shape__Length":53516.3588976408},"geometry":{"type":"MultiLineString","coordinates":[[[-63.5770112112986,44.6487083797668],[-63.5774287787853,44.6486001700213],[-63.5774903039358,44.6485875737838],[-63.5775530367576,44.6485784790881],[-63.5776165841719,44.6485729429223],[-63.5777348967864,44.6485836802543]],[[-63.5777348967864,44.6485836802543],[-63.5777453280235,44.6485861126262]]]}}]};

    const system = new TransitSystem(geoJSON);
    const expected = {'370':
            {
                id: '370',
                feature: geoJSON.features[0],
                name: 'PORTERS LAKE METROX',
                label: '370 - PORTERS LAKE METROX',
            },
    };

    expect(system.routes).toEqual(expected);
});
