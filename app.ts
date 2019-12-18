type AgencyList = { [key: string]: Array<string> };
type Vertex = string;

class Graph {
  agencyList: AgencyList;
  constructor() {
    this.agencyList = {};
  }

  public addVertex(vertexName: string): void {
    if (this.agencyList.hasOwnProperty(vertexName)) {
      console.error("vertex already exists");
      return;
    }
    const newVertex = { [vertexName]: [] };
    this.agencyList = { ...this.agencyList, ...newVertex };
  }

  public addEdge(vertex1: Vertex, vertex2: Vertex): void {
    if (!this.agencyList.hasOwnProperty(vertex1)) {
      console.error(`${vertex1} is not present on graph`);
      return;
    }

    if (!this.agencyList.hasOwnProperty(vertex2)) {
      console.error(`${vertex2} is not present on graph`);
      return;
    }
    this.agencyList[vertex1] = [...this.agencyList[vertex1], vertex2];
    this.agencyList[vertex2] = [...this.agencyList[vertex2], vertex1];
  }

  public removeEdge(vertex1: Vertex, vertex2: Vertex): void {
    this.agencyList[vertex1] = this.agencyList[vertex1].filter(
      (vertex: Vertex) => vertex !== vertex2
    );
    this.agencyList[vertex2] = this.agencyList[vertex2].filter(
      (vertex: Vertex) => vertex !== vertex1
    );
  }

  public removeVertex(vertexToRemove: Vertex): void {
    this.agencyList = Object.entries(this.agencyList).reduce(
      (accumulator: AgencyList, [currentVertex, edges]) => {
        if (currentVertex === vertexToRemove) return { ...accumulator };
        const newEdges = edges.filter(
          (edge: Vertex) => edge !== vertexToRemove
        );
        return { ...accumulator, [currentVertex]: newEdges };
      },
      {}
    );
  }
}

const graph = new Graph();

graph.addVertex("Tokyo");
graph.addVertex("Nagoya");
graph.addVertex("Kyoto");
graph.addEdge("Tokyo", "Nagoya");
graph.removeVertex("Tokyo");
console.log(graph.agencyList);
