import mapDataKeys from '../utils/mapDataKeys';
import usStates from '../us-states.json';
import filterDataByQuery from '../utils/filterDataByQuery';
import sliceData from '../utils/sliceData';

const StaticDataController = () => {
  const onRequestData = async ({
    query,
    numOfResults,
  }) => {
    // TODO: to make the controller more modular, transforms on the API response below
    //  should also be lifted and passed as a prop: formatResponse(data) => {...}
    let data = mapDataKeys(usStates, [['value', 'name'], ['abbreviation', 'abbreviation']]);
    data = filterDataByQuery(data, query);
    data = sliceData(data, numOfResults);
    return data;
  };

  const onSelect = selected => console.log('selected item:', selected.value);

  return ({
    onRequestData,
    onSelect,
  });
};

export default StaticDataController;
