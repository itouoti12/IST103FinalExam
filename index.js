// package object sample
// let packageList = [
//   {
//     name: "John Doe",
//     id: "12345",
//     address: "123 Elm Street",
//     weight: 2,
//     code: "0b110110",
//   },
//   {
//     name: "Jane Smith",
//     id: "67890",
//     address: "456 Maple Lane",
//     weight: 5,
//     code: "0b110010",
//   },
// ];
let packageList = [];

function onRegister(event) {
  event.preventDefault();

  const name = document.getElementById("recepient-name").value;
  const id = parseInt(document.getElementById("package-id").value);
  const address = document.getElementById("delivery-address").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const code = generateTrackingCode(id, weight);

  const package = {
    name,
    id,
    address,
    weight,
    code,
  };
  packageList.push(package);

  confirm(`Package added successfully!\nTracking Code: ${code}  `);

  console.log(packageList);
  sortFromLightToHeavy(packageList, 0, packageList.length - 1);
  console.log(packageList);

  updateTable();
}

function updateTable() {
  const packageTableBody = document.getElementById("package-list-body");
  const newTableList = document.createElement("tbody");
  newTableList.id = "package-list-body";
  packageList.forEach((package) => {
    const row = newTableList.insertRow(-1);
    insertData(package, row);
  });
  packageTableBody.parentNode.replaceChild(newTableList, packageTableBody);
}

const ROW_INDEX = {
  NAME: 0,
  ID: 1,
  ADDRESS: 2,
  WEIGHT: 3,
  CODE: 4,
};
function insertData(package, row) {
  const nameCell = row.insertCell(ROW_INDEX.NAME);
  const idCell = row.insertCell(ROW_INDEX.ID);
  const addressCell = row.insertCell(ROW_INDEX.ADDRESS);
  const weightCell = row.insertCell(ROW_INDEX.WEIGHT);
  const codeCell = row.insertCell(ROW_INDEX.CODE);
  nameCell.innerHTML = package.name;
  idCell.innerHTML = package.id;
  addressCell.innerHTML = package.address;
  weightCell.innerHTML = package.weight;
  codeCell.innerHTML = package.code;
}

function generateTrackingCode(packageId, weight) {
  return ((packageId << 4) | weight).toString(2);
}

/**
 * merge sort algorithm
 */
function sortFromLightToHeavy(list, left, right) {
  console.log("sortFromLightToHeavy", list, left, right);
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  sortFromLightToHeavy(list, left, mid);
  sortFromLightToHeavy(list, mid + 1, right);
  merge(list, left, mid, right);
}

function merge(array, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  // create temporary arrays
  const tempLeft = new Array(n1);
  const tempRight = new Array(n2);

  // copy data to temporary arrays
  for (let i = 0; i < n1; i++) {
    tempLeft[i] = { ...array[left + i] };
  }
  for (let j = 0; j < n2; j++) {
    tempRight[j] = { ...array[mid + 1 + j] };
  }

  let i = 0,
    j = 0;
  let k = left;
  // merge the temporary arrays
  while (i < n1 && j < n2) {
    if (tempLeft[i].weight <= tempRight[j].weight) {
      array[k] = tempLeft[i];
      i++;
    } else {
      array[k] = tempRight[j];
      j++;
    }
    k++;
  }

  // copy the remaining elements of tempLeft[], if there are any
  while (i < n1) {
    packageList[k] = tempLeft[i];
    i++;
    k++;
  }
  // copy the remaining elements of tempRight[], if there are any
  while (j < n2) {
    packageList[k] = tempRight[j];
    j++;
    k++;
  }
}
