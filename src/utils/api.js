var axios = require('axios');

module.exports = {
  fetchStores: function (zip) {
    var encodedURI = window.encodeURI('https://shipt-zip-code-test-api.herokuapp.com/api/zip_codes/' + zip);
    return axios.get(encodedURI)
    .then(response => {
        return response.data.stores;
    })
    .catch(error => {
      return error.response.data.error;
    });
  }
};
