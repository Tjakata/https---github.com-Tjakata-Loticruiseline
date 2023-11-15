// graph.js

// Sample data (replace it with your actual data)
const data = {
    nodes: [
      { id: "John Cruise", group: 1 },
      { id: "Jane Finance", group: 2 },
      { id: "Chris Operations", group: 2 },
      { id: "Mary Marketing", group: 3 },
      { id: "Harry HR", group: 3 },
      { id: "Caroline Customer Service", group: 4 },
      { id: "Charlie Cruise Crew", group: 4 }
    ],
    links: [
      { source: "Jane Finance", target: "John Cruise" },
      { source: "Chris Operations", target: "John Cruise" },
      { source: "Mary Marketing", target: "Jane Finance" },
      { source: "Harry HR", target: "Chris Operations" },
      { source: "Caroline Customer Service", target: "Mary Marketing" },
      { source: "Charlie Cruise Crew", target: "Chris Operations" }
    ]
  };
  
  // Set up the graph
  const width = 800;
  const height = 600;
  
  const svg = d3.select("#employee-graph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);
  
  const simulation = d3.forceSimulation(data.nodes)
    .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2));
  
  // Draw the graph
  const link = svg.selectAll(".link")
    .data(data.links)
    .enter()
    .append("line")
    .attr("class", "link");
  
  const node = svg.selectAll(".node")
    .data(data.nodes)
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("r", 20)
    .call(d3.drag()
      .on("start", dragStarted)
      .on("drag", dragging)
      .on("end", dragEnded));
  
  const text = svg.selectAll(".text")
    .data(data.nodes)
    .enter()
    .append("text")
    .attr("class", "text")
    .text(d => d.id);
  
  // Define drag functions
  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragging(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  // Update positions on each tick
  simulation.on("tick", () => {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  
    text
      .attr("x", d => d.x)
      .attr("y", d => d.y);
  });
  