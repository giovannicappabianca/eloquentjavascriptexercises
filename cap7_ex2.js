const roads = [
  "Alice's House-Bob's House",   "Alice's House-Cabin",
  "Alice's House-Post Office",   "Bob's House-Town Hall",
  "Daria's House-Ernie's House", "Daria's House-Town Hall",
  "Ernie's House-Grete's House", "Grete's House-Farm",
  "Grete's House-Shop",          "Marketplace-Farm",
  "Marketplace-Post Office",     "Marketplace-Shop",
  "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map(r => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels.map(p => {
        if (p.place != this.place) return p;
        return {place: destination, address: p.address};
      }).filter(p => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

let first = new VillageState(
  "Post Office",
  [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office

function runRobot(state, robot, memory) {
  for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
	  return turn;
      //break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}


function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({place, address});
  }
  return new VillageState("Post Office", parcels);
};


const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function goalOrientedRobot({place, parcels}, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
/*
function goalOrientedRobotAugmented({place, parcels}, route) {
  if (route.length == 0) {
	let parcel = parcels[0]
    let parcelInPlaces = parcels.filter(p => p.place == place);
	console.log(parcelInPlaces)
	if(parcelInPlaces.length > 0)
		parcel = parcelInPlaces[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
*/


function goalOrientedRobotAugmented({place, parcels}, route) {
  if (route.length == 0) {
	  let final_route_retrieval = findRoute(roadGraph, place, parcels[0].place)
	  let final_route_delivery = findRoute(roadGraph, place, parcels[0].address)
	  console.log("first route examined" + final_route_retrieval + " and " + final_route_delivery)
	  let absolute_shortest_path = final_route_retrieval.length + final_route_delivery.length
	  let parcel = parcels[0];
	for(let i = 1; i < parcels.length; i++){
		let route_retrieval = findRoute(roadGraph, place, parcels[i].place)
		let route_delivery = findRoute(roadGraph, place, parcels[i].address)
		console.log("route examined " + route_retrieval + "and" + route_delivery)
		if (route_retrieval.length + route_delivery.length < absolute_shortest_path){
			console.log("chosen another route" + route + "parcel place" + parcel.place + "current place" + place)
			absolute_shortest_path = route_retrieval.length + route_delivery.length
			final_route_retrieval = route_retrieval
			final_route_delivery = route_delivery
			parcel = parcels[i]
		}
	}	  
    
    if (parcel.place != place) {
      route = final_route_retrieval
    } else {
      route = final_route_delivery
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}


/*
function goalOrientedRobotAugmented({place, parcels}, route) {
  if (route.length == 0) {
	  let final_route_retrieval = findRoute(roadGraph, place, parcels[0].place)
	  console.log("first route examined " + final_route_retrieval)
	  let retrieval_shortest_path = final_route_retrieval.length
	  let parcel = parcels[0];
	for(let i = 1; i < parcels.length; i++){
		let route_retrieval = findRoute(roadGraph, place, parcels[i].place)
		console.log("route examined " + route_retrieval)
		if (route_retrieval.length  < absolute_shortest_path.length){
			console.log("chosen another route" + route + "parcel place" + parcel.place + "current place" + place)
			absolute_shortest_path = route_retrieval.length + route_delivery.length
			final_route_retrieval = route_retrieval
			parcel = parcels[i]
		}
	}	  
    
    if (parcel.place != place) {
      route = final_route_retrieval
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}
*/

runRobot(VillageState.random(),
                  goalOrientedRobotAugmented, []);
				  
				  
function compareRobots(robot1, memory1, robot2, memory2) {
	let outcomes_robot1 = []
	let outcomes_robot2 = []
	for(let i = 0; i < 100; i++){
		initialVillageState = VillageState.random()
		outcomes_robot1.push(runRobot(initialVillageState, robot1, memory1))
		outcomes_robot2.push(runRobot(initialVillageState, robot2, memory2))
	}
	average_robot1 = outcomes_robot1.reduce((a,b) => a + b) / outcomes_robot1.length
	average_robot2 = outcomes_robot2.reduce((a,b) => a + b) / outcomes_robot2.length
	console.log("average turns robot 1: " + average_robot1 + "\naverage turns robot 2: " + average_robot2)
}

//compareRobots(routeRobot, [], goalOrientedRobot, []);
compareRobots(goalOrientedRobot, [], goalOrientedRobotAugmented, []);