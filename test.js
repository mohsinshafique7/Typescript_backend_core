fruites = [
  {
    id: 1,
    name: "Mohsin",
  },
  {
    id: 2,
    name: "Ali",
  },
];

const value = fruites.find((item) => item.id === 1 && item.name === "Mohsin");
console.log(value);
