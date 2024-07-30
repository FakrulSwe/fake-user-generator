import React, { useState, useEffect, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Controls from './Controls';
import DataTable from './DataTable';

const regions = ['Poland', 'USA', 'Georgia'];

const App = () => {
    const [region, setRegion] = useState(regions[0]);
    const [errorCount, setErrorCount] = useState(0);
    const [seed, setSeed] = useState(faker.datatype.number());
    const [data, setData] = useState([]);

    const generateData = useCallback(() => {
        faker.seed(seed);
        const newData = Array.from({ length: 20 }, (_, index) => generateRecord(index, region, errorCount));
        setData(newData);
    }, [seed, region, errorCount]);

    useEffect(() => {
        generateData();
    }, [generateData]);

    const fetchMoreData = () => {
        faker.seed(seed);
        const additionalData = Array.from({ length: 10 }, (_, index) => generateRecord(data.length + index, region, errorCount));
        setData(prevData => [...prevData, ...additionalData]);
    };

    const generateRandomSeed = () => setSeed(faker.datatype.number());

    return (
        <div className="App container">
            <Controls
                region={region}
                regions={regions}
                setRegion={setRegion}
                errorCount={errorCount}
                setErrorCount={setErrorCount}
                seed={seed}
                setSeed={setSeed}
                generateRandomSeed={generateRandomSeed}
            />
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <DataTable data={data} />
            </InfiniteScroll>
        </div>
    );
};

const generateRecord = (index, region, errorCount) => {
    // Generate realistic data based on region
    const name = generateName(region);
    const address = generateAddress(region);
    const phone = generatePhone(region);

    // Introduce errors based on errorCount
    const errorProbability = errorCount / 10;
    if (Math.random() < errorProbability) {
        // Apply errors to the data (e.g., typos, missing parts)
        // Example error application (you can add more error types)
        name.firstName = applyError(name.firstName);
    }

    return {
        index: index + 1,
        id: faker.datatype.uuid(),
        name: `${name.firstName} ${name.middleName} ${name.lastName}`,
        address: address,
        phone: phone,
    };
};

const generateName = (region) => {
    // Generate names based on the region
    return {
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
    };
};

const generateAddress = (region) => {
    // Generate addresses based on the region
    return `${faker.address.city()}, ${faker.address.streetAddress()}`;
};

const generatePhone = (region) => {
    // Generate phone numbers based on the region
    return faker.phone.number();
};

const applyError = (text) => {
    // Introduce a simple typo error
    const index = Math.floor(Math.random() * text.length);
    const char = String.fromCharCode(text.charCodeAt(index) + 1);
    return text.slice(0, index) + char + text.slice(index + 1);
};

export default App;
