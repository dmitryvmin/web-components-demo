import StaticDataController from '../TypeaheadComponent/StaticDataController';
import APIDataController from '../TypeaheadComponent/APIDataController';

function getDataController(type) {
  switch (type) {
    case 'API':
      return APIDataController;
    case 'STATIC':
      return StaticDataController;
    default:
      console.warn('Invalid dataController type');
  }
}

export default getDataController;
