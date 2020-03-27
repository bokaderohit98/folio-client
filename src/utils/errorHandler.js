export default err =>
    (err && err.response && err.response.data && err.response.data.error) ||
    'Something Went Wrong!';
