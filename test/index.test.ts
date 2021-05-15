import Home from "../src/home";
import Search from "../src/search";
import Detail from "../src/detail";
import HLS from "../src/hls";

Home.getData()
  .then((data) => {
    console.log(data.container[0].item);
  })
  .catch(console.log);

// Search.getData("taxi driver").then((data) => console.log(data.container[0].item));

// // const id = `playlist-25694403`;
// const id = `1165860656`
// Detail.getData(id).then(console.log).catch(console.log);

// HLS.getPlayUrl("1165867599").then((data) => console.log(data));
