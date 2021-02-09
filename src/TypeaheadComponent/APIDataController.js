import useFetch from '../utils/useFetch';
import pickFromGitHubResponse from '../utils/pickFromGitHubResponse';
import mapDataKeys from '../utils/mapDataKeys';
import sliceData from '../utils/sliceData';

const APIDataController = ({
  input = (query, numOfResults) => `https://api.github.com/search/users?q=${query}&per_page=${numOfResults}`,
  init,
} = {}) => {
  const onRequestData = async ({
    query,
    numOfResults,
  }) => {
    // TODO: to make the controller more modular, transforms on the API response below
    //  should also be lifted and passed as a prop: formatResponse(data) => {...}
    let data = await useFetch(input(query, numOfResults), init);
    data = pickFromGitHubResponse(data);
    data = mapDataKeys(data, [['value', 'login']]);
    data = sliceData(data, numOfResults);
    return data;
  };

  const onSelect = selected => console.log('selected item:', selected.value);

  return ({
    onRequestData,
    onSelect,
  });
};

export default APIDataController;
