import React, { useState, useEffect, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Controls from './components/Controls';
import DataTable from './components/DataTable';

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
            <h1 className='text-center pb-4'>Generating Random User Data</h1>
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
    const name = generateName(region);
    const address = generateAddress(region);
    const phone = generatePhone(region);

    // Introduce errors based on errorCount
    const record = {
        index: index + 1,
        id: faker.datatype.uuid(),
        name: `${name.firstName} ${name.middleName} ${name.lastName}`,
        address: address,
        phone: phone,
    };

    if (errorCount > 0) {
        for (let i = 0; i < errorCount; i++) {
            const keys = Object.keys(record).filter(key => key !== 'index' && key !== 'id');
            const keyToCorrupt = keys[Math.floor(Math.random() * keys.length)];
            record[keyToCorrupt] = applyError(record[keyToCorrupt]);
        }
    }

    return record;
};

const generateName = (region) => {
    return {
        firstName: faker.name.firstName(),
        middleName: faker.name.middleName(),
        lastName: faker.name.lastName(),
    };
};

const generateAddress = (region) => {
    return `${faker.address.city()}, ${faker.address.streetAddress()}`;
};

const generatePhone = (region) => {
    return faker.phone.number();
};

const applyError = (text) => {
    const index = Math.floor(Math.random() * text.length);
    const char = String.fromCharCode(text.charCodeAt(index) + Math.floor(Math.random() * 10) - 5);
    return text.slice(0, index) + char + text.slice(index + 1);
};

export default App;
