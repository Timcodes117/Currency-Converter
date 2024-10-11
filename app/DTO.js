// the idea of this function
// is to filter out the necessary data from
// the json returned from the api
// ....
// the required data is {value: "", label: ""}
// value and label are only accepted by the react-select package
// and the value and label can be reused to make request
// to the api for conversions while label can be used for display

export function DataTransferObject(data) {
  let newData = []; // this is an empty array which will be appended based on the data available

  // here the data param passing the data from the api
  // contains arrays of arrays that i need
  // so I' converting this to an object that can be mapped below.
  // so the keys are iterated below
  data.map((key, index) => {
    // below I'm appending the array and it's index with
    // the following keys
    newData[index] = { value: key[0], label: key[1] + " (" + key[0] + ")" };
  });

  // below an array of objects will be returned to where it was called
  // setCurrencies(DataTransferObject(apiData));
  return newData;
}
